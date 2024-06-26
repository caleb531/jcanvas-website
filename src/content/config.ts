// Import utilities from `astro:content`
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

// Define a `type` and `schema` for each collection
const galleriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    direct_url: z.string(),
    github_url: z.string().optional()
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  galleries: galleriesCollection,
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        is_plugin: z.optional(z.boolean())
      })
    })
  })
};
