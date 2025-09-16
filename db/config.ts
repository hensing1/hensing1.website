import { defineDb, defineTable, column } from 'astro:db';

const FaktDesTages = defineTable({
  columns: {
    fakt: column.text(),
  }
});

const Pic = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    name: column.text(),
    basePath: column.text(),
    alt: column.text({optional: true})
  }
});

const BlogPageFeature = defineTable({
  columns: {
    picID: column.number({references: () => Pic.columns.id})
  }
});

// const Tag = defineTable({
//   columns: {
//     name: column.text({primaryKey: true})
//   }
// });

// // relates Pics to Tags
// const PicTags = defineTable({
//   columns: {
//     pic: column.number({references: () => Pic.columns.id}),
//     tag: column.text({references: () => Tag.columns.name})
//   }
// });

const BlogPage = defineTable({
  columns: {
    title: column.text({primaryKey: true}),
    emoji: column.text()
  }
});

const BlogSection = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    page: column.text({references: () => BlogPage.columns.title}),
    title: column.text({optional: true})
  }
});

const BlogEntry = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    section: column.number({references: () => BlogSection.columns.id}),
    title: column.text({optional: true}),
    date: column.date()
  }
});

// relates BlogEntry to Pics
const BlogEntryPics = defineTable({
  columns: {
    blogEntry: column.number({references: () => BlogEntry.columns.id}),
    pic: column.number({references: () => Pic.columns.id}),
    featured: column.boolean(), // should this picture be featured on the blog page
  }
});


// https://astro.build/db/config
export default defineDb({
  tables: {
    FaktDesTages, Pic, BlogPage, BlogPageFeature, BlogSection, BlogEntry, BlogEntryPics
    // Tag, PicTags, BlogEntry,
    // BlogSectionEntries
  },
});
