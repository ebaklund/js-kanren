
import { Goal } from '../goal';
import { Stream, Subst } from '../../internal';

export const $s = new Goal((s: Subst) => new Stream([s]));
