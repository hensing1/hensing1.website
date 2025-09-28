import { defineDb, defineTable, column } from "astro:db";

const FaktDesTages = defineTable({
  columns: {
    fakt: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    FaktDesTages,
  },
});
