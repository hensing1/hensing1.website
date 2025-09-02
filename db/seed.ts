import { db, FaktDesTages, DingObenRechts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(FaktDesTages).values([
		{ fakt: "Die Erde ist rund, damit man sie besser durchs Weltall rollen kann." },
		{ fakt: "Die Rheinfolge ist: erst Bonn, dann Köln." },
	]);
	
	await db.insert(DingObenRechts).values([
		{ spruch: "GPT free!" },
		{ spruch: "Bumm!" },
		{ spruch: "Made with 100% organic<br/>free-range human tears!" },
	])
}
