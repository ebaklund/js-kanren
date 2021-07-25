
//import { Subst } from '..';

export class Stream {
  private _arr: unknown[];

  constructor () {
    this._arr = [];
  }

  push (u: unknown): Stream {
    this._arr.push(u);
    return this;
  }

  isEmpty (): boolean {
    return this._arr.length === 0;
  }
}

export function isStream (u: unknown): boolean {
  return u instanceof Stream;
}
