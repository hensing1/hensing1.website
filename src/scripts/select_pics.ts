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

export async function getAlbumIDs(albumSelector: string) {
  const ids = await db
    .select({
      albumID: albums.id,
    })
    .from(albums)
    .where(like(albums.relativePath, albumSelector));

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
