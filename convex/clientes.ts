import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
//import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clientes").collect();
  },
});

export const getById = query({
  args: { id: v.id("clientes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    nombreContacto: v.string(),
    correoContacto: v.string(),
    telefonoContacto: v.optional(v.string()),
    direccionContacto: v.optional(v.string()),
    empresa: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clientes", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("clientes"),
    nombreContacto: v.string(),
    correoContacto: v.string(),
    telefonoContacto: v.optional(v.string()),
    direccionContacto: v.optional(v.string()),
    empresa: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("clientes") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
