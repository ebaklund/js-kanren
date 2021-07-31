import { Subst } from '../../internal/subst';
import { Stream, $append } from '../../internal/stream';

export class Goal {
  private _g: (s: Subst) => Stream;

  constructor (g: (s: Subst) => Stream) {
    this._g = g;
  }

  eval (s: Subst): Stream {
    return this._g(s);
  }

  static disj(g1: Goal, g2: Goal): Goal {
    return new Goal((s: Subst) => {
      return Stream.append(g1.eval(s), g2.eval(s));
    });
  }
}

export function isGoal(u: unknown): boolean {
  return u instanceof Goal;
}
