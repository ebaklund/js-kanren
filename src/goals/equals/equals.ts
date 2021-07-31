
import { Subst, Stream } from '../../internal';

export function equals (u1: unknown, u2: unknown): (s: Subst) => Stream {
  return (s: Subst): Stream => {
    if (s.unify(u1, u2))
      return new Stream([s]);
    else
      return new Stream([]);
  };
}