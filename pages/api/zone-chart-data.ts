import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { organizaciones } from '../../lib/constants';

// Helper function to normalize results by action type - matches the original implementation
function normalizeResults(inputArr, type, att) {
  const finalArr = new Array(4).fill(0);
  
  // Process each element in the input array
  for(const elem of inputArr) {
    const arrType = elem["type"]; /* A1, A2, A3 o A4 */
    const sumElem = elem[att][type];
    finalArr[+arrType[1] - 1] = sumElem;
  }
  
  return finalArr;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { zoneType, filter } = req.query;
    
    if (!zoneType) {
      return res.status(400).json({ message: 'Zone type is required' });
    }

    // Create where clause with zoneType
    const whereClause: Record<string, string> = {
      localidad: zoneType as string,
    };
    
    // If filter is specified and not 'Todos', filter by organization
    if (filter && filter !== 'Todos') {
      whereClause.organizacion = filter as string;
    }

    // Get total by LGBT and other metrics - exactly like the original
    const totalLGBT = await prisma.actionA1.groupBy({
      by: ['type'],
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
      _count: {
        id: true
      },
      where: whereClause
    });

    // Gender distribution - exactly like the original
    const totalGenres = await prisma.actionA1.aggregate({
      _sum: {
        nro_mujeres: true,
        nro_noid: true,
        nro_participantes: true,
        nro_pob_lgbtiq: true
      },
      where: whereClause
    });

    // Population distribution - exactly like the original
    const totalPob = await prisma.actionA1.aggregate({
      _sum: {
        nro_participantes: true,
        nro_pob_ind: true,
        nro_pob_rural: true
      },
      where: whereClause
    });

    // Count total initiatives - exactly like the original
    const countIni = await prisma.actionA1.aggregate({
      _count: {
        id: true
      },
      where: whereClause
    });

    // Create the response object with all the metrics from the original implementation
    return res.status(200).json({
      zoneType,
      totalLGBT: normalizeResults(totalLGBT, "nro_pob_lgbtiq", "_sum"),
      totalMujeres: normalizeResults(totalLGBT, "nro_mujeres", "_sum"),
      totalNoId: normalizeResults(totalLGBT, "nro_noid", "_sum"),
      total1629: normalizeResults(totalLGBT, "nro_pob_16_29", "_sum"),
      totallid1629: normalizeResults(totalLGBT, "nro_lid_pob_16_29", "_sum"),
      totalInd: normalizeResults(totalLGBT, "nro_pob_ind", "_sum"),
      totalParticipantes: normalizeResults(totalLGBT, "nro_participantes", "_sum"),
      totalRural: normalizeResults(totalLGBT, "nro_pob_rural", "_sum"),
      totalActionTypes: normalizeResults(totalLGBT, "id", "_count"),
      countIni,
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
      organizations: organizaciones
    });
  } catch (error) {
    console.error('Error fetching zone chart data:', error);
    return res.status(500).json({ message: 'Error fetching zone chart data' });
  }
} 