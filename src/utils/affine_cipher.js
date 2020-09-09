import CleanText from "./clean_text";
import { InverseModulo } from "./inverse_modulo";

Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

export function AffineCipherEncrypt(plainText, a, b) {
  let cleanText = CleanText(plainText);
  let cipher = "";
  for (let i = 0; i < cleanText.length; i++) {
    cipher += EncryptCharacter(cleanText[i], a, b);
  }
  return cipher;
}

export function AffineCipherDecrypt(cipher, a, b) {
  let cleanCipher = CleanText(cipher);
  let plainText = "";
  let ainv = InverseModulo(a, 26);
  for (let i = 0; i < cleanCipher.length; i++) {
    plainText += DecryptCharacter(cleanCipher[i], ainv, b);
  }
  return plainText.toLowerCase();
}

function EncryptCharacter(char, a, b) {
  return String.fromCharCode((((char.charCodeAt(0) - 65) * a + b) % 26) + 65);
}

function DecryptCharacter(char, ainv, b) {
  return String.fromCharCode(
    (ainv * (char.charCodeAt(0) - 65 - b)).mod(26) + 65
  );
}
