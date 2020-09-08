export function removeWhiteSpace(text) {
  return text.trim().split(" ").join("");
}

export function filterAlphabets(text) {
  return text.split("").filter(el => {
    return (el.charCodeAt(0) >= 97 && el.charCodeAt(0) <= 123)
            || (el.charCodeAt(0) >= 65 && el.charCodeAt(0) <= 90);
  }).join("");
}

export function filterASCII(text) {
  return text.split("").filter(el => {
    return el.charCodeAt(0) >= 0 && el.charCodeAt(0) <= 255;
  }).join("");
}