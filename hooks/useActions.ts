import useSWR, { mutate } from 'swr';
import { ActionA1 } from '@prisma/client';
import { 
  createActionA1, 
  updateActionA1, 
  deleteActionA1,
  ActionA1FormData
} from '../services/ActionA1Service';

// Keys for SWR cache
export const ACTIONS_CACHE_KEY = '/api/actions';
export const ACTION_CACHE_KEY = (id: number) => `/api/actions/${id}`;

/**
 * Hook for fetching all actions with SWR
 */
export function useActions() {
  const { data, error, isLoading, mutate: mutateActions } = useSWR<(ActionA1 & {
    organizacion: { id: number; nombre: string },
    localidad: { id: number; nombre?: string; estado?: string };
  })[]>(
    ACTIONS_CACHE_KEY
  );

  return {
    actions: data || [],
    isLoading,
    isError: error,
    mutateActions
  };
}

/**
 * Hook for fetching a single action by ID with SWR
 */
export function useAction(id: number) {
  const { data, error, isLoading, mutate: mutateAction } = useSWR<ActionA1 & {
    organizacion: { id: number; nombre: string },
    localidad: { id: number; nombre?: string; estado?: string };
  }>(
    id ? ACTION_CACHE_KEY(id) : null
  );

  return {
    action: data,
    isLoading,
    isError: error,
    mutateAction
  };
}

/**
 * Helper functions to update the SWR cache after mutations
 */

// Create a new action and update the cache
export async function createAction(data: ActionA1FormData): Promise<ActionA1> {
  const newAction = await createActionA1(data);
  // Revalidate the actions list
  await mutate(ACTIONS_CACHE_KEY);
  return newAction;
}

// Update an action and update the cache
export async function updateAction(id: number, data: ActionA1FormData): Promise<ActionA1> {
  const updatedAction = await updateActionA1(id, data);
  // Revalidate both the specific action and the actions list
  await mutate(ACTION_CACHE_KEY(id));
  await mutate(ACTIONS_CACHE_KEY);
  return updatedAction;
}

// Delete an action and update the cache
export async function deleteAction(id: number): Promise<ActionA1> {
  const deletedAction = await deleteActionA1(id);
  // Revalidate the actions list
  await mutate(ACTIONS_CACHE_KEY);
  return deletedAction;
} 