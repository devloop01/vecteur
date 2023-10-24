import { Vector3 } from './vector3'

/**
 * Create a new Vector3 instance
 * @example
 * vec3(1, 2, 3) // => Vector3 { x: 1, y: 2, z: 3 }
 * vec3([1, 2, 3]) // => Vector3 { x: 1, y: 2, z: 3 }
 * vec3() // => Vector3 { x: 0, y: 0, z: 0 }
 */
export function vec3(x?: number | number[], y?: number, z?: number) {
	if (Array.isArray(x)) return new Vector3(x[0], x[1], x[2])
	return new Vector3(x, y, z)
}

export * from './vector3'

