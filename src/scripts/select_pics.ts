import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { eq, and, like, gte, inArray } from "drizzle-orm";
import {
  albums,
  images,
  imageInformation,
  imageComments,
} from "../../db/digikam.ts";

const db = drizzle(process.env.DB_FILE_NAME!);

export async function getBlogPageNames() {
  let blogAlbums = await db
    .select({ albumPath: albums.relativePath })
    .from(albums)
    .where(eq(albums.collection, "Blog"));

  return blogAlbums
    .filter((album) =>
      // album path should look like "/name", but not "/name/sub-name"
      album.albumPath.match("^\/[^\/]+$"),
    )
    .map((album) => album.albumPath.slice(1));
}

export async function getBlogSectionsForPage(page: string) {
  const allAlbums = await db
    .select({
      id: albums.id,
      albumRoot: albums.albumRoot,
      relativePath: albums.relativePath,
      name: albums.relativePath,
      date: albums.date,
      caption: albums.caption,
      collection: albums.collection,
    })
    .from(albums)
    .where(like(albums.relativePath, `/${page}/%`))
    .orderBy(albums.date);

  return allAlbums
    .filter((album) => album.relativePath.split("/").length == 3)
    .map((album) => {
      album.name = album.relativePath.split("/").at(-1)!;
      return album;
    });
}

export async function getBlogEntriesForSection(page: string, section: string) {
  const sectionAlbums = await db
    .select({
      id: albums.id,
      albumRoot: albums.albumRoot,
      relativePath: albums.relativePath,
      section: albums.relativePath,
      name: albums.relativePath,
      date: albums.date,
      caption: albums.caption,
      collection: albums.collection,
    })
    .from(albums)
    .where(like(albums.relativePath, `/${page}/${section}%`))
    .orderBy(albums.date);

  return sectionAlbums.map((album) => {
    album.section = section;
    album.name = album.relativePath.split("/").at(-1)!;
    return album;
  });
}

export async function getBlogEntriesForPage(page: string) {
  const sections = await getBlogSectionsForPage(page);
  let entries = [];
  for (const section of sections) {
    entries.push(...(await getBlogEntriesForSection(page, section.name)));
  }
  return entries;
}

export async function getAlbumIDs(albumSelector: string) {
  const ids = await db
    .select({
      albumID: albums.id,
    })
    .from(albums)
    .where(like(albums.relativePath, albumSelector))
    .orderBy(albums.date);

  return ids.map((id) => id.albumID);
}

function getImageComments(name: string, type: number) {
  return db
    .select({
      imageID: imageComments.imageid,
      comment: imageComments.comment,
    })
    .from(imageComments)
    .where(eq(imageComments.type, type))
    .as(name);
}

/// returns a subquery for image titles
function getImageTitles() {
  return getImageComments("titles", 3);
}

/// returns a subquery for image captions
function getImageCaptions() {
  return getImageComments("captions", 1);
}

export async function selectPics(albumIDs: number[], minRating: number) {
  const titles = getImageTitles();
  const captions = getImageCaptions();

  const pics = await db
    .select({
      name: images.name,
      path: images.name,
      title: titles.comment,
      caption: captions.comment,
    })
    .from(images)
    .leftJoin(titles, eq(images.id, titles.imageID))
    .leftJoin(captions, eq(images.id, captions.imageID))
    .innerJoin(imageInformation, eq(images.id, imageInformation.imageid))
    .innerJoin(albums, eq(images.album, albums.id))
    .where(
      and(
        gte(imageInformation.rating, minRating),
        inArray(images.album, albumIDs),
      ),
    );

  return pics.map((pic) => {
    const stem = pic.name.split(".")[0];
    pic.path = "/img/" + stem + ".webp";
    return pic;
  });
}
