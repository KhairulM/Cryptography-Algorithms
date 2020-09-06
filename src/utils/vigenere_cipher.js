export function VigenereCipherEncrypt(plaintext, keystring) {
  // check if key length is equal to plaintext length
  if (keystring.length < plaintext.length) {
    for (let i = 0; i < plaintext.length; i++) {
      keystring += keystring[i];
    }
  } else if (keystring.length > plaintext.length) {
    keystring = keystring.slice(0, plaintext.length);
  }

  plaintext = plaintext.toLowerCase();
  let ciphertext = "";

  for (let i = 0; i < plaintext.length; i++) {
    let cipherCharCode =
      (plaintext.charCodeAt(i) + keystring.charCodeAt(i) - 194) % 26;
    cipherCharCode += 97;

    ciphertext += String.fromCharCode(cipherCharCode);
  }

  return ciphertext.toUpperCase();
}

export function VigenereCipherDecrypt(ciphertext, keystring) {
  // check if key length is equal to plaintext length
  if (keystring.length < ciphertext.length) {
    for (let i = 0; i < ciphertext.length; i++) {
      keystring += keystring[i];
    }
  } else if (keystring.length > ciphertext.length) {
    keystring = keystring.slice(0, ciphertext.length);
  }

  ciphertext = ciphertext.toLowerCase();
  let plaintext = "";

  for (let i = 0; i < ciphertext.length; i++) {
    let plainCharCode = ciphertext.charCodeAt(i) - keystring.charCodeAt(i);
    if (plainCharCode < 0) {
      plainCharCode = Math.abs(plainCharCode) % 26;
      plainCharCode = 26 - plainCharCode;
    } else {
      plainCharCode = plainCharCode % 26;
    }
    plainCharCode += 97;

    plaintext += String.fromCharCode(plainCharCode);
  }

  return plaintext.toLowerCase();
}
