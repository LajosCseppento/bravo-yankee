/**
 * Phonetic Alphabet. Keys are the correct spellings, values are arrays of accepted spellings with typos.
 */
const phoneticAlphabet = new Map<string, string[]>([
  ['alpha', ['alfa']],
  ['bravo', []],
  ['charlie', ['charle', 'charly', 'charley']], // cspell:disable-line
  ['delta', []],
  ['echo', []],
  ['foxtrot', ['foxtrott']], // cspell:disable-line
  ['golf', []],
  ['hotel', []],
  ['india', []],
  ['juliet', ['juliett']], // cspell:disable-line
  ['kilo', []],
  ['lima', []],
  ['mike', []],
  ['november', []],
  ['oscar', []],
  ['papa', []],
  ['quebec', ['qebec']], // cspell:disable-line
  ['romeo', []],
  ['sierra', ['siera']], // cspell:disable-line
  ['tango', []],
  ['uniform', []],
  ['victor', ['viktor']],
  ['whiskey', ['whiske', 'whisky', 'wiske', 'wisky']], // cspell:disable-line
  ['x-ray', ['xray']],
  ['yankee', ['yanke']], // cspell:disable-line
  ['zulu', []],
]);

export {phoneticAlphabet};
