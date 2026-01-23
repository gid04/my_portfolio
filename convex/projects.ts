import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// List all projects
export const get = query({
    args: {},
    handler: async (ctx) => {
        const projects = await ctx.db.query("projects").collect();

        // Generate URLs for images
        return await Promise.all(
            projects.map(async (project) => {
                let coverUrl = project.imageUrl;
                if (project.coverImageId) {
                    coverUrl = await ctx.storage.getUrl(project.coverImageId) || "";
                }

                let galleryUrls: string[] = [];
                if (project.galleryImageIds) {
                    galleryUrls = (await Promise.all(
                        project.galleryImageIds.map((id) => ctx.storage.getUrl(id))
                    )).filter((url): url is string => url !== null);
                }

                return {
                    ...project,
                    imageUrl: coverUrl,
                    gallery: galleryUrls
                };
            })
        );
    },
});

export const getById = query({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id);
        if (!project) return null;

        let coverUrl = project.imageUrl;
        if (project.coverImageId) {
            coverUrl = await ctx.storage.getUrl(project.coverImageId) || "";
        }

        let galleryUrls: string[] = [];
        if (project.galleryImageIds) {
            galleryUrls = (await Promise.all(
                project.galleryImageIds.map((id) => ctx.storage.getUrl(id))
            )).filter((url): url is string => url !== null);
        }

        return {
            ...project,
            imageUrl: coverUrl,
            gallery: galleryUrls
        };
    }
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        fullDescription: v.optional(v.string()),
        role: v.optional(v.string()),
        industry: v.optional(v.string()),
        category: v.string(),
        tags: v.array(v.string()),
        tools: v.array(v.string()),
        link: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        coverImageId: v.optional(v.id("_storage")),
        galleryImageIds: v.optional(v.array(v.id("_storage"))),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("projects", args);
    },
});

export const remove = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
