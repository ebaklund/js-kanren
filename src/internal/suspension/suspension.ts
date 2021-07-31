import { Subst } from '../subst';

//export type Suspension = () => Suspension | (Subst | Suspension)[];

export class Suspension {
  private _f: () => Suspension | (Subst | Suspension)[];

  constructor (f: () => Suspension | (Subst | Suspension)[]) {
    this._f = f;
  }

  eval (): Suspension | (Subst | Suspension)[] {
    return this._f();
  }
}

export function isSuspension(u: unknown): boolean {
  return u instanceof Suspension;
}