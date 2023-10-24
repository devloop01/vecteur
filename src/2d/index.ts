import { Vector2 } from './vector2'

/**
 * Create a new Vector2 instance
 * @example
 * vec2(1, 2) // => Vector2 { x: 1, y: 2 }
 * vec2([1, 2]) // => Vector2 { x: 1, y: 2 }
 * vec2() // => Vector2 { x: 0, y: 0 }
 */
export function vec2(x?: number | number[], y?: number) {
	if (Array.isArray(x)) return new Vector2(x[0], x[1])
	return new Vector2(x, y)
}

export * from './vector2'

