import useSWR from 'swr';

// Cache key for comunidad chart data
export const COMUNIDAD_CHART_CACHE_KEY = (comunidadType: string, filter?: string) => 
  `/api/comunidad-chart-data?comunidadType=${comunidadType}${filter ? `&filter=${filter}` : ''}`;

/**
 * Custom hook for fetching comunidad chart data with SWR
 * 
 * @param comunidadType The type of comunidad to fetch chart data for
 * @param filter Optional filter for beneficiarios type
 */
export function useComunidadChartData(comunidadType: string, filter?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    comunidadType ? COMUNIDAD_CHART_CACHE_KEY(comunidadType, filter) : null,
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