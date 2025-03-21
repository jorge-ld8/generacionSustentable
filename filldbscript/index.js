const { parse } = require('csv-parse/sync');
const fs = require('fs');
const { createClient } = require("@supabase/supabase-js");
const { actionTypes, actionsA1, actionsA2, actionsA3, actionsA4 } = require('./constants');
// const { supabase } = require('../utils/supabase');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to validate and parse date
function parseDateFromCSV(dateStr) {
  try {
      // Check if the string matches MM/DD/YYYY format
      const dateRegex = /^([1-9]|1[0-2])\/([1-9]|[12]\d|3[01])\/\d{4}$/
      if (!dateRegex.test(dateStr)) {
          throw new Error(`Invalid date format: ${dateStr}. Expected MM/DD/YYYY`)
      }

      // Parse the date
      const [month, day, year] = dateStr.split('/').map(num => parseInt(num, 10))
      const date = new Date(year, month - 1, day)

      // Validate the parsed date
      if (isNaN(date.getTime())) {
          throw new Error(`Invalid date: ${dateStr}`)
      }

      // Check if the date is realistic
      const now = new Date()
      if (date > now) {
          throw new Error(`Future date not allowed: ${dateStr}`)
      }

      // Return ISO string for database storage
      return date.toISOString()
  } catch (error) {
      console.error(`Error parsing date: ${dateStr}`)
      throw error
  }
}

// Class implementation
class ActionA1 {
    constructor({
        id = null,
        nombre,
        type,
        fecha_inicio,
        fecha_final,
        localidad,
        nro_participantes,
        nro_mujeres,
        nro_noid,
        nro_pob_ind = null,
        nro_pob_lgbtiq,
        nro_pob_rural = null,
        nro_pob_16_29 = null,
        nro_lid_pob_16_29,
        organizacion,
        tipo_localidad,
        descripcion,
        nombre_real,
        imgUrl = null
    }) {
        this.id = id;
        this.nombre = nombre;
        this.type = type;
        this.fecha_inicio = new Date(fecha_inicio);
        this.fecha_final = new Date(fecha_final);
        this.localidad = localidad;
        this.nro_participantes = nro_participantes;
        this.nro_mujeres = nro_mujeres;
        this.nro_noid = nro_noid;
        this.nro_pob_ind = nro_pob_ind;
        this.nro_pob_lgbtiq = nro_pob_lgbtiq;
        this.nro_pob_rural = nro_pob_rural;
        this.nro_pob_16_29 = nro_pob_16_29;
        this.nro_lid_pob_16_29 = nro_lid_pob_16_29;
        this.organizacion = organizacion;
        this.tipo_localidad = tipo_localidad;
        this.descripcion = descripcion;
        this.nombre_real = nombre_real;
        this.imgUrl = imgUrl;
    }
}

const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

async function importCSVToSupabase(filePath) {
  try {
    // Read CSV file
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // Parse CSV content
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })

    console.log(records[0]);
    // Transform records to match your database schema
    const initiatives = records.map((record) => ({
       organizacion: record.organizacion.trim(), 
       localidad: ['canoabo', 'gran valencia'].includes(record.localidad.trim().toLowerCase()) 
       ? 'Carabobo' : ['distrito capital', 'caracas'].includes(record.localidad.trim().toLowerCase()) 
       ? 'Distrito Capital' : 'Delta Amacuro',
       nombre_real: record.nombre_real.trim() + " " + record.actividad.trim(),
       fecha_inicio: parseDateFromCSV(record.fecha_inicio.trim()),
       fecha_final: parseDateFromCSV(record.fecha_final.trim()),
       descripcion: record.descripcion.trim(),
       tipo_localidad: toPascalCase(record.tipo_localidad.trim()),
       nombre: record.nombre.trim(),
       nro_participantes: parseInt(record.nro_participantes),
       nro_pob_16_29: parseInt(record.nro_pob_16_29),
       nro_mujeres: parseInt(record.nro_mujeres),
       nro_pob_lgbtiq: parseInt(record.nro_pob_lgbtiq),
       ...(record.tipo_localidad.trim() !== "urbana" && {[`${record.tipo_localidad.trim() === "rural" ? "nro_pob_rural" : "nro_pob_ind"}`]: parseInt(record.nro_participantes)}),
       nro_noid: parseInt(record.nro_participantes) - parseInt(record.nro_mujeres) - parseInt(record.nro_hombres) - parseInt(record.nro_pob_lgbtiq),
       nro_lid_pob_16_29: parseInt(record.nro_pob_16_29),
       type: actionsA1.includes(record.nombre.trim()) ? 
       actionTypes[0] :  (actionsA2.includes(record.nombre.trim()) ? 
       actionTypes[1] : (actionsA3.includes(record.nombre.trim()) ?
       actionTypes[2] : actionTypes[3]))
    }))

    // nombre is clasificacion attribute 
    // nombre_real is nombre attribute

    let batchSize = 10;
    console.log(initiatives.length);
    // Insert data in batches to avoid timeout
    for (let i = 0; i < initiatives.length; i += batchSize) {
      let batch;
      if (i + batchSize >= initiatives.length){
        batch = initiatives.slice(i, initiatives.length-1); 
      }
      else{
        batch = initiatives.slice(i, i + batchSize)
      }

      console.log(batch[0])

      const { error } = await supabase
        .from('actionA1')
        .insert(batch);

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
      } else {
        console.log(`Successfully inserted batch ${i / batchSize + 1}`)
      }
    }
    console.log('CSV import completed')
  } catch (error) {
    console.error('Error importing CSV:', error)
    throw error
  }
}

// Example usage:
// You can call this function from an API route or script
// importCSVToSupabase('path/to/your/initiatives.csv')

module.exports = { importCSVToSupabase };