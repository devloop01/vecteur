import { describe, it, expect } from 'vitest'

import { Vector2 } from '../2d/vector2'

describe('Vector2 Class', () => {
	describe('set', () => {
		it('should set the components of the vector', () => {
			const vector = new Vector2()
			vector.set(1, 2)
			expect(vector.x).toBe(1)
			expect(vector.y).toBe(2)
		})

		it('should accept a Vector2 as an argument', () => {
			const vector = new Vector2()
			const otherVector = new Vector2(3, 4)
			vector.set(otherVector)
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(4)
		})

		it('should accept an array as an argument', () => {
			const vector = new Vector2()
			vector.set([5, 6])
			expect(vector.x).toBe(5)
			expect(vector.y).toBe(6)
		})

		it('should accept a single number as an argument for both components', () => {
			const vector = new Vector2()
			vector.set(7)
			expect(vector.x).toBe(7)
			expect(vector.y).toBe(7)
		})
	})

	describe('setX', () => {
		it('should set the x component of the vector', () => {
			const vector = new Vector2()
			vector.setX(1)
			expect(vector.x).toBe(1)
		})
	})

	describe('setY', () => {
		it('should set the y component of the vector', () => {
			const vector = new Vector2()
			vector.setY(2)
			expect(vector.y).toBe(2)
		})
	})

	describe('clone', () => {
		it('should return a new vector with the same components', () => {
			const vector = new Vector2(3, 4)
			const clone = vector.clone()
			expect(clone.x).toBe(3)
			expect(clone.y).toBe(4)
			expect(clone).not.toBe(vector) // Should be a new instance
		})
	})

	describe('toArray', () => {
		it('should return an array with the components of the vector', () => {
			const vector = new Vector2(5, 6)
			const array = vector.toArray()
			expect(array).toEqual([5, 6])
		})
	})

	describe('toString', () => {
		it('should return a string representation of the vector', () => {
			const vector = new Vector2(7, 8)
			const str = vector.toString()
			expect(str).toBe('x: 7, y: 8')
		})
	})

	describe('add', () => {
		it('should add another vector to the current vector', () => {
			const vector = new Vector2(1, 2)
			vector.add(new Vector2(3, 4))
			expect(vector.x).toBe(4)
			expect(vector.y).toBe(6)
		})

		it('should accept an array as an argument', () => {
			const vector = new Vector2(1, 2)
			vector.add([3, 4])
			expect(vector.x).toBe(4)
			expect(vector.y).toBe(6)
		})

		it('should accept a single number as an argument for both components', () => {
			const vector = new Vector2(1, 2)
			vector.add(3)
			expect(vector.x).toBe(4)
			expect(vector.y).toBe(5)
		})
	})

	describe('sub', () => {
		it('should subtract another vector from the current vector', () => {
			const vector = new Vector2(4, 6)
			vector.sub(new Vector2(1, 2))
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(4)
		})

		it('should accept an array as an argument', () => {
			const vector = new Vector2(4, 6)
			vector.sub([1, 2])
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(4)
		})

		it('should accept a single number as an argument for both components', () => {
			const vector = new Vector2(4, 6)
			vector.sub(1)
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(5)
		})
	})

	describe('mult', () => {
		it('should multiply the vector by another vector', () => {
			const vector = new Vector2(2, 3)
			vector.mult(new Vector2(4, 5))
			expect(vector.x).toBe(8)
			expect(vector.y).toBe(15)
		})

		it('should accept an array as an argument', () => {
			const vector = new Vector2(2, 3)
			vector.mult([4, 5])
			expect(vector.x).toBe(8)
			expect(vector.y).toBe(15)
		})

		it('should accept a single number as an argument for both components', () => {
			const vector = new Vector2(2, 3)
			vector.mult(4)
			expect(vector.x).toBe(8)
			expect(vector.y).toBe(12)
		})
	})

	describe('div', () => {
		it('should divide the vector by another vector', () => {
			const vector = new Vector2(8, 15)
			vector.div(new Vector2(4, 5))
			expect(vector.x).toBe(2)
			expect(vector.y).toBe(3)
		})

		it('should accept an array as an argument', () => {
			const vector = new Vector2(8, 15)
			vector.div([4, 5])
			expect(vector.x).toBe(2)
			expect(vector.y).toBe(3)
		})

		it('should accept a single number as an argument for both components', () => {
			const vector = new Vector2(8, 15)
			vector.div(4)
			expect(vector.x).toBe(2)
			expect(vector.y).toBe(3.75)
		})
	})

	// Add test cases for other methods like invert, normalize, rotate, and more...

	describe('invert', () => {
		it('should invert the vector', () => {
			const vector = new Vector2(3, 4)
			vector.invert()
			expect(vector.x).toBe(-3)
			expect(vector.y).toBe(-4)
		})
	})

	describe('normalize', () => {
		it('should normalize the vector', () => {
			const vector = new Vector2(3, 4)
			vector.normalize()
			const length = vector.length()
			expect(length).toBe(1)
		})
	})

	describe('rotateAround', () => {
		it('should rotate the vector around a point by an angle', () => {
			const vector = new Vector2(4, 3)
			vector.rotateAround(new Vector2(0, 0), Math.PI / 6)
			expect(vector.x).toBeCloseTo(1.964, 3)
			expect(vector.y).toBeCloseTo(4.598, 3)
		})
	})

	describe('rotate', () => {
		it('should rotate the vector by an angle around origin', () => {
			const vector = new Vector2(4, 3)
			vector.rotate(Math.PI / 6)
			expect(vector.x).toBeCloseTo(1.964, 3)
			expect(vector.y).toBeCloseTo(4.598, 3)
		})
	})

	describe('randomize', () => {
		it('should randomize the vector', () => {
			const vector = new Vector2(3, 4)
			vector.randomize()
			expect(vector.x).toBeGreaterThan(0)
			expect(vector.x).toBeLessThanOrEqual(1)
		})
	})

	describe('clamp', () => {
		it('should clamp the vector between two vectors', () => {
			const vector = new Vector2(3, 4)
			vector.clamp(new Vector2(2, 3), new Vector2(4, 5))
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(4)
		})
	})

	describe('limit', () => {
		it('should limit the length of the vector to a maximum value', () => {
			const vector = new Vector2(3, 4)
			vector.limit(5)
			const length = vector.length()
			expect(length).toBeLessThanOrEqual(5)
		})
	})

	describe('round', () => {
		it('should round the components of the vector to the nearest integer', () => {
			const vector = new Vector2(3.5, 4.7)
			vector.round()
			expect(vector.x).toBe(4)
			expect(vector.y).toBe(5)
		})
	})

	describe('roundToZero', () => {
		it('should round the components of the vector towards zero', () => {
			const vector = new Vector2(3.5, -4.7)
			vector.roundToZero()
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(-4)
		})
	})

	describe('equals', () => {
		it('should check if two vectors are equal', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(3, 4)
			const vector3 = new Vector2(5, 6)

			expect(vector1.equals(vector2)).toBe(true)
			expect(vector1.equals(vector3)).toBe(false)
		})
	})

	describe('min', () => {
		it('should set the components to the minimum of the current and another vector', () => {
			const vector = new Vector2(3, 4)
			vector.min(new Vector2(2, 5))
			expect(vector.x).toBe(2)
			expect(vector.y).toBe(4)
		})
	})

	describe('max', () => {
		it('should set the components to the maximum of the current and another vector', () => {
			const vector = new Vector2(3, 4)
			vector.max(new Vector2(2, 5))
			expect(vector.x).toBe(3)
			expect(vector.y).toBe(5)
		})
	})

	describe('dot', () => {
		it('should return the dot product of the vector and another vector', () => {
			const vector = new Vector2(3, 4)
			const dot = vector.dot(new Vector2(5, 6))
			expect(dot).toBe(39)
		})
	})

	describe('cross', () => {
		it('should return the cross product of the vector and another vector', () => {
			const vector = new Vector2(3, 4)
			const cross = vector.cross(new Vector2(5, 6))
			expect(cross).toBe(-2)
		})
	})

	describe('length', () => {
		it('should return the length of the vector', () => {
			const vector = new Vector2(3, 4)
			const length = vector.length()
			expect(length).toBe(5)
		})
	})

	describe('lengthSq', () => {
		it('should return the squared length of the vector', () => {
			const vector = new Vector2(3, 4)
			const lengthSq = vector.lengthSq()
			expect(lengthSq).toBe(25)
		})
	})

	describe('manhattanLength', () => {
		it('should return the manhattan length of the vector', () => {
			const vector = new Vector2(3, 4)
			const manhattanLength = vector.manhattanLength()
			expect(manhattanLength).toBe(7)
		})
	})

	describe('lerpX', () => {
		it('should interpolate the x component towards the x component of another vector', () => {
			const vector = new Vector2(1, 2)
			vector.lerpX(new Vector2(3, 4), 0.5)
			expect(vector.x).toBe(2)
			expect(vector.y).toBe(2)
		})
	})

	describe('lerpY', () => {
		it('should interpolate the y component towards the y component of another vector', () => {
			const vector = new Vector2(1, 2)
			vector.lerpY(new Vector2(3, 4), 0.5)
			expect(vector.x).toBe(1)
			expect(vector.y).toBe(3)
		})
	})

	describe('lerp', () => {
		it('should interpolate the vector towards another vector', () => {
			const vector = new Vector2(1, 2)
			vector.lerp(new Vector2(3, 4), 0.5)
			expect(vector.x).toBe(2)
			expect(vector.y).toBe(3)
		})
	})
})

describe('Vector2 Static Methods', () => {
	describe('add', () => {
		it('should add two vectors', () => {
			const vector1 = new Vector2(1, 2)
			const vector2 = new Vector2(3, 4)
			const result = Vector2.add(vector1, vector2)
			expect(result.x).toBe(4)
			expect(result.y).toBe(6)
		})
	})

	describe('sub', () => {
		it('should subtract two vectors', () => {
			const vector1 = new Vector2(4, 6)
			const vector2 = new Vector2(1, 2)
			const result = Vector2.sub(vector1, vector2)
			expect(result.x).toBe(3)
			expect(result.y).toBe(4)
		})
	})

	describe('mult', () => {
		it('should multiply two vectors', () => {
			const vector1 = new Vector2(2, 3)
			const vector2 = new Vector2(4, 5)
			const result = Vector2.mult(vector1, vector2)
			expect(result.x).toBe(8)
			expect(result.y).toBe(15)
		})
	})

	describe('div', () => {
		it('should divide two vectors', () => {
			const vector1 = new Vector2(8, 15)
			const vector2 = new Vector2(4, 5)
			const result = Vector2.div(vector1, vector2)
			expect(result.x).toBe(2)
			expect(result.y).toBe(3)
		})
	})

	describe('equals', () => {
		it('should check if two vectors are equal', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(3, 4)
			const vector3 = new Vector2(5, 6)

			expect(Vector2.equals(vector1, vector2)).toBe(true)
			expect(Vector2.equals(vector1, vector3)).toBe(false)
		})
	})

	describe('min', () => {
		it('should return the minimum of two vectors', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(2, 5)
			const result = Vector2.min(vector1, vector2)
			expect(result.x).toBe(2)
			expect(result.y).toBe(4)
		})
	})

	describe('max', () => {
		it('should return the maximum of two vectors', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(2, 5)
			const result = Vector2.max(vector1, vector2)
			expect(result.x).toBe(3)
			expect(result.y).toBe(5)
		})
	})

	describe('invert', () => {
		it('should invert a vector', () => {
			const vector = new Vector2(3, 4)
			const result = Vector2.invert(vector)
			expect(result.x).toBe(-3)
			expect(result.y).toBe(-4)
		})
	})

	describe('dot', () => {
		it('should return the dot product of two vectors', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(5, 6)
			const dot = Vector2.dot(vector1, vector2)
			expect(dot).toBe(39)
		})
	})

	describe('cross', () => {
		it('should return the cross product of two vectors', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(5, 6)
			const cross = Vector2.cross(vector1, vector2)
			expect(cross).toBe(-2)
		})
	})

	describe('normalize', () => {
		it('should normalize a vector', () => {
			const vector = new Vector2(3, 4)
			const result = Vector2.normalize(vector)
			const length = result.length()
			expect(length).toBe(1)
		})
	})

	describe('distBetween', () => {
		it('should return the distance between two vectors', () => {
			const vector1 = new Vector2(3, 4)
			const vector2 = new Vector2(5, 6)
			const dist = Vector2.distBetween(vector1, vector2)
			expect(dist).toBeCloseTo(2.828, 3)
		})
	})

	describe('lerp', () => {
		it('should interpolate between two vectors', () => {
			const vector1 = new Vector2(1, 2)
			const vector2 = new Vector2(3, 4)
			const result = Vector2.lerp(vector1, vector2, 0.5)
			expect(result.x).toBe(2)
			expect(result.y).toBe(3)
		})
	})
})
