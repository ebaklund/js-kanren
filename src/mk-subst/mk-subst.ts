
import { Var, isVar } from '../mk-var';
import { isArray } from '../mk-unknown';

export class Subst {

  // priv
  private _arr: unknown[];

  // pub

  constructor () {
    this._arr = [];
  }

  getFresh (): Var {
    const v: Var = new Var(this._arr.length);
    this._arr.push(null);

    return v;
  }

  isFresh(v: Var) : boolean {
    return this._arr[v.idx] === null;
  }

  walk (u: unknown): unknown {
    while (isVar(u) && !this.isFresh(u as Var))
      u = this._arr[(u as Var).idx];

    return u;
  }

  occurs (v: Var, u: unknown): boolean {
    u = this.walk(u);

    if (isVar(u))
      return v === u;

    if (isArray(u)) {
      return (u as unknown[]).some(u => this.occurs(v, u));
    }

    return false;
  }

  ext (v: Var, u: unknown): boolean {
    if (this.occurs(v, u))
      return false;

    this._arr[(v as Var).idx] = u;

    return true;
  }
}