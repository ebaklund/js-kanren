
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import * as mk from '..';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('mk-subs', () => {
  given ('a substitution', () => {
    let s: mk.Subst;

    beforeEach(() => {
      s = new mk.Subst();
    });

    when ('checking fresh', () => {
      it ('returns true if fresh', () => {
        const v: mk.Var = s.getFresh();
        expect(s.isFresh(v)).to.be.true;
      });

      it ('returns false if not fresh', () => {
        const v: mk.Var = s.getFresh();
        expect(s.ext(v, 22)).to.be.true;
        expect(s.isFresh(v)).to.be.false;
      });
    });

    when ('checking occurs', () => {
      it ('returns true if variable occurs', () => {
        const v1: mk.Var = s.getFresh();
        const v2: mk.Var = s.getFresh();
        s.ext(v2, v1);

        expect(s.occurs(v1, v1)).to.equal(true);
        expect(s.occurs(v1, v2)).to.equal(true);

        expect(s.occurs(v1, [v1])).to.equal(true);
        expect(s.occurs(v1, [v2])).to.equal(true);

        expect(s.occurs(v1, [33, v1, 22])).to.equal(true);
        expect(s.occurs(v1, [33, v2, 22])).to.equal(true);
      });

      it ('returns false if variable not occurs', () => {
        const v1: mk.Var = s.getFresh();
        const v2: mk.Var = s.getFresh();

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
        const v1: mk.Var = s.getFresh();
        const v2: mk.Var = s.getFresh();
        s.ext(v2, v1);

        expect(s.ext(v1, v1)).to.equal(false);
        expect(s.ext(v1, v2)).to.equal(false);

        expect(s.ext(v1, [v1])).to.equal(false);
        expect(s.ext(v1, [v2])).to.equal(false);

        expect(s.ext(v1, [33, v1, 22])).to.equal(false);
        expect(s.ext(v1, [33, v2, 22])).to.equal(false);
      });

      it ('succeeds if variable occurs', () => {
        const v1: mk.Var = s.getFresh();
        const v2: mk.Var = s.getFresh();

        expect(s.ext(v1, 33)).to.equal(true);
        expect(s.ext(v1, v2)).to.equal(true);

        expect(s.ext(v1, [33])).to.equal(true);
        expect(s.ext(v1, [v2])).to.equal(true);

        expect(s.ext(v1, [33, 11, 22])).to.equal(true);
        expect(s.ext(v1, [33, v2, 22])).to.equal(true);
      });
    });
  });
});