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

// ... (existing code for removeService)
export const removeService = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getServiceById = query({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        const service = await ctx.db.get(args.id);
        if (!service) return null;
        let coverUrl = service.imageUrl;
        if (service.coverImageId) {
            coverUrl = await ctx.storage.getUrl(service.coverImageId) || "";
        }
        return { ...service, imageUrl: coverUrl };
    },
});

export const updateService = mutation({
    args: {
        id: v.id("services"),
        title: v.string(),
        overview: v.string(),
        tools: v.array(v.string()),
        imageUrl: v.optional(v.string()),
        coverImageId: v.optional(v.id("_storage")),
        callToAction: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});


// === EXPERIENCES ===

// ... (existing code for getExperiences, createExperience)

export const getExperiences = query({
    // ...
    handler: async (ctx) => {
        return await ctx.db.query("experiences").collect();
    },
});

export const getExperienceById = query({
    args: { id: v.id("experiences") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ... (existing code for createExperience)

export const createExperience = mutation({
    args: {
        company: v.string(),
        role: v.string(),
        period: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("experiences", {
            company: args.company,
            role: args.role,
            period: args.period,
            description: args.description,
        });
    },
});

export const updateExperience = mutation({
    args: {
        id: v.id("experiences"),
        company: v.string(),
        role: v.string(),
        period: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const removeExperience = mutation({
    args: { id: v.id("experiences") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
