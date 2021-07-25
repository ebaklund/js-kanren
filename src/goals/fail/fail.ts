
import { Subst, Stream } from '../../internal';

export function $f (): (s: Subst) => Stream {
  return (s: Subst) => new Stream();
}