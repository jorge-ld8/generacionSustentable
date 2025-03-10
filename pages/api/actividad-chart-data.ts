import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { actionsA1, actionsA2, actionsA3, actionsA4, actionTypes, localidades, tipoComunidad } from '../../lib/constants';

// Helper function to normalize results
function normalizeResults(inputArr, type, att, initialValues, op) {
  const keys = initialValues;
  const myDict = Object.fromEntries(keys.map(key => [key, 0]));
  //hacerlo para el array inicial
  for(const elem of inputArr){
    const arrType = elem[att]; /* diferentes nombres de actividades */
    const sumElem =  elem[op][type];
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
    const { actionType, filter } = req.query;
    
    if (!actionType) {
      return res.status(400).json({ message: 'Action type is required' });
    }

    // Get the appropriate actions list based on action type
    let actionsArr;
    switch (actionType) {
      case actionTypes[0]:
        actionsArr = actionsA1;
        break;
      case actionTypes[1]:
        actionsArr = actionsA2;
        break;
      case actionTypes[2]:
        actionsArr = actionsA3;
        break;
      case actionTypes[3]:
        actionsArr = actionsA4;
        break;
      default:
        return res.status(400).json({ message: 'Invalid action type' });
    }

    // Filter logic based on Beneficiarios type
    const actsBeneficiariosDir = ["Ciclos formativos en acción socioambiental /ciberactivismo","Salidas de campo / actividades al aire libre",
      "Ciclo formativo moda sustentable", "Ciclo formativo reuso productivo", "Ciclo formativo ecoturismo", "Monitoreo equipos locales",
      "Encuentros juveniles"
    ];

    const actsBeneficiariosInd = ["Acciones en áreas públicas","Festival, desfiles, marchas, rodadas, campañas de arte", 
      "Reforestación / restauración", "Reuniones con autoridades locales", "Ferias de emprendimiento sostenbile",
      "Campañas de ciberactivismo", "Formación y trabajo en redes"
    ];

    const allBeneficiarios = actsBeneficiariosDir.concat(actsBeneficiariosInd);

    const beneficiariosList = filter === "Beneficiarios directos" ? actsBeneficiariosDir : 
                             filter === "Beneficiarios indirectos" ? actsBeneficiariosInd : 
                             allBeneficiarios;

    // Calculate number of rural population
    const totalGral = await prisma.actionA1.groupBy({
      by: ['nombre'],
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
      where: {
        type: actionType as string,
        nombre: {
          in: beneficiariosList
        }
      }
    });

    // Count initiatives
    const countIni = await prisma.actionA1.aggregate({
      _count: {
        id: true
      },
      where: {
        type: actionType as string,
        nombre: {
          in: beneficiariosList
        }
      }
    });

    // Calculate totals by locality type
    const totalLoc = await prisma.actionA1.groupBy({
      by: ['tipo_localidad', 'organizacion'],
      _count: {
        id: true
      },
      where: {
        type: actionType as string,
        nombre: {
          in: beneficiariosList
        }
      }
    });


    const totalActTypes = normalizeResults(totalLoc, 'id', 'tipo_localidad', localidades, '_count');
    const totalComunidad = normalizeResults(totalLoc, 'id', 'organizacion', tipoComunidad, '_count');

    // Prepare data for response
    const finalArr = {
      "mujeres": normalizeResults(totalGral, 'nro_mujeres', 'nombre', actionsArr, '_sum'),
      "participantes": normalizeResults(totalGral, 'nro_participantes', 'nombre', actionsArr, '_sum'),
      "noid": normalizeResults(totalGral, 'nro_noid', 'nombre', actionsArr, '_sum'),
      "indigena": normalizeResults(totalGral, 'nro_pob_ind', 'nombre', actionsArr, '_sum'),
      "rural": normalizeResults(totalGral, 'nro_pob_rural', 'nombre', actionsArr, '_sum'),
      "lgbtiq": normalizeResults(totalGral, 'nro_pob_lgbtiq', 'nombre', actionsArr, '_sum'),
      "pob_16_29": normalizeResults(totalGral, 'nro_pob_16_29', 'nombre', actionsArr, '_sum'),
      "lid_pob_16_29": normalizeResults(totalGral, 'nro_lid_pob_16_29', 'nombre', actionsArr, '_sum')
    };

    // Summary data
    const totalGenres = await prisma.actionA1.aggregate({
      _sum: {
        nro_pob_lgbtiq: true,
        nro_mujeres: true,
        nro_noid: true,
        nro_participantes: true
      },
      where: {
        type: actionType as string,
        nombre: {
          in: beneficiariosList
        }
      }
    });

    const totalPob = await prisma.actionA1.aggregate({
      _sum: {
        nro_pob_ind: true,
        nro_pob_rural: true,
        nro_participantes: true
      },
      where: {
        type: actionType as string,
        nombre: {
          in: beneficiariosList
        }
      }
    });

    // Total participants by action type
    const totalnames = normalizeResults(totalGral, 'id', 'nombre', actionsArr, '_count');

    // Return the chart data
    return res.status(200).json({
      actionType,
      countIni,
      totalnames,
      actionsArr,
      totalActTypes,
      totalComunidad,
      finalArr,
      totalGenders: [
        totalGenres._sum.nro_mujeres, 
        totalGenres._sum.nro_participantes - totalGenres._sum.nro_noid - totalGenres._sum.nro_mujeres, 
        totalGenres._sum.nro_pob_lgbtiq, 
        totalGenres._sum.nro_noid
      ],
      totalPobs: [
        totalPob._sum.nro_participantes - totalPob._sum.nro_pob_ind - totalPob._sum.nro_pob_rural,
        totalPob._sum.nro_pob_ind,
        totalPob._sum.nro_pob_rural
      ]
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return res.status(500).json({ message: 'Error fetching chart data' });
  }
} 