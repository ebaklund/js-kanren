
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { Var, getIdx, isFresh, isVar } from '.';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('mk-var', () => {
  given('a Var constructor', () => {
    when ('constructing an new Var', () => {
      it ('has value when constructed with input value', () => {
        expect((new Var(33)).valueOf()).to.equal(33);
      });

      it ('has default value when constructed without input value', () => {
        expect((new Var()).valueOf()).to.equal(-1);
      });

      it ('getIndex() succeeds when constructed with input value', () => {
        expect(getIdx(new Var(88))).to.equal(88);
      });

      it ('getIndex() fails when constructed without input value', () => {
        expect(() => getIdx(new Var())).to.throw('Cannot get index of fresh variable.');
      });

      it ('isFresh() is false when constructed with input value', () => {
        expect(isFresh(new Var(88))).to.equal(false);
      });

      it ('isFresh() is true when constructed without input value', () => {
        expect(isFresh(new Var())).to.equal(true);
      });
    });
  });

  given('a some object', () => {
    when ('checking for Var type', () => {
      it ('false when not a Var', () => {
        expect(isVar([])).to.equal(false);
      });

      it ('true when constructed without input value', () => {
        expect(isVar(new Var())).to.equal(true);
      });
    });
  });
});