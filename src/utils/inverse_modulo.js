export function InverseModulo(a, b) {
    let inverseModulo;
    for (let i = 0; i < b; i++) {
        if ((a * i) % b === 1) {
            inverseModulo = i;
            break;
        }
    }
    return inverseModulo;
}
