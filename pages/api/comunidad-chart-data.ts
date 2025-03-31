import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { actionTypes, localidades, tipoComunidad, organizaciones } from '../../lib/constants';

// Helper function to normalize results by attribute
function normalizeResults(inputArr, type, att, initialValues, op) {
  const keys = initialValues;
  const myDict = Object.fromEntries(keys.map(key => [key, 0]));
  
  for(const elem of inputArr){
    const arrType = elem[att]; /* Action type, localidad, etc. */
    const sumElem = elem[op][type];
    myDict[arrType] = sumElem;
  }
  
  return Object.values(myDict);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { comunidadType, filter } = req.query;
    
    if (!comunidadType) {
      return res.status(400).json({ message: 'Comunidad type is required' });
    }

    // Create where clause with comunidadType
    const whereClause: Record<string, string> = {
      tipo_localidad: comunidadType as string,
    };
    
    // If filter is specified and not 'Todos', filter by organization
    if (filter && filter !== 'Todos') {
      whereClause.organizacion = filter as string;
    }

    // Detailed data by action type with all population metrics - USING tipo_localidad instead of organizacion
    const totalGral = await prisma.actionA1.groupBy({
      by: ['type'],
      _count: {
        id: true
      },
      _sum: {
        nro_pob_lgbtiq: true,
        nro_mujeres: true,
        nro_pob_ind: true,
        nro_participantes: true,
        nro_pob_rural: true,
        nro_noid: true,
        nro_pob_16_29: true,
        nro_lid_pob_16_29: true
      },
      where: whereClause
    });

    // Total by localidad - matching the original implementation
    const totalLocalidad = await prisma.actionA1.groupBy({
      by: ['localidad', 'tipo_localidad'],
      _count: {
        id: true
      },
      where: whereClause
    });

    // Format the totalnames data (initiatives by action type)
    const totalnames = normalizeResults(totalGral, "id", "type", actionTypes, "_count");

    const totalActTypes = normalizeResults(totalLocalidad, "id", "localidad", localidades, "_count");
    const totalComunidadData = normalizeResults(totalLocalidad, "id", "tipo_localidad", tipoComunidad, "_count");

    // Create the finalArr structure with data broken down by action type
    const finalArr = {
      participantes: normalizeResults(totalGral, "nro_participantes", "type", actionTypes, "_sum"),
      mujeres: normalizeResults(totalGral, "nro_mujeres", "type", actionTypes, "_sum"),
      noid: normalizeResults(totalGral, "nro_noid", "type", actionTypes, "_sum"),
      lgbtiq: normalizeResults(totalGral, "nro_pob_lgbtiq", "type", actionTypes, "_sum"),
      indigena: normalizeResults(totalGral, "nro_pob_ind", "type", actionTypes, "_sum"),
      rural: normalizeResults(totalGral, "nro_pob_rural", "type", actionTypes, "_sum"),
      pob_16_29: normalizeResults(totalGral, "nro_pob_16_29", "type", actionTypes, "_sum"),
      lid_pob_16_29: normalizeResults(totalGral, "nro_lid_pob_16_29", "type", actionTypes, "_sum")
    };

    // Gender distribution for the pie chart
    const totalGenres = await prisma.actionA1.aggregate({
      _sum: {
        nro_pob_lgbtiq: true,
        nro_mujeres: true,
        nro_noid: true,
        nro_participantes: true
      },
      where: whereClause
    });

    // Population distribution for the pie chart
    const totalPob = await prisma.actionA1.aggregate({
      _sum: {
        nro_pob_ind: true,
        nro_pob_rural: true,
        nro_participantes: true
      },
      where: whereClause
    });

    // Count total initiatives
    const countIni = await prisma.actionA1.aggregate({
      _count: {
        id: true
      },
      where: whereClause
    });

    // Return the chart data in the same format as the original implementation
    return res.status(200).json({
      comunidadType,
      actionTypeLabels: actionTypes,
      totalnames,
      totalActTypes,
      totalComunidad: totalComunidadData,
      finalArr,
      totalGenders: [
        totalGenres._sum.nro_mujeres || 0, 
        (totalGenres._sum.nro_participantes || 0) - (totalGenres._sum.nro_noid || 0) - (totalGenres._sum.nro_mujeres || 0), 
        totalGenres._sum.nro_pob_lgbtiq || 0, 
        totalGenres._sum.nro_noid || 0
      ],
      totalPobs: [
        (totalPob._sum.nro_participantes || 0) - (totalPob._sum.nro_pob_ind || 0) - (totalPob._sum.nro_pob_rural || 0),
        totalPob._sum.nro_pob_ind || 0,
        totalPob._sum.nro_pob_rural || 0
      ],
      countIni,
      organizations: organizaciones
    });
  } catch (error) {
    console.error('Error fetching comunidad chart data:', error);
    return res.status(500).json({ message: 'Error fetching comunidad chart data' });
  }
} 