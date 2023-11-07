import BigNumber from "bignumber.js";

export function add(a: number, b: number): number {
  const result = new BigNumber(a).plus(b);
  return result.toNumber();
}

export function subtract(a: number, b: number): number {
  const result = new BigNumber(a).minus(b);
  return result.toNumber();
}

export function multiply(a: number, b: number): number {
  const result = new BigNumber(a).times(b);
  return result.toNumber();
}

export function divide(a: number, b: number): number {
  const result = new BigNumber(a).div(b);
  return result.toNumber();
}
