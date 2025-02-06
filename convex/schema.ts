import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clientes: defineTable({
    nombreContacto: v.string(),
    correoContacto: v.string(),
    telefonoContacto: v.optional(v.string()),
    direccionContacto: v.optional(v.string()),
    empresa: v.optional(v.string())
  }),
});