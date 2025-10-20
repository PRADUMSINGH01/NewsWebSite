/**
 * slugify - create URL friendly slug from title
 * - preserves Unicode letters (e.g. हिंदी), numbers
 * - removes diacritics for latin scripts
 * - collapses spaces/punctuation to a single separator
 *
 * @param {string} title
 * @param {object} opts
 * @param {string} [opts.separator='-']
 * @param {boolean} [opts.removeDiacritics=true] remove latin diacritics (e.g. é -> e)
 * @param {boolean} [opts.lower=true]
 * @returns {string}
 */
export default function slugify(title, opts = {}) {
  const { separator = "-", removeDiacritics = true, lower = true } = opts;

  if (!title && title !== 0) return "";

  let s = String(title).trim();

  // normalize and remove diacritics for latin scripts if requested
  if (removeDiacritics) {
    // NFKD splits accents into separate codepoints; remove combining marks
    s = s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  }

  // remove quotes and special invisible chars
  s = s.replace(/['"`ʼ‘’“”·•]/g, "");

  // replace any run of characters that are NOT Unicode letters (\p{L}) or numbers (\p{N})
  // with the separator. requires the 'u' flag and Unicode property escapes.
  s = s.replace(/[^\p{L}\p{N}]+/gu, separator);

  // collapse multiple separators
  const dupSep = new RegExp(`${separator}{2,}`, "g");
  s = s.replace(dupSep, separator);

  // trim separators from ends
  const trimSep = new RegExp(`(^${separator}|${separator}$)`, "g");
  s = s.replace(trimSep, "");

  if (lower) s = s.toLowerCase();

  return s;
}
