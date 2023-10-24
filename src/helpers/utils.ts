export const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min
export const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b
export const clamp = (n: number, min: number, max: number) => Math.max(Math.min(n, max), min)
