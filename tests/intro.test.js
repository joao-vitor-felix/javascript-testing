import { fizzBuzz, max } from "../src/intro"
import { expect } from "vitest"

describe('max', () => {
  it('should return a when higher than b', () => {
    const a = 4
    const b = 2
    const result = max(a, b)
    expect(result).toBe(a)
  })

  it('should return b when higher than a', () => {
    const a = 4
    const b = 10
    const result = max(a, b)
    expect(result).toBe(b)
  })

  it('should return a when both arguments are the same', () => {
    const a = 4
    const result = max(a, a)
    expect(result).toBe(a)
  })
})

describe('fizzBuzz', () => {
  it('should return the string FizzBuzz when is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz')
  })

  it('should return the string Fizz when is divisible by 3', () => {
    expect(fizzBuzz(9)).toBe('Fizz')
  })

  it('should return the string Buzz when is divisible by  5', () => {
    expect(fizzBuzz(10)).toBe('Buzz')
  })
  
  it('should return the string number as string when is not divisible by 3 and 5', () => {
    expect(fizzBuzz(2)).toBe('2')
  })
})