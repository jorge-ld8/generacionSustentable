import useSWR from 'swr';

// Cache key for zone chart data
export const ZONE_CHART_CACHE_KEY = (zoneType: string, filter?: string) => 
  `/api/zone-chart-data?zoneType=${zoneType}${filter ? `&filter=${filter}` : ''}`;

/**
 * Custom hook for fetching zone chart data with SWR
 * 
 * @param zoneType The type of zone to fetch chart data for
 * @param filter Optional filter for beneficiarios type
 */
export function useZoneChartData(zoneType: string, filter?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    zoneType ? ZONE_CHART_CACHE_KEY(zoneType, filter) : null,
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