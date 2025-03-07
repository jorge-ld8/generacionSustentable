import { GetServerSideProps } from "next";
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { ORANGE, actionTypes, actionsA1, localidades, tipoComunidad } from "../../../lib/constants";
import { getCookie } from 'cookies-next';
import { actionsA2, actionsA3, actionsA4 } from "../../../lib/constants";
import GenChartAction from "../../../components/genericChartAction";
import prisma from "../../../lib/prisma";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useChartData } from "../../../hooks/useChartData";

function normalizeResults(inputArr, type, att, initialValues, op){
    const keys = initialValues;
    const myDict = Object.fromEntries(keys.map(key => [key, 0]));
    //hacerlo para el array inicial
    for(const elem of inputArr){
        let arrType = elem[att]; /* diferentes nombres de actividades */
        let sumElem =  elem[op][type];
        myDict[arrType] = sumElem;
    }
    return Object.values(myDict);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const actionType = ctx.params?.id as string;
    const filter = ctx.query.filter as string | undefined;

    // This is just for initial server-side rendering
    // We'll fetch data client-side with SWR
    return {
      props: {
        actionType,
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

export default function ChartFinal({ actionType, initialFilter, error }) {
  const router = useRouter();
  const [filter, setFilter] = useState(initialFilter);
  
  // Use our custom SWR hook for chart data
  const { chartData, isLoading, isError } = useChartData(
    actionType,
    filter
  );

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

  // If data is still loading, pass the loading state to GenChartAction
  // which will display a loading indicator
  return (
    <GenChartAction 
      name={actionType} 
      iniNum={chartData?.countIni?._count?.id || 0} 
      totals={chartData?.totalnames || []} 
      labels={chartData?.actionsArr || []} 
      color={ORANGE} 
      totalLocTypes={chartData?.totalActTypes || []} 
      totalComunidad={chartData?.totalComunidad || []} 
      finalArr={chartData?.finalArr || {
        participantes: [],
        mujeres: [],
        noid: [],
        pob_ind: [],
        pob_rural: [],
        lgbtiq: [],
        pob_16_29: [],
        lid_pob_16_29: []
      }} 
      totalGenders={chartData?.totalGenders || [0, 0, 0, 0]} 
      totalPobs={chartData?.totalPobs || [0, 0, 0]}
      setFilter={handleFilterChange}
      isSubmitting={isLoading}
      setIsSubmitting={() => {}}
    />
  );
}