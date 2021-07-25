
import { Var, isVar } from '../var';
import { isArray } from '../unknown';

export class Subst {

  // priv
  private _arr: unknown[];

  // pub

  constructor () {
    this._arr = [];
  }

  isFresh(v: Var) : boolean {
    return this._arr[v.idx] === null;
  }

  getFresh (): Var {
    const v: Var = new Var(this._arr.length);
    this._arr.push(null);

    return v;
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

  unify (u1: unknown, u2: unknown): boolean {
    u1 = this.walk(u1);
    u2 = this.walk(u2);

    if (u1 === u2)
      return true;

    if (isVar(u1))
      return this.ext(u1 as Var, u2);

    if (isVar(u2))
      return this.ext(u2 as Var, u1);

    if (!isArray(u1))
      return false;

    if (!isArray(u2))
      return false;

    const a1 = u1 as unknown[];
    const a2 = u2 as unknown[];

    if (a1.length !== a2.length)
      return false;

    return a1.every((_, i) => this.unify(a1[i], a2[i]));
  }
}