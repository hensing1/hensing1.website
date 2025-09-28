import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { eq, and, or, gte, inArray, isNull } from "drizzle-orm";
import {
  albums,
  images,
  imageInformation,
  imageComments,
} from "../../db/digikam.ts";

export async function selectPics(albumIDs: number[], minRating: number) {
  const db = drizzle(process.env.DB_FILE_NAME!);

  const titles = db
    .select({
      imageID: imageComments.imageid,
      title: imageComments.comment,
    })
    .from(imageComments)
    .where(eq(imageComments.type, 3))
    .as("titles");

  const captions = db
    .select({
      imageID: imageComments.imageid,
      caption: imageComments.comment,
    })
    .from(imageComments)
    .where(eq(imageComments.type, 1))
    .as("captions");

  const pics = await db
    .select({
      name: images.name,
      path: images.name,
      title: titles.title,
      caption: captions.caption,
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
