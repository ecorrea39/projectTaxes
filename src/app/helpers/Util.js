const Util = {};

Util.validarRif = (rif) => {
  try {
    if (!rif) return false;
    const cleanRegex = /[^vecjpg0-9]/ig;
    const partsRegex = /^([vecjpg]{1})[- ]?([0-9]{5,9})[- ]?([0-9]{1})$/i;
    const cleanRif = rif.trim().toLowerCase().replace(cleanRegex, '');
    const rifParts = cleanRif.match(partsRegex);

    if (cleanRif === null || rifParts.length > 4) return false;

    const letterFactors = { v: 1, e: 2, c: 3, j: 3, p: 4, g: 5 };
    const digitFactors = [3, 2, 7, 6, 5, 4, 3, 2];

    const rifLetter = rifParts[1];
    const rifDigits = rifParts[2].padStart(8, '0');
    const rifCode = Number.parseInt(rifParts[3]);

    const letterFactor = letterFactors[rifLetter] * 4;
    const rifDigitsArr = rifDigits.split('').map(Number);

    let acum = letterFactor;
    for (let i = 0; i < rifDigitsArr.length; i++) {
      acum += rifDigitsArr[i] * digitFactors[i];
    }
    const preCode = 11 - (acum % 11);
    const code = (preCode >= 10 || preCode <= 0) ? 0 : preCode;

    if (code !== rifCode) return false;

    return true;
  } catch {
    return false;
  }
};

export default Util;