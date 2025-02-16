/**
 * Formats a number according to its magnitude, returning both abbreviated and full formats.
 * @param {number} num - The number to format.
 * @returns {[string, string]} - An array containing shortFormat and longFormat.
 */
export function formatNumberForDisplay(num: number): [string, string] {
  if (typeof num !== 'number') {
    throw new Error('Invalid input: Input must be a number.');
  }

  const absNum = Math.abs(num);

  // Full format (using Intl.NumberFormat for localized formatting)
  const longFormat = new Intl.NumberFormat().format(num);

  // Abbreviated format
  let shortFormat = '';
  if (absNum >= 1e12) {
    shortFormat = (num / 1e12).toFixed(0) + 'T';
  } else if (absNum >= 1e9) {
    shortFormat = (num / 1e9).toFixed(0) + 'B';
  } else if (absNum >= 1e6) {
    shortFormat = (num / 1e6).toFixed(0) + 'M';
  } else if (absNum >= 1e3) {
    shortFormat = (num / 1e3).toFixed(0) + 'K';
  } else {
    shortFormat = longFormat; // If less than 1000, it's the same as the full format
  }

  return [shortFormat, longFormat];
}
