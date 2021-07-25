
// Type recognition

export function isString(u: unknown): boolean {
  return Object.prototype.toString.call(u) === '[object String]';
}

export function isNumber(u: unknown): boolean {
  return Object.prototype.toString.call(u) === '[object Number]';
}

export function isFunction(u: unknown): boolean {
  return u instanceof Function;
}

export function isArray(u: unknown): boolean {
  return u instanceof Array;
}

export function isObject(u: unknown): boolean {
  return Object.prototype.toString.call(u) === '[object Object]';
}

export function isNull(u: unknown): boolean {
  return u === null;
}

export function isUndefined(u: unknown): boolean {
  return u === undefined;
}
