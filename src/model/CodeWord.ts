/**
 * Phonetic Alphabet code word (with accepted alternative spellings).
 */
class CodeWord {
  private readonly _letter: string;
  readonly spelling: string;
  readonly alternativeSpellings: readonly string[];

  constructor(spelling: string, alternativeSpellings?: string[]) {
    if (spelling.length < 1) {
      throw new Error('Invalid code word: ' + spelling);
    }
    this._letter = spelling[0];
    this.spelling = spelling;
    this.alternativeSpellings = alternativeSpellings ?? [];
  }

  get letter() {
    return this._letter;
  }
}

const sortCodeWord = (lhs: CodeWord, rhs: CodeWord) => {
  // Strictly by ASCII first (ignore case)
  const lhsLetter = lhs.letter.toLowerCase().charCodeAt(0);
  const rhsLetter = rhs.letter.toLowerCase().charCodeAt(0);

  if (lhsLetter < rhsLetter) {
    return -1;
  } else if (lhsLetter > rhsLetter) {
    return 1;
  } else {
    // Fall back to localeCompare() (ignore case)
    return lhs.spelling
      .toLowerCase()
      .localeCompare(rhs.spelling.toLowerCase(), 'en');
  }
};

export default CodeWord;
export {sortCodeWord};
