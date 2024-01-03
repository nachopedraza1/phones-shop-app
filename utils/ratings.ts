export function generarRatingsAlAzar() {
    // Genera ratings aleatorios
    const positive = Math.random() * (1.0 - 0.35) + 0.35;
    const neutral = Math.random() * (1.0 - positive);
    const negative = 1.0 - positive - neutral;

    // Redondea los valores para que sumen 1
    const roundedPositive = Math.round(positive * 100) / 100;
    const roundedNeutral = Math.round(neutral * 100) / 100;
    const roundedNegative = Math.round(negative * 100) / 100;

    // Construye el objeto de ratings
    const ratings = {
        negative: roundedNegative,
        neutral: roundedNeutral,
        positive: roundedPositive
    };

    return { ratings };
}