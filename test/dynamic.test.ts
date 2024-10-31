import Diamond from '..'

class A extends Diamond() {
	method(x: number) {
		return x + 1
	}
}

class B extends Diamond(A) {
	constructor(...args: any[]) {
		const [myArg, ...rest] = args
		super(...rest)
	}
	method(x: number) {
		return super.method(x + 2)
	}
}

class C extends Diamond(A) {
	method(x: number) {
		return super.method(x + 3)
	}
}

class D extends Diamond(B, C) {
	method(x: number) {
		return super.method(x + 4)
	}
}

test('dynamic diamond', () => {
	const d = new D()
	expect(d.method(0)).toBe(10)
	A.prototype.method = function (x) {
		return x + 5
	}
	expect(d.method(0)).toBe(14)
	B.prototype.method = function (this: B, x) {
		return x + 42
	}
	expect(d.method(0)).toBe(46)
})
