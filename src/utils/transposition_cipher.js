import { filterAlphabets } from "../utils/preprocessor";

export function TranspositionCipherEncrypt(plaintext) {
  //sanity check
  plaintext = plaintext.toLowerCase();
  plaintext = filterAlphabets(plaintext);

  const numCol = 2;

  let ciphertext = "";

  for (let i = 0; i < plaintext.length; i += numCol) {
    ciphertext += plaintext[i];
  }

  for (let i = 1; i < plaintext.length; i += numCol) {
    ciphertext += plaintext[i];
  }

  return ciphertext.toUpperCase();
}

export function TranspositionCipherDecrypt(ciphertext) {
  //sanity check
  ciphertext = ciphertext.toLowerCase();
  ciphertext = filterAlphabets(ciphertext);

  const numCol = 2;
  const numRow = Math.ceil(ciphertext.length / numCol);

  let plaintext = "";

  for (let i = 0; i < numRow; i++) {
    plaintext += ciphertext[i];
    if (i + numRow < ciphertext.length) plaintext += ciphertext[i + numRow];
  }

  return plaintext.toLowerCase();
}
