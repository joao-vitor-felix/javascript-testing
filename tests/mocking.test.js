/// <reference types="vitest/globals" />

import {getShippingQuote} from '../src/libs/shipping'

import { vi } from "vitest"
import { getShippingInfo, submitOrder } from '../src/mocking';
import { charge } from '../src/libs/payment';

vi.mock('../src/libs/shipping');
vi.mock('../src/libs/payment');

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

describe('submitOrder', () => {
  const order = { totalAmount: 100 }
  const creditCard = { creditCardNumber: 5009 }
  
  it('should call charge with correct arguments', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });
    await submitOrder(order, creditCard);
    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount)
  })

  it('should receive status as true from submitOrder', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });
    const result = await submitOrder(order, creditCard);
    expect(result.success).toBe(true)
  })

  it('should receive status as false from submitOrder', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });
    const result = await submitOrder(order, creditCard);
    expect(result.success).toBe(false)
    expect(result.error).match(/error/i)
  })
})