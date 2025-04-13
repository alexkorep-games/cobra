#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';

const targetDirectory = './src';

/**
 * Recursively reads directories, finds files, and prints their content.
 * @param {string} dirPath The current directory path to scan.
 */
function readAndPrintFilesRecursive(dirPath) {
  try {
    // Check if the path exists before trying to read it
    if (!fs.existsSync(dirPath)) {
      console.warn(`Warning: Path does not exist, skipping: "${dirPath}"`);
      return; // Stop processing this path if it doesn't exist
    }

    // Get stats to ensure it's a directory before reading contents
    const dirStats = fs.statSync(dirPath);
    if (!dirStats.isDirectory()) {
        console.warn(`Warning: Path is not a directory, skipping: "${dirPath}"`);
        return; // Stop processing if it's not a directory
    }

    // Get a list of all entries (files and subdirectories) in the directory
    const entries = fs.readdirSync(dirPath);

    // Optional: Log when entering a directory (can be helpful for debugging)
    // console.log(`--- Scanning directory: ${path.normalize(dirPath)} ---`);

    entries.forEach(entry => {
      const fullPath = path.join(dirPath, entry);

      try {
        // Get information (stats) about the current entry
        const stats = fs.statSync(fullPath);

        if (stats.isFile()) {
          // It's a file - read and print its content
          const content = fs.readFileSync(fullPath, 'utf8');

          // Print in the desired format
          console.log(`${path.normalize(fullPath)}:`); // Normalize for consistent separators
          console.log('```');
          console.log(content);
          console.log('```');
          console.log(''); // Add a blank line for separation

        } else if (stats.isDirectory()) {
          // It's a directory - make the recursive call
          readAndPrintFilesRecursive(fullPath);
        }
        // Ignore other types like symbolic links, block devices etc. for this script

      } catch (entryError) {
        // Log errors accessing specific files/subdirs (e.g., permissions)
        // Continue with the next entry in the current directory
        console.error(`\nError processing entry "${fullPath}": ${entryError.message}`);
      }
    });

  } catch (dirReadError) {
    // Log errors reading the directory itself (e.g., permissions)
    // Stop processing this directory branch, but allow the script to continue elsewhere if called recursively
    console.error(`\nFailed to read directory "${dirPath}": ${dirReadError.message}`);
     // You might want to exit if the *initial* target directory fails:
     if (dirPath === path.resolve(targetDirectory)) { // Compare absolute paths
         process.exit(1);
     }
  }
}

// --- Main Execution ---
const absoluteTargetPath = path.resolve(targetDirectory); // Get absolute path for initial check

if (!fs.existsSync(absoluteTargetPath)) {
    console.error(`Error: Starting directory "${targetDirectory}" (resolved to "${absoluteTargetPath}") not found.`);
    process.exit(1);
}

readAndPrintFilesRecursive(absoluteTargetPath); // Start with the absolute path
