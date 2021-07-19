
export class Var extends Number {
  constructor (idx: number = -1) {
    super(idx);
  }
}

export function getIdx(v: Var) : number {
  if (v.valueOf() <= -1)
    throw new Error('Cannot get index of fresh variable.');

  return v.valueOf();
}

export function isFresh(v: Var) : boolean {
  return v.valueOf() <= -1;
}

export function isVar(v: unknown): boolean {
  return v instanceof Var;
}
