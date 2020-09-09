import CleanText from "./clean_text";
import { matrix, multiply } from "mathjs";
import { InverseModulo } from "./inverse_modulo";

export function HillCipherEncrypt(plainText, key) {
  let cleanText = CleanText(plainText);
  let preparedText = PrepareText(cleanText);
  let capitalKey = key.toUpperCase();
  let convertedKey = ConvertTextToNumber(capitalKey);
  let keyMatrix = BuildMatrix(convertedKey);
  let cipher = "";
  for (let i = 0; i < preparedText.length; i += 3) {
    let pair = preparedText[i] + preparedText[i + 1] + preparedText[i + 2];
    cipher += EncryptPair(pair, keyMatrix);
  }
  return cipher;
}

export function HillCipherDecrypt(cipher, key) {
  let cleanCipher = CleanText(cipher);
  let preparedCipher = PrepareText(cleanCipher);
  let capitalKey = key.toUpperCase();
  let convertedKey = ConvertTextToNumber(capitalKey);
  let inversedMatrix = InverseMatrix(convertedKey);
  let plainText = "";
  for (let i = 0; i < preparedCipher.length; i += 3) {
    let pair =
      preparedCipher[i] + preparedCipher[i + 1] + preparedCipher[i + 2];
    plainText += DecryptPair(pair, inversedMatrix);
  }
  return plainText;
}

function PrepareText(text) {
  let preparedText = text;
  while (preparedText.length % 3 !== 0) preparedText += "Z";
  return preparedText;
}

function EncryptPair(pair, keyMatrix) {
  let multiplicationResult = multiply(keyMatrix, ConvertTextToNumber(pair));
  let cipher = "";
  for (let i = 0; i < multiplicationResult.size(); i++) {
    cipher += String.fromCharCode((multiplicationResult.get([i]) % 26) + 65);
  }
  return cipher;
}

function DecryptPair(pair, inversedKeyMatrix) {
  let multiplicationResult = multiply(
    inversedKeyMatrix,
    ConvertTextToNumber(pair)
  );
  let plainText = "";
  for (let i = 0; i < multiplicationResult.size(); i++) {
    plainText += String.fromCharCode((multiplicationResult.get([i]) % 26) + 65);
  }
  return plainText;
}

function InverseMatrix(matrix) {
  let a = matrix[4] * matrix[8] - matrix[7] * matrix[5];
  let b = matrix[5] * matrix[6] - matrix[3] * matrix[8];
  let c = matrix[3] * matrix[7] - matrix[4] * matrix[6];
  let d = matrix[7] * matrix[2] - matrix[1] * matrix[8];
  let e = matrix[0] * matrix[8] - matrix[2] * matrix[6];
  let f = matrix[1] * matrix[6] - matrix[0] * matrix[7];
  let g = matrix[1] * matrix[5] - matrix[4] * matrix[2];
  let h = matrix[2] * matrix[3] - matrix[0] * matrix[5];
  let i = matrix[0] * matrix[4] - matrix[1] * matrix[3];
  let aA = matrix[0] * a;
  let bB = matrix[1] * b;
  let cC = matrix[2] * c;
  let determinant = aA + bB + cC;
  while (determinant < 0) determinant += 26;
  let inverseDeterminant = InverseModulo(determinant, 26);
  a *= inverseDeterminant;
  while (a < 0) a += 26;
  b *= inverseDeterminant;
  while (b < 0) b += 26;
  c *= inverseDeterminant;
  while (c < 0) c += 26;
  d *= inverseDeterminant;
  while (d < 0) d += 26;
  e *= inverseDeterminant;
  while (e < 0) e += 26;
  f *= inverseDeterminant;
  while (f < 0) f += 26;
  g *= inverseDeterminant;
  while (g < 0) g += 26;
  h *= inverseDeterminant;
  while (h < 0) h += 26;
  i *= inverseDeterminant;
  while (i < 0) i += 26;
  return BuildMatrix([a, d, g, b, e, h, c, f, i]);
}

function ConvertTextToNumber(text) {
  let converted = [];
  for (let i = 0; i < text.length; i++) {
    converted.push(text.charCodeAt(i) - 65);
  }
  return converted;
}

function BuildMatrix(key) {
  let keyArr = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      keyArr[i] =
        keyArr[i] === undefined
          ? [key[i * 3 + j]]
          : [...keyArr[i], key[i * 3 + j]];
    }
  }
  return matrix(keyArr);
}
