import {
	sqliteTable,
	integer,
	text,
	numeric,
	index,
	real,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const albumRoots = sqliteTable("AlbumRoots", {
	id: integer().primaryKey(),
	label: text(),
	status: integer().notNull(),
	type: integer().notNull(),
	identifier: text(),
	specificPath: text(),
	caseSensitivity: integer(),
});

export const albums = sqliteTable("Albums", {
	id: integer().primaryKey(),
	albumRoot: integer().notNull(),
	relativePath: text().notNull(),
	date: numeric(),
	caption: text(),
	collection: text(),
	icon: integer(),
	modificationDate: numeric(),
});

export const images = sqliteTable(
	"Images",
	{
		id: integer().primaryKey(),
		album: integer(),
		name: text().notNull(),
		status: integer().notNull(),
		category: integer().notNull(),
		modificationDate: numeric(),
		fileSize: integer(),
		uniqueHash: text(),
		manualOrder: integer(),
	},
	(table) => [
		index("image_name_index").on(table.name),
		index("hash_index").on(table.uniqueHash),
		index("dir_index").on(table.album),
	],
);

export const imageInformation = sqliteTable(
	"ImageInformation",
	{
		imageid: integer().primaryKey(),
		rating: integer(),
		creationDate: numeric(),
		digitizationDate: numeric(),
		orientation: integer(),
		width: integer(),
		height: integer(),
		format: text(),
		colorDepth: integer(),
		colorModel: integer(),
	},
	(table) => [index("creationdate_index").on(table.creationDate)],
);

export const imageMetadata = sqliteTable("ImageMetadata", {
	imageid: integer().primaryKey(),
	make: text(),
	model: text(),
	lens: text(),
	aperture: real(),
	focalLength: real(),
	focalLength35: real(),
	exposureTime: real(),
	exposureProgram: integer(),
	exposureMode: integer(),
	sensitivity: integer(),
	flash: integer(),
	whiteBalance: integer(),
	whiteBalanceColorTemperature: integer(),
	meteringMode: integer(),
	subjectDistance: real(),
	subjectDistanceCategory: integer(),
});

export const videoMetadata = sqliteTable("VideoMetadata", {
	imageid: integer().primaryKey(),
	aspectRatio: text(),
	audioBitRate: text(),
	audioChannelType: text(),
	audioCompressor: text(),
	duration: text(),
	frameRate: text(),
	exposureProgram: integer(),
	videoCodec: text(),
});

export const imagePositions = sqliteTable("ImagePositions", {
	imageid: integer().primaryKey(),
	latitude: text(),
	latitudeNumber: real(),
	longitude: text(),
	longitudeNumber: real(),
	altitude: real(),
	orientation: real(),
	tilt: real(),
	roll: real(),
	accuracy: real(),
	description: text(),
});

export const imageComments = sqliteTable(
	"ImageComments",
	{
		id: integer().primaryKey(),
		imageid: integer(),
		type: integer(),
		language: text(),
		author: text(),
		date: numeric(),
		comment: text(),
	},
	(table) => [index("comments_imageid_index").on(table.imageid)],
);

export const imageCopyright = sqliteTable(
	"ImageCopyright",
	{
		id: integer().primaryKey(),
		imageid: integer(),
		property: text(),
		value: text(),
		extraValue: text(),
	},
	(table) => [index("copyright_imageid_index").on(table.imageid)],
);

export const tags = sqliteTable("Tags", {
	id: integer().primaryKey(),
	pid: integer(),
	name: text().notNull(),
	icon: integer(),
	iconkde: text(),
});

export const tagsTree = sqliteTable("TagsTree", {
	id: integer().notNull(),
	pid: integer().notNull(),
});

export const imageTags = sqliteTable(
	"ImageTags",
	{
		imageid: integer().notNull(),
		tagid: integer().notNull(),
	},
	(table) => [
		index("tag_id_index").on(table.imageid),
		index("tag_index").on(table.tagid),
	],
);

export const imageProperties = sqliteTable("ImageProperties", {
	imageid: integer().notNull(),
	property: text().notNull(),
	value: text().notNull(),
});

export const searches = sqliteTable("Searches", {
	id: integer().primaryKey(),
	type: integer(),
	name: text().notNull(),
	query: text().notNull(),
});

export const downloadHistory = sqliteTable("DownloadHistory", {
	id: integer().primaryKey(),
	identifier: text(),
	filename: text(),
	filesize: integer(),
	filedate: numeric(),
});

export const settings = sqliteTable("Settings", {
	keyword: text().notNull(),
	value: text(),
});

export const imageHistory = sqliteTable(
	"ImageHistory",
	{
		imageid: integer().primaryKey(),
		uuid: text(),
		history: text(),
	},
	(table) => [index("uuid_index").on(table.uuid)],
);

export const imageRelations = sqliteTable(
	"ImageRelations",
	{
		subject: integer(),
		object: integer(),
		type: integer(),
	},
	(table) => [
		index("object_relations_index").on(table.object),
		index("subject_relations_index").on(table.subject),
	],
);

export const tagProperties = sqliteTable(
	"TagProperties",
	{
		tagid: integer(),
		property: text(),
		value: text(),
	},
	(table) => [index("tagproperties_index").on(table.tagid)],
);

export const imageTagProperties = sqliteTable(
	"ImageTagProperties",
	{
		imageid: integer(),
		tagid: integer(),
		property: text(),
		value: text(),
	},
	(table) => [
		index("imagetagproperties_tagid_index").on(table.tagid),
		index("imagetagproperties_imageid_index").on(table.imageid),
		index("imagetagproperties_index").on(table.imageid, table.tagid),
	],
);
