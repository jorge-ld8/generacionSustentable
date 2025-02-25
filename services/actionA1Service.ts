import { actionA1 } from "@prisma/client";

// Interface for the ActionA1 data we send to the API
export interface ActionA1FormData {
  nombre: string;
  descripcion: string;
  type: string;
  organizacion: string;
  tipo_localidad: string;
  fecha_inicio: string | Date;
  fecha_final: string | Date;
  localidad: string;
  nro_participantes: number;
  nro_mujeres: number;
  nro_pob_ind: number;
  nro_pob_rural: number;
  nro_pob_lgbtiq: number;
  nro_pob_16_29: number;
  nro_lid_pob_16_29: number;
  nro_noid: number;
}

// Get an action by ID
export async function getActionA1ById(id: number): Promise<actionA1> {
  const response = await fetch(`/api/actiona1/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching action: ${response.statusText}`);
  }
  return response.json();
}

// Update an action
export async function updateActionA1(id: number, data: ActionA1FormData): Promise<actionA1> {
  const response = await fetch(`/api/actions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`Error updating action: ${response.statusText}`);
  }
  
  return response.json();
} 