"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const clientes = useQuery(api.clientes.get);
  const createCliente = useMutation(api.clientes.create);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Crear Nuevo Cliente</h2>
          <form onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            
            await createCliente({
              nombreContacto: formData.get('nombreContacto') as string,
              correoContacto: formData.get('correoContacto') as string,
              telefonoContacto: formData.get('telefonoContacto') as string,
              direccionContacto: formData.get('direccionContacto') as string,
              empresa: formData.get('empresa') as string,
            });
            
            form.reset();
          }}>
            <div className="mb-4">
              <label htmlFor="nombreContacto" className="block text-sm font-medium text-gray-700">Nombre del Contacto</label>
              <input type="text" name="nombreContacto" id="nombreContacto" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
            </div>
            <div className="mb-4">
              <label htmlFor="correoContacto" className="block text-sm font-medium text-gray-700">Correo del Contacto</label>
              <input type="email" name="correoContacto" id="correoContacto" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
            </div>
            <div className="mb-4">
              <label htmlFor="telefonoContacto" className="block text-sm font-medium text-gray-700">Teléfono del Contacto</label>
              <input type="tel" name="telefonoContacto" id="telefonoContacto" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
            </div>
            <div className="mb-4">
              <label htmlFor="direccionContacto" className="block text-sm font-medium text-gray-700">Dirección del Contacto</label>
              <input type="text" name="direccionContacto" id="direccionContacto" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
            </div>
            <div className="mb-4">
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Empresa</label>
              <input type="text" name="empresa" id="empresa" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" />
            </div>
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Crear Cliente
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Lista de Clientes</h2>
          <div className="space-y-4">
            {clientes?.map(({ _id, nombreContacto, empresa, correoContacto }) => (
              <div key={_id} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">{nombreContacto}</h3>
                <p className="text-sm text-gray-600">{empresa}</p>
                <p className="text-sm text-gray-500">{correoContacto}</p>
              </div>
            ))}
            {clientes?.length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay clientes registrados</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
