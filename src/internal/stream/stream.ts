
import { Subst } from '../subst';
import { isArray } from '../unknown';
import { Suspension, isSuspension } from '../suspension';

type _Stream = Suspension | (Subst | Suspension)[];

function _append($1: _Stream, $2: _Stream): _Stream {
  if (isSuspension($1))
    return new Suspension(() => _append($2, ($1 as Suspension).eval()));

  $1 = $1 as (Subst | Suspension)[];

  if (isSuspension($2))
    return $1.concat([$2 as Suspension]);

  $2 = $2 as (Subst | Suspension)[];

  return $1.concat($2);
}

export class Stream {
  private _s: _Stream;

  constructor (s: _Stream) {
    this._s = s;
  }

  isEmpty (): boolean {
    if (isArray(this._s))
      return (this._s as unknown[]).length === 0;
    else
      return false;
  }

  static append($1: Stream, $2: Stream): Stream {
    return new Stream(_append($1._s, $2._s))
  }
}

export function isStream (u: unknown): boolean {
  return u instanceof Stream;
}
