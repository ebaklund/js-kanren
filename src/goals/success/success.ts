
import { Subst, Stream } from '../../internal';

export function $u (): (s: Subst) => Stream {
  return (s: Subst) => new Stream().push(s);
}
