#!/usr/bin/env node
require('dotenv').config();
const { importCSVToSupabase } = require('./index'); // Adjust the path as needed

// Verify environment variables
function checkEnvironmentVariables() {
    const requiredVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('Error: Missing required environment variables:');
        missingVars.forEach(varName => console.error(`- ${varName}`));
        process.exit(1);
    }
}

// Get the CSV file path from command line arguments
function getFilePath() {
    const args = process.argv.slice(2);
    
    if (args.length !== 1) {
        console.error('Usage: node import-csv.js <path-to-csv-file>');
        console.error('Example: node import-csv.js ./data/initiatives.csv');
        process.exit(1);
    }
    
    return args[0];
}

// Main execution
async function main() {
    try {
        // Check environment variables
        checkEnvironmentVariables();
        
        // Get file path
        const filePath = getFilePath();
        
        console.log(`Starting import of CSV file: ${filePath}`);
        
        // Run the import
        await importCSVToSupabase(filePath);
        
        console.log('Import completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error during import:', error.message);
        process.exit(1);
    }
}

// Run the script
main();