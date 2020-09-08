export default function CleanText(text) {
    let cleanText = '';
        for (let i = 0; i < text.length; i++) {
            if (/^[abcdefghiklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTUVWXYZ]+$/.test(text[i])) cleanText += text[i];
        }
    return cleanText.toUpperCase();
}
