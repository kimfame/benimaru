import * as crypto from 'crypto'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomString(len: number) {
  return crypto.randomBytes(len).toString('hex').substring(0, len)
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomPrice() {
  return (Math.random() * 10000).toFixed(2)
}

export function convertToCurrencyFormat(value: string | number | undefined) {
  if (!value) {
    return '$ 0.00'
  }

  let price = typeof value === 'string' ? Number(value) : value

  return `$ ${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  })}`
}
