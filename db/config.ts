import { defineDb, defineTable, column } from 'astro:db';

const FaktDesTages = defineTable({
  columns: {
    fakt: column.text(),
  }
});

const DingObenRechts = defineTable({
  columns: {
    spruch: column.text(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { DingObenRechts, FaktDesTages },
});
