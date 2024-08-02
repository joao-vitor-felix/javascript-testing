/// <reference types="vitest/globals" />

import { canDrive, getCoupons, isValidUsername, validateUserInput } from "../src/core"

describe('getCoupons', () => {
  it('should be a not empty array', () => {
    const coupons = getCoupons()
    expect(Array.isArray(coupons)).toBe(true)
    expect(coupons.length).toBeGreaterThan(0)
  })

  it('should return a code as a string', () => {
    const coupons = getCoupons()
    coupons.forEach((coupon) => {
      expect(typeof coupon.code).toBe('string')
      expect(coupon.code).toBeTruthy()
    })
  })

  it('should have discount property as a number between 0 and 1', () => {
    const coupons = getCoupons()
    coupons.forEach((coupon) => {
      expect(typeof coupon.discount).toBe('number')
      expect(coupon.discount).lessThanOrEqual(1)
      expect(coupon.discount).greaterThanOrEqual(0)
    })
  })
})

describe('validateUserInput', () => {
  it('should return an error if username is not a string', () => {
    const result = validateUserInput(10, 20)
    expect(result).toMatch(/invalid/i)
  })

  it('should return an error if username is less than 3 characters', () => {
    const result = validateUserInput('kk', 20)
    expect(result).toMatch(/invalid/i)
  })

  it('should return an error if username is more than 25 characters', () => {
    const result = validateUserInput('kk'.repeat(26), 20)
    expect(result).toMatch(/invalid/i)
  })

  it('should return an error if age is not a number', () => {
    const result = validateUserInput('caio', '19')
    expect(result).toMatch(/invalid/i)
  })
  
  it('should return an error if age is lower than 18', () => {
    const result = validateUserInput('caio', 17)
    expect(result).toMatch(/invalid/i)
  })

  it('should return an error if age is higher than 75', () => {
    const result = validateUserInput('caio', 76)
    expect(result).toMatch(/invalid/i)
  })

  it('should return an error if both parameters are invalid', () => {
    const result = validateUserInput('', 0)
    expect(result).toMatch(/invalid username/i)
    expect(result).toMatch(/invalid age/i)
  })

  it('should return a success message if all parameters are correct', () => {
    const result = validateUserInput('caio', 20)
    expect(result).toMatch(/success/i)
  })
})

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;
  
  it('should return false if username is not on min length range', () => {
   const result = isValidUsername('a'.repeat(minLength - 1))
   expect(result).toBe(false)
  })

  it('should return false if username is not on max length range', () => {
   const result = isValidUsername('a'.repeat(maxLength + 1))
   expect(result).toBe(false)
  })
  
  it('should return true if username is on min and max length range', () => {
   expect(isValidUsername('a'.repeat(minLength))).toBe(true)
   expect(isValidUsername('a'.repeat(maxLength))).toBe(true)
  })

  it('should return true if username is on min and max length range constraint', () => {
   expect(isValidUsername('a'.repeat(minLength + 1))).toBe(true)
   expect(isValidUsername('a'.repeat(maxLength - 1))).toBe(true)
  })

  it('should return false if username is null or undefined', () => {
   expect(isValidUsername(null)).toBe(false)
   expect(isValidUsername()).toBe(false)
   expect(isValidUsername(1)).toBe(false)
  })
})

describe('canDrive', () => {
  it('should return an error if country code is invalid', () => {
    expect(canDrive(20, 'BR')).toMatch(/invalid/i)
  })

  it.each([
    {age: 15, countryCode: 'US', result: false},
    {age: 16, countryCode: 'US', result: true},
    {age: 20, countryCode: 'US', result: true},
  ])('should return $result for age $age and country code $countryCode', ({age, countryCode, result}) => {
    expect(canDrive(age, countryCode)).toBe(result)
  })
})