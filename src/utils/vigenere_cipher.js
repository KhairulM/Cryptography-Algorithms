let seedrandom = require('seedrandom');
let count = 0; // for full vigenere cipher

export function VigenereCipherEncrypt(plaintext, keystring) {
  // sanity check
  plaintext = plaintext.toLowerCase();
  keystring = keystring.toLowerCase();

  // check if key length is equal to plaintext length
  if (keystring.length < plaintext.length) {
    for (let i = 0; i < plaintext.length; i++) {
      keystring += keystring[i];
    }
  } else if (keystring.length > plaintext.length) {
    keystring = keystring.slice(0, plaintext.length);
  }

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
  console.log(ciphertext, keystring);
  // sanity check
  ciphertext = ciphertext.toLowerCase();
  keystring = keystring.toLowerCase();

  // check if key length is equal to ciphertext length
  if (keystring.length < ciphertext.length) {
    for (let i = 0; i < ciphertext.length; i++) {
      keystring += keystring[i];
    }
  } else if (keystring.length > ciphertext.length) {
    keystring = keystring.slice(0, ciphertext.length);
  }

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


export function FullVigenereCipherEncrypt(plaintext, keystring) {
  // sanity check
  plaintext = plaintext.toLowerCase();
  keystring = keystring.toLowerCase();

  // check if key length is equal to plaintext length
  if (keystring.length < plaintext.length) {
    for (let i = 0; i < plaintext.length; i++) {
      keystring += keystring[i];
    }
  } else if (keystring.length > plaintext.length) {
    keystring = keystring.slice(0, plaintext.length);
  }

  const character = "abcdefghijklmnopqrstuvwxyz";

  let charMap = new Map();
  let ciphertext = ""

  for (let i = 0; i < plaintext.length; i++) {
    if (!charMap.has(keystring[i])) {
      // generate alphabet permutation with keystring[i] and count as seed
      let rng = seedrandom(keystring[i] + count);
      let mapValue = character.slice();

      for (let j = mapValue.length-1; j > 0; j--) {
        const rn = Math.floor(rng()*j);
        const temp = mapValue[j];
        mapValue = mapValue.substr(0, j) + mapValue[rn] + mapValue.substr(j+1, mapValue.length);
        mapValue = mapValue.substr(0, rn) + temp + mapValue.substr(rn+1, mapValue.length);
      }

      // assign the mapValue to charMap
      charMap.set(keystring[i], mapValue);
    }

    let charIdx = plaintext.charCodeAt(i) - 97;
    let mapValue = charMap.get(keystring[i]);
    ciphertext += mapValue[charIdx];
  }

  // increment count
  count++;

  return ciphertext.toUpperCase();
}

export function FullVigenereCipherDecrypt(ciphertext, keystring) {
  // sanity check
  ciphertext = ciphertext.toLowerCase();
  keystring = keystring.toLowerCase();

  // check if key length is equal to ciphertext length
  if (keystring.length < ciphertext.length) {
    for (let i = 0; i < ciphertext.length; i++) {
      keystring += keystring[i];
    }
  } else if (keystring.length > ciphertext.length) {
    keystring = keystring.slice(0, ciphertext.length);
  }

  const character = "abcdefghijklmnopqrstuvwxyz";

  let charMap = new Map();
  let plaintext = ""

  for (let i = 0; i < ciphertext.length; i++) {
    if (!charMap.has(keystring[i])) {
      // generate alphabet permutation with keystring[i] and count as seed
      let rng = seedrandom(keystring[i] + (count-1));
      let mapValue = character.slice();

      for (let j = mapValue.length-1; j > 0; j--) {
        const rn = Math.floor(rng()*j);
        const temp = mapValue[j];
        mapValue = mapValue.substr(0, j) + mapValue[rn] + mapValue.substr(j+1, mapValue.length);
        mapValue = mapValue.substr(0, rn) + temp + mapValue.substr(rn+1, mapValue.length);
      }

      // assign the mapValue to charMap
      charMap.set(keystring[i], mapValue);
    }

    let cipherChar = ciphertext[i];
    let mapValue = charMap.get(keystring[i]);

    // find the index of cipherChar inside mapValue
    let plainCharCode = mapValue.indexOf(cipherChar) + 97;
    plaintext += String.fromCharCode(plainCharCode);
  }

  return plaintext.toLowerCase();
}