export function PlayfairCipherEncrypt(plainText, key) {
    let cleanText = CleanText(plainText);
    let clearKey = ClearDuplicates(key);
    let matrix = BuildMatrix(clearKey);
    if (cleanText.length % 2 !== 0) cleanText += 'Z';
    let cipher = '';
    for (let i = 0; i < cleanText.length; i += 2) {
        cipher += EncryptPair(cleanText[i] + cleanText[i + 1], matrix);
    }
    return cipher;
}

export function PlayfairCipherDecrypt(cipher, key) {
    let cleanCipher = CleanText(cipher);
    let clearKey = ClearDuplicates(key);
    let matrix = BuildMatrix(clearKey);
    if (cleanCipher.length % 2 !== 0) cleanCipher += 'Z';
    let plainText = '';
    for (let i = 0; i < cleanCipher.length; i += 2) {
        plainText += DecryptPair(cleanCipher[i] + cleanCipher[i + 1], matrix);
    }
    return plainText;
}

function CleanText(text) {
    let cleanText = '';
    for (let i = 0; i < text.length; i++) {
        if (/^[abcdefghiklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTUVWXYZ]+$/.test(text[i])) cleanText += text[i];
    }
    return cleanText.toUpperCase();
}

function BuildMatrix(key) {
    let matrix = key.toUpperCase();
    for (let i = 0; i < Alphabet.length; i++) {
        if (!matrix.includes(Alphabet[i])) matrix += Alphabet[i];
    }
    return matrix;
}

function ClearDuplicates(text) {
    let clearText = '';
    for (let i = 0; i < text.length; i++) {
        if (!clearText.includes(text[i])) clearText += text[i];
    }
    return clearText;
}

function EncryptPair(pair, matrix) {
    let firstID = matrix.indexOf(pair[0]);
    let secondID = matrix.indexOf(pair[1]);
    let encrypted = '';
    let pairType = GetPairType(firstID, secondID);
    switch (pairType) {
        case 0:
            let firstCol = firstID % 5;
            let secondCol = secondID % 5;
            let delta = Math.abs(firstCol - secondCol);
            if (firstCol < secondCol) {
                encrypted += matrix[firstID + delta];
                encrypted += matrix[secondID - delta];
            } else {
                encrypted += matrix[firstID - delta];
                encrypted += matrix[secondID + delta];
            }
            break;
        case 1:
            let row = Math.floor(firstID / 5);
            encrypted += matrix[(row * 5) + ((firstID + 1) % 5)];
            encrypted += matrix[(row * 5) + ((secondID + 1) % 5)];
            break;
        case 2:
            encrypted += matrix[(firstID + 5) % 25];
            encrypted += matrix[(secondID + 5) % 25];
            break;
    }
    return encrypted;
}

function DecryptPair(pair, matrix) {
    let firstID = matrix.indexOf(pair[0]);
    let secondID = matrix.indexOf(pair[1]);
    let encrypted = '';
    let pairType = GetPairType(firstID, secondID);
    switch (pairType) {
        case 0:
            let firstCol = firstID % 5;
            let secondCol = secondID % 5;
            let delta = Math.abs(firstCol - secondCol);
            if (firstCol < secondCol) {
                encrypted += matrix[firstID + delta];
                encrypted += matrix[secondID - delta];
            } else {
                encrypted += matrix[firstID - delta];
                encrypted += matrix[secondID + delta];
            }
            break;
        case 1:
            let row = Math.floor(firstID / 5);
            encrypted += matrix[(row * 5) + ((firstID + 4) % 5)];
            encrypted += matrix[(row * 5) + ((secondID + 4) % 5)];
            break;
        case 2:
            encrypted += matrix[(firstID + 20) % 25];
            encrypted += matrix[(secondID + 20) % 25];
            break;
    }
    return encrypted;
}

function GetPairType(firstID, secondID) {
    if (Math.abs(firstID - secondID) % 5 == 0) return 2;
    if (Math.floor(firstID / 5) === Math.floor(secondID / 5)) return 1;
    return 0;
}

const Alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
