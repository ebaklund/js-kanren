
export class Var {
  // priv
  private _idx: number;

  // pub
  constructor (idx: number) {
    this._idx = idx;
  }

  get idx (): number {
    return this._idx;
  }
}

export function isVar(u: unknown): boolean {
  return u instanceof Var;
}
