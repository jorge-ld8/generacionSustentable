import { GetServerSideProps } from "next";
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { ORANGE, localidades } from "../../../lib/constants";
import GenChartComunidad from "../../../components/genericChartComunidad";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useComunidadChartData } from "../../../hooks/useComunidadChartData";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const comunidadType = ctx.params?.id as string;
    const filter = ctx.query.filter as string | undefined;

    // This is just for initial server-side rendering
    // We'll fetch data client-side with SWR
    return {
      props: {
        comunidadType,
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

export default function ChartFinal({ comunidadType, initialFilter, error }) {
  const router = useRouter();
  const [filter, setFilter] = useState(initialFilter);
  
  // Use our custom SWR hook for chart data, passing the filter
  const { chartData, isLoading, isError } = useComunidadChartData(comunidadType, filter);

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
    
    // setIsSubmitting(true);
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

  // Default empty data structures for when data is still loading
  const emptyFinalArr = {
    participantes: [0, 0, 0, 0],
    mujeres: [0, 0, 0, 0],
    noid: [0, 0, 0, 0],
    lgbtiq: [0, 0, 0, 0],
    pob_16_29: [0, 0, 0, 0],
    lid_pob_16_29: [0, 0, 0, 0],
    indigena: [0, 0, 0, 0],
    rural: [0, 0, 0, 0]
  };

  return (
    <GenChartComunidad 
      name={comunidadType} 
      iniNum={chartData?.countIni?._count?.id || 0} 
      totals={chartData?.totalnames || [0, 0, 0, 0]} 
      labels={chartData?.actionTypeLabels || []} 
      color={ORANGE} 
      totalLocTypes={chartData?.totalActTypes || [0, 0, 0, 0]} 
      totalComunidad={chartData?.totalComunidad || [0, 0, 0, 0]} 
      finalArr={chartData?.finalArr || emptyFinalArr} 
      totalGenders={chartData?.totalGenders || [0, 0, 0, 0]} 
      totalPobs={chartData?.totalPobs || [0, 0, 0]}
      setFilter={handleFilterChange}
      isSubmitting={isLoading}
    />
  );
}