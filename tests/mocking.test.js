/// <reference types="vitest/globals" />

import {getShippingQuote} from '../src/libs/shipping'

import { vi } from "vitest"
import { getShippingInfo } from '../src/mocking';

vi.mock('../src/libs/shipping');

describe('sendText', () => {
  it('sendText', () => {
    const sendText = vi.fn().mockReturnValue('ok')
    const result = sendText()
    expect(sendText).toHaveBeenCalled()
    expect(result).toBe('ok')
  })
})

describe('getShippingInfo', () => {
it('should return unavailable message when fetching failed', () => {
  vi.mocked(getShippingQuote).mockReturnValue('');

  const result = getShippingInfo('US');
  expect(result).toMatch(/unavailable/i)
})

it('should return unavailable message when fetching failed', () => {
  vi.mocked(getShippingQuote).mockReturnValue({
    cost: 300,
    estimatedDays: 5
  });

  const result = getShippingInfo('US');
  // expect(result).toMatch('$300')
  // expect(result).toMatch(/5 days/i)
  expect(result).toMatch(/shipping cost: \$300 \(5 days\)/i)
})
})