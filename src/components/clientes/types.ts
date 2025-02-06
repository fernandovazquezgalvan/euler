import * as z from "zod";
import { Id } from "../../../convex/_generated/dataModel";

export const clienteFormSchema = z.object({
  nombreContacto: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  correoContacto: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefonoContacto: z.string().min(8, {
    message: "Por favor ingrese un número de teléfono válido.",
  }).optional().or(z.literal("")),
  direccionContacto: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }).optional().or(z.literal("")),
  empresa: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }).optional().or(z.literal("")),
});

export type ClienteFormValues = z.infer<typeof clienteFormSchema>;

export type Cliente = {
  _id: Id<"clientes">;
  nombreContacto: string;
  correoContacto: string;
  telefonoContacto?: string;
  direccionContacto?: string;
  empresa?: string;
}; 