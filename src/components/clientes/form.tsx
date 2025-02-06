"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClienteFormValues, clienteFormSchema, Cliente } from "./types";
import { useEffect } from "react";

interface ClienteFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ClienteFormValues) => Promise<void>;
  editingClient: Cliente | null;
}

export default function ClienteForm({
  isOpen,
  onOpenChange,
  onSubmit,
  editingClient,
}: ClienteFormProps) {
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nombreContacto: "",
      correoContacto: "",
      telefonoContacto: "",
      direccionContacto: "",
      empresa: "",
    },
  });

  useEffect(() => {
    if (editingClient) {
      form.reset({
        nombreContacto: editingClient.nombreContacto,
        correoContacto: editingClient.correoContacto,
        telefonoContacto: editingClient.telefonoContacto || "",
        direccionContacto: editingClient.direccionContacto || "",
        empresa: editingClient.empresa || "",
      });
    } else {
      form.reset({
        nombreContacto: "",
        correoContacto: "",
        telefonoContacto: "",
        direccionContacto: "",
        empresa: "",
      });
    }
  }, [editingClient, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingClient ? 'Editar Cliente' : 'Crear Nuevo Cliente'}</DialogTitle>
          <DialogDescription>
            {editingClient 
              ? 'Actualice los datos del cliente'
              : 'Ingrese los datos del nuevo cliente para registrarlo en el sistema.'
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombreContacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Contacto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correoContacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo del Contacto *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="juan@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefonoContacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono del Contacto</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Campo opcional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccionContacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección del Contacto</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle Principal #123" {...field} />
                  </FormControl>
                  <FormDescription>
                    Campo opcional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Empresa S.A." {...field} />
                  </FormControl>
                  <FormDescription>
                    Campo opcional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {editingClient ? 'Actualizar Cliente' : 'Crear Cliente'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 