
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import * as mk from '.';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('mk-primitives', () => {
  given ('an object', () => {
    when ('checking its type', () => {
      it ('recognizes strings', () => {
        expect(mk.isString("")).to.be.true;
        expect(mk.isString(String(""))).to.be.true;
        expect(mk.isString(0)).to.be.false;
      });

      it ('recognizes numbers', () => {
        expect(mk.isNumber(0)).to.be.true;
        expect(mk.isNumber("")).to.be.false;
      });

      it ('recognizes arrays', () => {
        expect(mk.isArray([])).to.be.true;
        expect(mk.isArray("")).to.be.false;
      });

      it ('recognizes functions', () => {
        expect(mk.isFunction(() => 0)).to.be.true;
        expect(mk.isFunction("")).to.be.false;
      });

      it ('recognizes objects', () => {
        expect(mk.isObject({})).to.be.true;
        expect(mk.isObject(null)).to.be.false;
        expect(mk.isObject(String(""))).to.be.false;
      });

      it ('recognizes null', () => {
        expect(mk.isNull(null)).to.be.true;
        expect(mk.isNull({})).to.be.false;
      });

      it ('recognizes undefined', () => {
        expect(mk.isUndefined(undefined)).to.be.true;
        expect(mk.isUndefined({})).to.be.false;
      });
    });
  });
});