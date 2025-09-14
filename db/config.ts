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

// const BlogPage = defineTable({
//   columns: {
//     title: column.text()
//   }
// });

// const BlogSection = defineTable({
//   columns: {
//     id: column.number({primaryKey: true}),
//     title: column.text()
//   }
// })

// const BlogEntry = defineTable({
//   columns: {
//     id: column.number({primaryKey: true}),
//     title: column.text({optional: true}),
//     date: column.date()
//   }
// });

// // relates BlogPage to BlogSections
// const BlogPageSections = defineTable({
//   columns: {
//     blogPage: column.text({references: () => BlogPage.columns.title}),
//     blogSection: column.number({references: () => BlogSection.columns.id})
//   }
// });

// // relates BlogSection to BlogEntries
// const BlogSectionEntries = defineTable({
//   columns: {
//     blogSection: column.number({references: () => BlogSection.columns.id}),
//     blogEntry: column.number({references: () => BlogEntry.columns.id})
//   }
// });

// // relates BlogEntry to Pics
// const BlogEntryPics = defineTable({
//   columns: {
//     blogEntry: column.number({references: () => BlogEntry.columns.id}),
//     pic: column.number({references: () => Pic.columns.id}),
//   }
// });


// https://astro.build/db/config
export default defineDb({
  tables: {
    FaktDesTages, Pic, BlogPageFeature,
    // Tag, PicTags, BlogPage, BlogSection, BlogEntry,
    // BlogPageSections, BlogSectionEntries, BlogEntryPics
  },
});
