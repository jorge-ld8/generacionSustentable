import useSWR from 'swr';

// Cache key for chart data
export const CHART_CACHE_KEY = (actionType: string, filter?: string) => 
  `/api/actividad-chart-data?actionType=${actionType}${filter ? `&filter=${filter}` : ''}`;

/**
 * Custom hook for fetching chart data with SWR
 * 
 * @param actionType The type of action to fetch chart data for
 * @param filter Optional filter for the chart data
 */
export function useActividadChartData(actionType: string, filter?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    actionType ? CHART_CACHE_KEY(actionType, filter) : null,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    chartData: data,
    isLoading,
    isError: error,
    mutateChartData: mutate
  };
} 