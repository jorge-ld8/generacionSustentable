/**
 * Format a date object as YYYY-MM-DD for use in date inputs
 */
export function formatDateForInput(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Format a date string for API submission
 */
export function formatDateForAPI(date: Date | string): string {
  if (typeof date === 'string') {
    return date;
  }
  return date.toISOString().split('T')[0];
} 