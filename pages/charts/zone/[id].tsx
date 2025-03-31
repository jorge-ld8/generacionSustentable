import { GetServerSideProps } from "next";
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import GenChartZone from "../../../components/genericChartZone";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useZoneChartData } from "../../../hooks/useZoneChartData";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const zoneType = ctx.params?.id as string;
    const filter = ctx.query.filter as string | undefined;

    // This is just for initial server-side rendering
    // We'll fetch data client-side with SWR
    return {
      props: {
        zoneType,
        initialFilter: filter || 'Todos'
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: { 
        error: 'Failed to load data' 
      }
    };
  }
};

export default function ChartFinal({ zoneType, initialFilter, error }) {
  const router = useRouter();
  const [filter, setFilter] = useState(initialFilter);
  
  // Use our custom SWR hook for chart data, passing the filter
  const { chartData, isLoading, isError } = useZoneChartData(zoneType, filter);

  // Register necessary Chart.js components
  Chart.register(CategoryScale);


  // Update filter state when query param changes
  useEffect(() => {
    if (router.query.filter) {
      setFilter(router.query.filter as string);
    }
  }, [router.query.filter]);

  // Handle filter change
  const handleFilterChange = async (newFilter) => {
    if (newFilter === filter) return; // Prevent duplicate submissions
    
    setFilter(newFilter);
    
    // Update URL to reflect the current filter
    await router.push({
      pathname: router.pathname,
      query: { 
        ...router.query, 
        filter: newFilter 
      }
    }, undefined, { shallow: true });
  };

  // Handle errors
  if (isError || error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error loading chart data</h2>
        <p>Please try again later or contact support.</p>
      </div>
    );
  }
  
  // Construct the total object the GenChartZone component expects
  const total = chartData ? {
    totalLGBT: chartData.totalLGBT, 
    totalMujeres: chartData.totalMujeres, 
    totalInd: chartData.totalInd, 
    totalParticipantes: chartData.totalParticipantes, 
    totalRural: chartData.totalRural,
    totalNoId: chartData.totalNoId,
    total1629: chartData.total1629,
    totallid1629: chartData.totallid1629
  } : {
    totalLGBT: [0, 0, 0, 0], 
    totalMujeres: [0, 0, 0, 0], 
    totalInd: [0, 0, 0, 0], 
    totalParticipantes: [0, 0, 0, 0], 
    totalRural: [0, 0, 0, 0],
    totalNoId: [0, 0, 0, 0],
    total1629: [0, 0, 0, 0],
    totallid1629: [0, 0, 0, 0]
  };

  return (
    <GenChartZone 
      name={zoneType} 
      iniNum={chartData?.countIni?._count?.id || 0} 
      total={total} 
      totalActionTypes={chartData?.totalActionTypes || [0, 0, 0, 0]} 
      totalGenders={chartData?.totalGenders || [0, 0, 0, 0]} 
      totalPobs={chartData?.totalPobs || [0, 0, 0]}
      isSubmitting={isLoading}
      setFilter={handleFilterChange}
      organizations={chartData?.organizations || []}
      currentFilter={filter}
    />
  );
}