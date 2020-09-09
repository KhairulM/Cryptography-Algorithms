export function saveFile (binaryString, name) {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  let array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    array[i] = binaryString.charCodeAt(i);
  }

  let blob = new Blob([array], {
    type: "application/octet-stream"
  });
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
};