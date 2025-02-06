import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clientes").collect();
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
