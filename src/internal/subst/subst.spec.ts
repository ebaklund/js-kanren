
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { Subst, Var } from '..';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('substitution', () => {
  given ('a substitution', () => {
    let s: Subst;

    beforeEach(() => {
      s = new Subst();
    });

    when ('checking fresh', () => {
      it ('returns true if fresh', () => {
        const v: Var = s.getFresh();
        expect(s.isFresh(v)).to.be.true;
      });

      it ('returns false if not fresh', () => {
        const v: Var = s.getFresh();
        expect(s.ext(v, 22)).to.be.true;
        expect(s.isFresh(v)).to.be.false;
      });
    });

    when ('checking occurs', () => {
      it ('returns true if variable occurs', () => {
        const v1: Var = s.getFresh();
        const v2: Var = s.getFresh();
        s.ext(v2, v1);

        expect(s.occurs(v1, v1)).to.equal(true);
        expect(s.occurs(v1, v2)).to.equal(true);

        expect(s.occurs(v1, [v1])).to.equal(true);
        expect(s.occurs(v1, [v2])).to.equal(true);

        expect(s.occurs(v1, [33, v1, 22])).to.equal(true);
        expect(s.occurs(v1, [33, v2, 22])).to.equal(true);
      });

      it ('returns false if variable not occurs', () => {
        const v1: Var = s.getFresh();
        const v2: Var = s.getFresh();

        expect(s.occurs(v1, 33)).to.equal(false);
        expect(s.occurs(v1, v2)).to.equal(false);

        expect(s.occurs(v1, [33])).to.equal(false);
        expect(s.occurs(v1, [v2])).to.equal(false);

        expect(s.occurs(v1, [33, 11, 22])).to.equal(false);
        expect(s.occurs(v1, [33, v2, 22])).to.equal(false);
      });
    });

    when ('extending substitution', () => {
      it ('fails if variable occurs', () => {
        const v1: Var = s.getFresh();
        const v2: Var = s.getFresh();
        s.ext(v2, v1);

        expect(s.ext(v1, v1)).to.equal(false);
        expect(s.ext(v1, v2)).to.equal(false);

        expect(s.ext(v1, [v1])).to.equal(false);
        expect(s.ext(v1, [v2])).to.equal(false);

        expect(s.ext(v1, [33, v1, 22])).to.equal(false);
        expect(s.ext(v1, [33, v2, 22])).to.equal(false);
      });

      it ('succeeds if variable occurs', () => {
        const v1: Var = s.getFresh();
        const v2: Var = s.getFresh();

        expect(s.ext(v1, 33)).to.equal(true);
        expect(s.ext(v1, v2)).to.equal(true);

        expect(s.ext(v1, [33])).to.equal(true);
        expect(s.ext(v1, [v2])).to.equal(true);

        expect(s.ext(v1, [33, 11, 22])).to.equal(true);
        expect(s.ext(v1, [33, v2, 22])).to.equal(true);
      });
    });

    when ('doing a unification', () => {
      it ('returns true if values are equal', () => {
        const v = s.getFresh();
        expect(s.unify(1, 1)).to.equal(true);
        expect(s.unify(v, v)).to.equal(true);
      });

      it ('returns true if value 1 is none-occurring variable', () => {
        {
          const v1 = s.getFresh();
          expect(s.unify(v1, 1)).to.equal(true);
        }
        {
          const v1 = s.getFresh();
          const v2 = s.getFresh();
          expect(s.unify(v1, v2)).to.equal(true);
        }
        {
          const v1 = s.getFresh();
          const v2 = s.getFresh();
          expect(s.unify(v1, [v2])).to.equal(true);
        }
      });

      it ('returns false if value 1 is occurring variable', () => {
        const v1 = s.getFresh();
        expect(s.unify(v1, [v1])).to.equal(false);
      });

      it ('returns true if value 2 is none-occurring variable', () => {
        {
          const v2 = s.getFresh();
          expect(s.unify(1, v2)).to.equal(true);
        }
        {
          const v1 = s.getFresh();
          const v2 = s.getFresh();
          expect(s.unify(v1, v2)).to.equal(true);
        }
        {
          const v1 = s.getFresh();
          const v2 = s.getFresh();
          expect(s.unify([v1], v2)).to.equal(true);
        }
      });

      it ('returns false if value 2 is occurring variable', () => {
        const v2 = s.getFresh();
        expect(s.unify([v2], v2)).to.equal(false);
      });

      it ('returns false if value 1 is not an array', () => {
        expect(s.unify(1, [2])).to.equal(false);
      });

      it ('returns false if value 2 is not an array', () => {
        expect(s.unify([1], 2)).to.equal(false);
      });

      it ('returns false if values not same length', () => {
        expect(s.unify([1], [])).to.equal(false);
      });

      it ('returns true if values are same length', () => {
        expect(s.unify([], [])).to.equal(true);
      });

      it ('returns true if arrays have equal elements', () => {
        expect(s.unify([1, 2, 4], [1, 2, 4])).to.equal(true);
      });

      it ('returns false if arrays have differing elements', () => {
        expect(s.unify([1, 2, 4], [1, 2, 5])).to.equal(false);
      });
    });
  });
});