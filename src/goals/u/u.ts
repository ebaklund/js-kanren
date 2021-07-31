
import { Goal } from '../goal';
import { Stream, Subst } from '../../internal';

export const $u = new Goal((s: Subst) => new Stream([]));
