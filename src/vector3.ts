import { clamp, lerp, randomInRange } from './utils'

export type Vector3Tuple = [number, number, number]

/**
 * Represents a 3D vector with x, y and z components.
 */
class Vector3 {
	/**
	 * Creates a new Vector3 with optional initial values for x, y and z.
	 */
	constructor(
		public x = 0,
		public y = 0,
		public z = 0
	) {}

	/**
	 * Sets the x and y components of the vector.
	 * @example
	 * const v = new Vector3();
	 * v.set(new Vector3(1, 2, 3)); // sets x = 1, y = 2 and z = 3
	 * v.set([1, 2, 3]); // sets x = 1, y = 2 and z = 3
	 * v.set(1, 2, 3); // sets x = 1, y = 2 and z = 3
	 * v.set(1) // same as v.set(1, 1, 1)
	 * @returns this
	 */
	set(x: Vector3 | Vector3Tuple | number, y?: number, z?: number) {
		if (x instanceof Vector3) {
			this.x = x.x
			this.y = x.y
			this.z = x.z
		} else if (Array.isArray(x)) {
			this.x = x[0]
			this.y = x[1]
			this.z = x[2]
		} else {
			this.x = x
			this.y = y || x
			this.z = z || x
		}

		return this
	}

	/**
	 * Sets the x component of the vector.
	 * @example
	 * const v = new Vector3();
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
	 * const v = new Vector3();
	 * v.setY(1); // sets y = 1
	 * @returns this
	 */
	setY(y: number) {
		this.y = y
		return this
	}

	/**
	 * Sets the z component of the vector.
	 * @example
	 * const v = new Vector3();
	 * v.setZ(1); // sets z = 1
	 * @returns this
	 */
	setZ(z: number) {
		this.z = z
		return this
	}

	/**
	 * Returns a new Vector3 with the same x, y and z components.
	 * @example
	 * const v1 = new Vector3(1, 2);
	 * const v2 = v.clone(); // same as v1
	 * @returns A new Vector3 with the same x, y and z components.
	 */
	clone() {
		return new Vector3(this.x, this.y, this.z)
	}

	/**
	 * Returns an array with the x, y and z components of the vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.toArray(); // returns [1, 2, 3]
	 * @returns An array with the x, y and z components of the vector.
	 */
	toArray(): Vector3Tuple {
		return [this.x, this.y, this.z]
	}

	/**
	 * Returns a string representation of the vector.
	 * @example
	 * const v = new Vector3(1, 2);
	 * v.toString(); // returns 'x: 1, y: 2'
	 * @returns A string representation of the vector.
	 */
	toString() {
		return `x: ${this.x}, y: ${this.y}, z: ${this.z}`
	}

	/**
	 * Adds to the current vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.add(new Vector3(1, 2, 3)) // a is now equal to (2, 4, 6)
	 * v.add([1, 2, 3]) // a is now equal to (3, 6, 9)
	 * v.add(1, 2, 3) // a is now equal to (4, 8, 12)
	 * v.add(1) // same as v.add(1, 1, 1)
	 * @returns this
	 */
	add(x: Vector3 | Vector3Tuple | number, y?: number, z?: number) {
		if (x instanceof Vector3) {
			this.x += x.x
			this.y += x.y
			this.z += x.z
		} else if (Array.isArray(x)) {
			this.x += x[0]
			this.y += x[1]
			this.z += x[2]
		} else {
			this.x += x
			this.y += y || x
			this.z += z || x
		}

		return this
	}

	/**
	 * Subtracts from the current vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.sub(new Vector3(1, 2, 3)) // a is now equal to (0, 0, 0)
	 * v.sub([1, 2, 3]) // a is now equal to (-1, -2, -3)
	 * v.sub(1, 2, 3) // a is now equal to (-2, -4, -6)
	 * v.sub(1) // same as v.sub(1, 1, 1)
	 * @returns this
	 */
	sub(x: Vector3 | Vector3Tuple | number, y?: number, z?: number) {
		if (x instanceof Vector3) {
			this.x -= x.x
			this.y -= x.y
			this.z -= x.z
		} else if (Array.isArray(x)) {
			this.x -= x[0]
			this.y -= x[1]
			this.z -= x[2]
		} else {
			this.x -= x
			this.y -= y || x
			this.z -= z || x
		}

		return this
	}

	/**
	 * Multiplies with the current vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.mult(new Vector3(1, 2, 3)) // a is now equal to (1, 4, 9)
	 * v.mult([1, 2, 3]) // a is now equal to (1, 8, 27)
	 * v.mult(1, 2, 3) // a is now equal to (1, 16, 81)
	 * v.mult(1) // same as v.mult(1, 1, 1)
	 * @returns this
	 */
	mult(x: Vector3 | Vector3Tuple | number, y?: number, z?: number) {
		if (x instanceof Vector3) {
			this.x *= x.x
			this.y *= x.y
			this.z *= x.z
		} else if (Array.isArray(x)) {
			this.x *= x[0]
			this.y *= x[1]
			this.z *= x[2]
		} else {
			this.x *= x
			this.y *= y || x
			this.z *= z || x
		}

		return this
	}

	/**
	 * Divides with the current vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.div(new Vector3(1, 2, 3)) // a is now equal to (1, 1, 1)
	 * v.div([1, 2, 3]) // a is now equal to (1, 0.5, 0.333)
	 * v.div(1, 2, 3) // a is now equal to (1, 0.25, 0.111)
	 * v.div(1) // same as v.div(1, 1, 1)
	 * @returns this
	 */
	div(x: Vector3 | Vector3Tuple | number, y?: number, z?: number) {
		if (x instanceof Vector3) {
			this.x /= x.x
			this.y /= x.y
			this.z /= x.z
		} else if (Array.isArray(x)) {
			this.x /= x[0]
			this.y /= x[1]
			this.z /= x[2]
		} else {
			this.x /= x
			this.y /= y || x
			this.z /= z || x
		}

		return this
	}

	/**
	 * Inverts the x, y and z components of the vector.
	 * @example
	 * const v = new Vector3(1, 2);
	 * v.invert(); // v is now equal to (-1, -2)
	 * @returns this
	 */
	invert() {
		this.x *= -1
		this.y *= -1
		this.z *= -1
		return this
	}

	/**
	 * Normalizes the vector.
	 * @example
	 * const v = new Vector3(1, 2);
	 * v.normalize(); // v is now equal to (0.447, 0.894)
	 * @returns this
	 */
	normalize() {
		return this.div(this.length() || 1)
	}

	/**
	 * Randomizes the vector.
	 * @example
	 * const v = new Vector3();
	 * v.randomize(); // v is anything between (0, 0, 0) and (1, 1, 1)
	 * v.randomize(new Vector3(1, 2, 3), new Vector3(4, 5, 6)); // v is anything between (1, 2, 3) and (4, 5, 6)
	 * @returns this
	 */
	randomize(min?: Vector3, max?: Vector3) {
		min = min || new Vector3(0, 0, 0)
		max = max || new Vector3(1, 1, 1)
		this.x = randomInRange(min.x, max.x)
		this.y = randomInRange(min.y, max.y)
		this.z = randomInRange(min.z, max.z)
		return this
	}

	/**
	 * Clamps the vector between two vectors.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.clamp(new Vector3(2, 2, 2), new Vector3(3, 3, 3)); // v is now equal to (2, 2, 3)
	 * @returns this
	 */
	clamp(min: Vector3 | number, max: Vector3 | number) {
		if (typeof min === 'number') min = new Vector3().set(min)
		if (typeof max === 'number') max = new Vector3().set(max)
		this.x = clamp(this.x, min.x, max.x)
		this.y = clamp(this.y, min.y, max.y)
		this.z = clamp(this.z, min.z, max.z)
		return this
	}

	/**
	 * Limits the vector to a maximum length.
	 * @example
	 * const v = new Vector2(1, 2, 3)
	 * v.limit(2); // sets the length of v to a maximum of 2
	 * @returns this
	 */
	limit(max: number) {
		if (this.lengthSq() > max * max) this.setLength(max)
		return this
	}

	/**
	 * Rounds the vector to the nearest integer.
	 * @example
	 * const v = new Vector3(1.2, 2.8, 3.5);
	 * v.round(); // v is now equal to (1, 3, 4)
	 * @returns this
	 */
	round() {
		this.x = Math.round(this.x)
		this.y = Math.round(this.y)
		this.z = Math.round(this.z)
		return this
	}

	/**
	 * Rounds the vector to the nearest integer towards zero.
	 * @example
	 * const v = new Vector3(1.2, 2.8, 3.5);
	 * v.roundToZero(); // v is now equal to (1, 2, 3)
	 * @returns this
	 */
	roundToZero() {
		this.x = Math.trunc(this.x)
		this.y = Math.trunc(this.y)
		this.z = Math.trunc(this.z)
		return this
	}

	/**
	 * Checks if the vector is equal to another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(1, 2, 3);
	 * a.equals(b); // returns true
	 * @returns Whether the vector is equal to another vector.
	 */
	equals(v: Vector3) {
		return this.x === v.x && this.y === v.y && this.z === v.z
	}

	/**
	 * Returns the minimum components of the vector and another vector.
	 * @example
	 * const a = new Vector3(-2, 0, 3);
	 * const b = new Vector3(5, -1, 2);
	 * a.min(b); // returns (-2, -1, 2)
	 * @returns minimum vector
	 */
	min(v: Vector3) {
		return new Vector3(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z))
	}

	/**
	 * Returns the maximum components of the vector and another vector.
	 * @example
	 * const a = new Vector3(-2, 0, 3);
	 * const b = new Vector3(5, -1, 2);
	 * a.max(b); // returns (5, 0, 3)
	 * @returns maximum vector
	 */
	max(v: Vector3) {
		return new Vector3(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z))
	}

	/**
	 * Computes the dot product of the vector with another vector.
	 * @example
	 * const a = new Vector3(1, 2);
	 * const b = new Vector3(3, 4);
	 * a.dot(b); // returns 11
	 * @returns dot product
	 */
	dot(v: Vector3) {
		return this.x * v.x + this.y * v.y + this.z * v.z
	}

	/**
	 * Computes the cross product of the vector with another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.cross(b); // returns (-2, 4, -2)
	 * @returns cross product vector
	 */
	cross(v: Vector3) {
		return new Vector3(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x
		)
	}

	/**
	 * Computes the length of the vector squared.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.lengthSq(); // returns 14
	 * @returns squared length
	 */
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	/**
	 * Computes the length of the vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.length(); // returns 3.741
	 * @returns length of the vector
	 */
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	}

	/**
	 * Computes the Manhattan length of the vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.manhattanLength(); // returns 6
	 * @returns manhattan length of the vector
	 */
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
	}

	/**
	 * Sets the length of the vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.setLength(2); // sets the length of v to 2
	 * @returns this
	 */
	setLength(length: number) {
		return this.normalize().mult(length)
	}

	/**
	 * Returns the X distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.xDistTo(b); // returns -2
	 * @returns distance between x components
	 */
	xDistTo(v: Vector3) {
		return this.x - v.x
	}

	/**
	 * Returns the Y distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.yDistTo(b); // returns -2
	 * @returns distance between y components
	 */
	yDistTo(v: Vector3) {
		return this.y - v.y
	}

	/**
	 * Returns the Z distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.zDistTo(b); // returns -2
	 * @returns distance between z components
	 */
	zDistTo(v: Vector3) {
		return this.z - v.z
	}

	/**
	 * Returns the XY distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.xyDistTo(b); // returns 2.828
	 * @returns distance between xy components
	 */
	xyDistTo(v: Vector3) {
		const dx = this.x - v.x
		const dy = this.y - v.y
		return Math.sqrt(dx * dx + dy * dy)
	}

	/**
	 * Returns the YZ distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.yzDistTo(b); // returns 2.828
	 * @returns distance between yz components
	 */
	yzDistTo(v: Vector3) {
		const dy = this.y - v.y
		const dz = this.z - v.z
		return Math.sqrt(dy * dy + dz * dz)
	}

	/**
	 * Returns the XZ distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.xzDistTo(b); // returns 2.828
	 * @returns distance between xz components
	 */
	xzDistTo(v: Vector3) {
		const dx = this.x - v.x
		const dz = this.z - v.z
		return Math.sqrt(dx * dx + dz * dz)
	}

	/**
	 * Returns the squared distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.distToSqrd(b); // returns 12
	 * @returns distance squared between vectors
	 */
	distToSqrd(v: Vector3) {
		const dx = this.x - v.x
		const dy = this.y - v.y
		const dz = this.z - v.z
		return dx * dx + dy * dy + dz * dz
	}

	/**
	 * Returns the distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.distTo(b); // returns 3.464
	 * @returns distance between vectors
	 */
	distTo(v: Vector3) {
		return Math.sqrt(this.distToSqrd(v))
	}

	/**
	 * Returns the Manhattan distance between current vector and another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.manhattanDist(b); // returns 6
	 * @returns manhattan distance between vectors
	 */
	manhattanDistTo(v: Vector3) {
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z)
	}

	// TODO: FIX THIS
	/**
	 * Returns the angle in radians with respect to the positive x-axis.
	 * @example
	 * const v = new Vector3(1, 2);
	 * v.horizontalAngle(); // returns 1.107
	 * @returns the calculated angle in radians
	 */
	hAngle() {
		return Math.atan2(this.y, this.x)
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
	 * const a = new Vector3(1, 2);
	 * const b = new Vector3(3, 4);
	 * a.angleTo(b); // returns 0.179
	 * @returns the calculated angle in radians
	 */
	angleTo(v: Vector3) {
		const lenSq = this.lengthSq() * v.lengthSq()

		if (lenSq === 0) return NaN

		const u = this.cross(v)
		const angle = Math.atan2(u.length(), this.dot(v)) * Math.sign(u.z || 1)
		return angle
	}

	/**
	 * Interpolates x component of the vector towards another vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.lerpX(3, 0.5); // v is now equal to (2, 2, 3)
	 * @returns this
	 */
	lerpX(v: Vector3, alpha: number) {
		this.x = lerp(this.x, v.x, alpha)
		return this
	}

	/**
	 * Interpolates y component of the vector towards another vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.lerpY(3, 0.5); // v is now equal to (1, 2.5, 3)
	 * @returns this
	 */
	lerpY(v: Vector3, alpha: number) {
		this.y = lerp(this.y, v.y, alpha)
		return this
	}

	/**
	 * Interpolates z component of the vector towards another vector.
	 * @example
	 * const v = new Vector3(1, 2, 3);
	 * v.lerpZ(4, 0.5); // v is now equal to (1, 2, 3.5)
	 * @returns this
	 */
	lerpZ(v: Vector3, alpha: number) {
		this.z = lerp(this.z, v.z, alpha)
		return this
	}

	/**
	 * Interpolates the vector towards another vector.
	 * @example
	 * const a = new Vector3(1, 2, 3);
	 * const b = new Vector3(3, 4, 5);
	 * a.lerp(b, 0.5); // a is now equal to (2, 3, 4)
	 * @returns this
	 */
	lerp(v: Vector3, alpha: number) {
		this.x = lerp(this.x, v.x, alpha)
		this.y = lerp(this.y, v.y, alpha)
		this.z = lerp(this.z, v.z, alpha)
		return this
	}

	toAngles() {
		return {
			theta: Math.atan2(this.y, this.x),
			phi: Math.asin(this.y / this.length())
		}
	}

	/**
	 * Adds two vectors.
	 * @returns The added vector.
	 */
	static add(a: Vector3, b: Vector3) {
		return a.clone().add(b)
	}

	/**
	 * Subtracts two vectors.
	 * @returns The subtracted vector.
	 */
	static sub(a: Vector3, b: Vector3) {
		return a.clone().sub(b)
	}

	/**
	 * Multiplies two vectors.
	 * @returns The multiplied vector.
	 */
	static mult(a: Vector3, b: Vector3) {
		return a.clone().mult(b)
	}
	/**
	 * Divides two vectors.
	 * @returns The divided vector.
	 */
	static div(a: Vector3, b: Vector3) {
		return a.clone().div(b)
	}

	/**
	 * Checks if two vectors are equal.
	 * @returns Whether the two vectors are equal.
	 */
	static equals(a: Vector3, b: Vector3) {
		return a.equals(b)
	}

	/**
	 * Inverts the vector.
	 * @returns The inverted vector.
	 */
	static invert(v: Vector3) {
		return v.clone().invert()
	}

	/**
	 * Calculates the length of a vector.
	 * @returns The length of the vector.
	 */
	static length(v: Vector3) {
		return v.length()
	}

	/**
	 * Returns the dot product of two vectors.
	 * @returns The dot product of the two vectors.
	 */
	static dot(a: Vector3, b: Vector3) {
		return a.dot(b)
	}

	/**
	 * Calculates the cross product of two vectors.
	 * @returns The cross product of the two vectors.
	 */
	static cross(a: Vector3, b: Vector3) {
		return a.cross(b)
	}

	/**
	 * Normalizes the vector.
	 * @returns The normalized vector.
	 */
	static normalize(v: Vector3) {
		return v.clone().normalize()
	}

	/**
	 * Calculates the distance between two vectors.
	 * @returns A vector with the distance between the two vectors.
	 */
	static distBetween(a: Vector3, b: Vector3) {
		return a.distTo(b)
	}

	/**
	 * Calculates the angle in radians between two vectors.
	 * @returns The angle in radians.
	 */
	static angleBetween(a: Vector3, b: Vector3) {
		return a.angleTo(b)
	}

	/**
	 * Interpolates the vector towards another vector.
	 * @returns The interpolated vector.
	 */
	static lerp(a: Vector3, b: Vector3, alpha: number) {
		return a.clone().lerp(b, alpha)
	}

	static fromAngles(theta: number, phi: number) {
		return new Vector3(
			Math.cos(theta) * Math.cos(phi),
			Math.sin(phi),
			Math.sin(theta) * Math.cos(phi)
		)
	}

	static randomDirection() {
		return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1))
	}

	*[Symbol.iterator]() {
		yield this.x
		yield this.y
		yield this.z
	}
}

export default Vector3
export { Vector3 as Vector3 }

