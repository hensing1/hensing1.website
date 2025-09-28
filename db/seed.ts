import { db, FaktDesTages } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db
		.insert(FaktDesTages)
		.values([
			{
				fakt: "Die Erde ist rund, damit man sie besser durchs Weltall rollen kann.",
			},
			{ fakt: "Die Rheinfolge ist: erst Bonn, dann Köln." },
		]);
}
