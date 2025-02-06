"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ClienteForm from "./form";
import ClienteDeleteDialog from "./delete-dialog";
import { Cliente, ClienteFormValues } from "./types";

export default function ClientesList() {
  const clientes = useQuery(api.clientes.get);
  const createCliente = useMutation(api.clientes.create);
  const updateCliente = useMutation(api.clientes.update);
  const deleteCliente = useMutation(api.clientes.remove);
  
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<{ id: Id<"clientes">, name: string } | null>(null);

  async function onSubmit(values: ClienteFormValues) {
    try {
      if (editingClient) {
        await updateCliente({
          id: editingClient._id,
          ...values,
        });
      } else {
        await createCliente(values);
      }
      setIsFormOpen(false);
      setEditingClient(null);
    } catch (error) {
      console.error("Error al procesar el cliente:", error);
    }
  }

  const handleEdit = (client: Cliente) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: Id<"clientes">, name: string) => {
    setClientToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clientToDelete) return;
    
    try {
      await deleteCliente({ id: clientToDelete.id });
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                Clientes registrados en el sistema
              </CardDescription>
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Agregar Cliente
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientes?.map((client) => (
                <div key={client._id} className="border-b border-gray-200 pb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{client.nombreContacto}</h3>
                    <p className="text-sm text-gray-600">{client.empresa}</p>
                    <p className="text-sm text-gray-500">{client.correoContacto}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(client)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(client._id, client.nombreContacto)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {clientes?.length === 0 && (
                <p className="text-gray-500 text-center py-4">No hay clientes registrados</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ClienteForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={onSubmit}
        editingClient={editingClient}
      />

      <ClienteDeleteDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        clientName={clientToDelete?.name || ""}
      />
    </div>
  );
} 