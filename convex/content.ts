import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// === SERVICES ===

export const getServices = query({
    args: {},
    handler: async (ctx) => {
        const services = await ctx.db.query("services").collect();
        return await Promise.all(
            services.map(async (service) => {
                let coverUrl = service.imageUrl;
                if (service.coverImageId) {
                    coverUrl = await ctx.storage.getUrl(service.coverImageId) || "";
                }
                return { ...service, imageUrl: coverUrl };
            })
        );
    },
});

export const createService = mutation({
    args: {
        title: v.string(),
        overview: v.string(),
        tools: v.array(v.string()),
        imageUrl: v.optional(v.string()),
        coverImageId: v.optional(v.id("_storage")),
        callToAction: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("services", args);
    },
});

export const removeService = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// === EXPERIENCES ===

export const getExperiences = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("experiences").collect();
    },
});

export const createExperience = mutation({
    args: {
        company: v.string(),
        role: v.string(),
        period: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("experiences", args);
    },
});

export const removeExperience = mutation({
    args: { id: v.id("experiences") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
