import CodeWord, {sortCodeWord} from './CodeWord';

/**
 * Phonetic Alphabet.
 */
const phoneticAlphabet: readonly CodeWord[] = [
  new CodeWord('alpha', ['alfa']),
  new CodeWord('bravo'),
  new CodeWord('charlie', ['charle', 'charly']), // cspell:disable-line
  new CodeWord('delta'),
  new CodeWord('echo'),
  new CodeWord('foxtrot'),
  new CodeWord('golf'),
  new CodeWord('hotel'),
  new CodeWord('india'),
  new CodeWord('juliett'),
  new CodeWord('kilo'),
  new CodeWord('lima'),
  new CodeWord('mike'),
  new CodeWord('november'),
  new CodeWord('oscar'),
  new CodeWord('papa'),
  new CodeWord('quebec', ['qebec']), // cspell:disable-line
  new CodeWord('romeo'),
  new CodeWord('sierra', ['siera']), // cspell:disable-line
  new CodeWord('tango'),
  new CodeWord('uniform'),
  new CodeWord('victor', ['viktor']),
  new CodeWord('whiskey', ['whisky', 'wiskey', 'wisky']), // cspell:disable-line
  new CodeWord('x-ray', ['xray']),
  new CodeWord('yankee'),
  new CodeWord('zulu'),
].sort(sortCodeWord);

export default phoneticAlphabet;
