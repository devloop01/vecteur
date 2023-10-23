import { clamp, lerp, randomInRange } from './utils'

export type Vector2Tuple = [number, number]

/**
 * Represents a 2D vector with x and y components.
 */
class Vector2 {
	/**
	 * Creates a new Vector2 with optional initial values for x and y.
	 */
	constructor(
		public x = 0,
		public y = 0
	) {}

	/**
	 * Sets the x and y components of the vector.
	 * @example
	 * const v = new Vector2();
	 * v.set(new Vector2(1, 2)); // sets x = 1 and y = 2
	 * v.set([1, 2]); // sets x = 1 and y = 2
	 * v.set(1, 2); // sets x = 1 and y = 2
	 * v.set(1); // same as v.set(1, 1)
	 * @returns this
	 */
	set(x: Vector2 | Vector2Tuple | number, y?: number) {
		if (x instanceof Vector2) {
			this.x = x.x
			this.y = x.y
		} else if (Array.isArray(x)) {
			this.x = x[0]
			this.y = x[1]
		} else {
			this.x = x
			this.y = y || x
		}

		return this
	}

	/**
	 * Sets the x component of the vector.
	 * @example
	 * const v = new Vector2();
	 * v.setX(1); // sets x = 1
	 * @returns this
	 */
	setX(x: number) {
		this.x = x
		return this
	}

	/**
	 * Sets the y component of the vector.
	 * @example
	 * const v = new Vector2();
	 * v.setY(1); // sets y = 1
	 * @returns this
	 */
	setY(y: number) {
		this.y = y
		return this
	}

	/**
	 * Returns a new Vector2 with the same x and y components.
	 * @example
	 * const v1 = new Vector2(1, 2);
	 * const v2 = v.clone(); // same as v1
	 * @returns A new Vector2 with the same x and y components.
	 */
	clone() {
		return new Vector2(this.x, this.y)
	}

	/**
	 * Returns an array with the x and y components of the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.toArray(); // returns [1, 2]
	 * @returns An array with the x and y components of the vector.
	 */
	toArray(): Vector2Tuple {
		return [this.x, this.y]
	}

	/**
	 * Returns a string representation of the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.toString(); // returns 'x: 1, y: 2'
	 * @returns A string representation of the vector.
	 */
	toString() {
		return `x: ${this.x}, y: ${this.y}`
	}

	/**
	 * Adds to the current vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * a.add(new Vector2(1, 2)); // a is now equal to (2, 4)
	 * a.add([1, 2]) // a is now equal to (3, 6)
	 * a.add(1, 2) // a is now equal to (4, 8)
	 * a.add(1) // same as a.add(1, 1)
	 * @returns this
	 */
	add(x: Vector2 | Vector2Tuple | number, y?: number) {
		if (x instanceof Vector2) {
			this.x += x.x
			this.y += x.y
		} else if (Array.isArray(x)) {
			this.x += x[0]
			this.y += x[1]
		} else {
			this.x += x
			this.y += y || x
		}

		return this
	}

	/**
	 * Subtracts from the current vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * a.sub(new Vector2(1, 2)); // a is now equal to (0, 0)
	 * a.sub([1, 2]) // a is now equal to (-1, -2)
	 * a.sub(1, 2) // a is now equal to (-2, -4)
	 * a.sub(1) // same as a.sub(1, 1)
	 * @returns this
	 */
	sub(x: Vector2 | Vector2Tuple | number, y?: number) {
		if (x instanceof Vector2) {
			this.x -= x.x
			this.y -= x.y
		} else if (Array.isArray(x)) {
			this.x -= x[0]
			this.y -= x[1]
		} else {
			this.x -= x
			this.y -= y || x
		}

		return this
	}

	/**
	 * Multplies with the current vector
	 * @example
	 * const a = new Vector2(1, 2);
	 * a.mult(new Vector2(1, 2)); // a is now equal to (1, 4)
	 * a.mult([1, 2]) // a is now equal to (1, 8)
	 * a.mult(1, 2) // a is now equal to (1, 16)
	 * a.mult(1) // same as a.mult(1, 1)
	 * @returns this
	 */
	mult(x: Vector2 | Vector2Tuple | number, y?: number) {
		if (x instanceof Vector2) {
			this.x *= x.x
			this.y *= x.y
		} else if (Array.isArray(x)) {
			this.x *= x[0]
			this.y *= x[1]
		} else {
			this.x *= x
			this.y *= y || x
		}

		return this
	}

	/**
	 * Divides with the current vector
	 * @example
	 * const a = new Vector2(1, 2);
	 * a.div(new Vector2(1, 2)); // a is now equal to (1, 1)
	 * a.div([1, 2]) // a is now equal to (1, 0.5)
	 * a.div(1, 2) // a is now equal to (1, 0.25)
	 * a.div(1) // same as a.div(1, 1)
	 * @returns this
	 */
	div(x: Vector2 | Vector2Tuple | number, y?: number) {
		if (x instanceof Vector2) {
			this.x /= x.x
			this.y /= x.y
		} else if (Array.isArray(x)) {
			this.x /= x[0]
			this.y /= x[1]
		} else {
			this.x /= x
			this.y /= y || x
		}

		return this
	}

	/**
	 * Inverts the x and y components of the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.invert(); // v is now equal to (-1, -2)
	 * @returns this
	 */
	invert() {
		this.x *= -1
		this.y *= -1
		return this
	}

	/**
	 * Normalizes the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.normalize(); // v is now equal to (0.447, 0.894)
	 * @returns this
	 */
	normalize() {
		return this.div(this.length() || 1)
	}

	/**
	 * Rotates the vector around a pivot by a given angle.
	 * @example
	 * const v = new Vector2(1, 0);
	 * const p = new Vector2(0, 0);
	 * v.rotateAround(p, Math.PI / 2); // v is now equal to (0, 1)
	 * @returns this
	 */
	rotateAround(pivot: Vector2, angle: number) {
		const c = Math.cos(angle)
		const s = Math.sin(angle)

		const x = this.x - pivot.x
		const y = this.y - pivot.y

		this.x = pivot.x + x * c - y * s
		this.y = pivot.y + x * s + y * c

		return this
	}

	/**
	 * Rotates the vector by a given angle.
	 * @example
	 * const v = new Vector2(1, 0);
	 * v.rotate(Math.PI / 2); // v is now equal to (0, 1)
	 * @returns this
	 */
	rotate(angle: number) {
		return this.rotateAround(this, angle)
	}

	/**
	 * Randomizes the vector
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.randomize(); // v is anything between (0, 0) and (1, 1)
	 * v.randomize(new Vector2(2, 3), new Vector2(4, 5)); // v is anything between (2, 3) and (4, 5)
	 * @returns this
	 */
	randomize(min?: Vector2, max?: Vector2) {
		min = min || new Vector2(0, 0)
		max = max || new Vector2(1, 1)
		this.x = randomInRange(min.x, max.x)
		this.y = randomInRange(min.y, max.y)
		return this
	}

	/**
	 * Clamps the vector between two vectors.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.clamp(new Vector2(2, 3), new Vector2(4, 5)); // v is now equal to (2, 3)
	 * @returns this
	 */
	clamp(min: Vector2 | number, max: Vector2 | number) {
		if (typeof min === 'number') min = new Vector2(min, min)
		if (typeof max === 'number') max = new Vector2(max, max)
		this.x = clamp(this.x, min.x, max.x)
		this.y = clamp(this.y, min.y, max.y)

		return this
	}

	/**
	 * Limits the vector to a maximum length.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.limit(1); // sets the length of v to maximum of 1
	 * @returns this
	 */
	limit(max: number) {
		if (this.lengthSq() > max * max) this.setLength(max)
		return this
	}

	/**
	 * Rounds the vector to the nearest integer.
	 * @example
	 * const v = new Vector2(1.2, 2.8);
	 * v.round(); // v is now equal to (1, 3)
	 * @returns this
	 */
	round() {
		this.x = Math.round(this.x)
		this.y = Math.round(this.y)
		return this
	}

	/**
	 * Rounds the vector to the nearest integer towards zero.
	 * @example
	 * const v = new Vector2(1.2, 2.8);
	 * v.roundToZero(); // v is now equal to (1, 2)
	 * @returns this
	 */
	roundToZero() {
		this.x = Math.trunc(this.x)
		this.y = Math.trunc(this.y)
		return this
	}

	/**
	 * Checks if the vector is equal to another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(1, 2);
	 * a.equals(b); // returns true
	 * @returns Whether the vector is equal to another vector.
	 */
	equals(v: Vector2) {
		return this.x === v.x && this.y === v.y
	}

	/**
	 * Returns the minimum components of the current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 3);
	 * const b = new Vector2(4, 2);
	 * a.min(b); // returns (1, 2)
	 * @returns minimun vector
	 */
	min(v: Vector2) {
		return new Vector2(Math.min(this.x, v.x), Math.min(this.y, v.y))
	}

	/**
	 * Returns the maximum components of the current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 3);
	 * const b = new Vector2(4, 2);
	 * a.max(b); // returns (4, 3)
	 * @returns maximum vector
	 */
	max(v: Vector2) {
		return new Vector2(Math.max(this.x, v.x), Math.max(this.y, v.y))
	}

	/**
	 * Computes the dot product of the vector with another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.dot(b); // returns 11
	 * @returns dot product
	 */
	dot(v: Vector2) {
		return this.x * v.x + this.y * v.y
	}

	/**
	 * Computes the cross product of the vector with another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.cross(b); // returns -2
	 * @returns cross product
	 */
	cross(v: Vector2) {
		return this.x * v.y - this.y * v.x
	}

	/**
	 * Computes the length of the vector squared.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.lengthSq(); // returns 5
	 * @returns squared length of the vector
	 */
	lengthSq() {
		return this.x * this.x + this.y * this.y
	}

	/**
	 * Computes the length of the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.length(); // returns 2.236
	 * @returns length of the vector
	 */
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	/**
	 * Computes the Manhattan length of the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.manhattanLength(); // returns 3
	 * @returns manhattan length of the vector
	 */
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y)
	}

	/**
	 * Sets the length of the vector.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.setLength(1); // sets the length of the vector to 1
	 * @returns this
	 */
	setLength(length: number) {
		return this.normalize().mult(length)
	}

	/**
	 * Returns the X distance between current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.xDistTo(b); // returns -2
	 * @returns distance between x components
	 */
	xDistTo(v: Vector2) {
		return this.x - v.x
	}

	/**
	 * Returns the Y distance between current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.yDistTo(b); // returns -2
	 * @returns distance between y components
	 */
	yDistTo(v: Vector2) {
		return this.y - v.y
	}

	/**
	 * Returns the squared distance between current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.distToSqrd(b); // returns 8
	 * @returns distance squared between vectors
	 */
	distToSqrd(v: Vector2) {
		const dx = this.x - v.x
		const dy = this.y - v.y
		return dx * dx + dy * dy
	}

	/**
	 * Returns the distance between current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.distTo(b); // returns 2.828
	 * @returns distance between vectors
	 */
	distTo(v: Vector2) {
		return Math.sqrt(this.distToSqrd(v))
	}

	/**
	 * Returns the Manhattan distance between current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.manhattanDistTo(b); // returns 4
	 * @returns manhattan distance between vectors
	 */
	manhattanDistTo(v: Vector2) {
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y)
	}

	/**
	 * Returns the angle in radians with respect to the positive x-axis.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.horizontalAngle(); // returns 1.107
	 * @returns the calculated angle in radians
	 */
	hAngle() {
		return Math.atan2(this.y, this.x)
	}

	/**
	 * Returns the angle in radians with respect to the positive y-axis.
	 * @example
	 * const v = new Vector2(1, 2);
	 * v.verticalAngle(); // returns 1.107
	 * @returns the calculated angle in radians
	 */
	vAngle() {
		return Math.atan2(this.x, this.y)
	}

	/**
	 * @alias horizontalAngle
	 */
	angle() {
		return this.hAngle()
	}

	/**
	 * Returns the angle in radians between the current vector and another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.angleTo(b); // returns 0.179
	 * @returns the calculated angle in radians
	 */
	angleTo(v: Vector2) {
		const denominator = Math.sqrt(this.lengthSq() * v.lengthSq())
		if (denominator === 0) return Math.PI / 2
		return Math.acos(clamp(this.dot(v) / denominator, -1, 1))
	}

	/**
	 * Interpolates x component towards x component of another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.lerpX(b, 0.5); // a is now equal to (2, 2)
	 * @returns this
	 */
	lerpX(v: Vector2, alpha: number) {
		this.x = lerp(this.x, v.x, alpha)
		return this
	}

	/**
	 * Interpolates y component towards y component of another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.lerpY(b, 0.5); // a is now equal to (1, 3)
	 * @returns this
	 */
	lerpY(v: Vector2, alpha: number) {
		this.y = lerp(this.y, v.y, alpha)
		return this
	}

	/**
	 * Interpolates the vector towards another vector.
	 * @example
	 * const a = new Vector2(1, 2);
	 * const b = new Vector2(3, 4);
	 * a.lerp(b, 0.5); // a is now equal to (2, 3)
	 * @returns this
	 */
	lerp(v: Vector2, alpha: number) {
		this.x = lerp(this.x, v.x, alpha)
		this.y = lerp(this.y, v.y, alpha)
		return this
	}

	/**
	 * Adds two vectors.
	 * @returns The added vector.
	 */
	static add(a: Vector2, b: Vector2) {
		return a.clone().add(b)
	}

	/**
	 * Subtracts two vectors.
	 * @returns The subtracted vector.
	 */
	static sub(a: Vector2, b: Vector2) {
		return a.clone().sub(b)
	}

	/**
	 * Multiplies two vectors.
	 * @returns The multiplied vector.
	 */
	static mult(a: Vector2, b: Vector2) {
		return a.clone().mult(b)
	}
	/**
	 * Divides two vectors.
	 * @returns The divided vector.
	 */
	static div(a: Vector2, b: Vector2) {
		return a.clone().div(b)
	}

	/**
	 * Checks if two vectors are equal.
	 * @returns Whether the two vectors are equal.
	 */
	static equals(a: Vector2, b: Vector2) {
		return a.equals(b)
	}

	/**
	 * Inverts the vector.
	 * @returns The inverted vector.
	 */
	static invert(v: Vector2) {
		return v.clone().invert()
	}

	/**
	 * Returns the dot product of two vectors.
	 * @returns The dot product of the two vectors.
	 */
	static dot(a: Vector2, b: Vector2) {
		return a.dot(b)
	}

	/**
	 * Calculates the cross product of two vectors.
	 * @returns The cross product of the two vectors.
	 */
	static cross(a: Vector2, b: Vector2) {
		return a.cross(b)
	}

	/**
	 * Normalizes the vector.
	 * @returns The normalized vector.
	 */
	static normalize(v: Vector2) {
		return v.clone().normalize()
	}

	/**
	 * Calculates the distance between two vectors.
	 * @returns A vector with the distance between the two vectors.
	 */
	static distBetween(a: Vector2, b: Vector2) {
		return a.distTo(b)
	}

	/**
	 * Calculates the angle in radians between two vectors.
	 * @returns The angle in radians.
	 */
	static angleBetween(a: Vector2, b: Vector2) {
		return a.angleTo(b)
	}

	/**
	 * Interpolates the vector towards another vector.
	 * @returns The interpolated vector.
	 */
	static lerp(a: Vector2, b: Vector2, alpha: number) {
		return a.clone().lerp(b, alpha)
	}

	*[Symbol.iterator]() {
		yield this.x
		yield this.y
	}
}

export default Vector2
export { Vector2 }
