import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    projects: defineTable({
        title: v.string(),
        description: v.string(), // Short description
        fullDescription: v.optional(v.string()), // Overview
        role: v.optional(v.string()),
        industry: v.optional(v.string()),
        category: v.string(),
        tags: v.array(v.string()),
        tools: v.array(v.string()),
        link: v.optional(v.string()),
        imageUrl: v.optional(v.string()), // For legacy URL support or if we store the full URL
        coverImageId: v.optional(v.id("_storage")), // The storage ID
        galleryImageIds: v.optional(v.array(v.id("_storage"))),
    }),
});
