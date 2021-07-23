
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { Var, isVar } from '.';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('mk-var', () => {
  given('a Var constructor', () => {
    when ('constructing an new Var', () => {
      it ('has index', () => {
        expect((new Var(88)).idx).to.equal(88);
      });
    });
  });

  given('some object', () => {
    when ('checked for Var type', () => {
      it ('returns false when not a Var', () => {
        expect(isVar([])).to.equal(false);
      });

      it ('returns true when is a Var', () => {
        expect(isVar(new Var(33))).to.equal(true);
      });
    });
  });
});