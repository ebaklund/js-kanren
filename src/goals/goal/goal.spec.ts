
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { Stream, isStream, Subst } from '../../internal';
import { Goal, isGoal, disj } from '..';

chai.use(chaiAsPromised);

const { expect } = chai;
const given = describe;
const when = describe;

describe ('Goal', () => {
  given ('a Goal constructor', () => {
    when ('Constructing a goal', () => {
      it ('returns a Goal', () => {
        const g = new Goal((s: Subst) => new Stream([s]));
        expect(!!g).to.be.true;
      });
    });
  });

  given ('a Goal', () => {
    const g = new Goal((s: Subst) => new Stream([s]));

    when ('verifying type', () => {
      it ('returns true if a Goal', () => {
        expect(isGoal(g)).to.be.true;
      });

      it ('returns false if not a Goal', () => {
        expect(isGoal({})).to.be.false;
      });
    });
  });

  given ('two Goals', () => {
    const g1 = new Goal((s: Subst) => new Stream([s]));
    const g2 = new Goal((s: Subst) => new Stream([s]));

    when ('creating disjunction', () => {
      const d = Goal.disj(g1, g2);

      it ('returns a new a Goal', () => {
        expect(isGoal(d)).to.be.true;
      });

      it ('evaluating it returns a Stream', () => {
        expect(isStream(d.eval(new Subst()))).to.be.true;
      });
    });
  });
});