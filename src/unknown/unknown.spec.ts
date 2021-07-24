
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { isString, isNumber, isArray, isFunction, isObject, isNull, isUndefined } from '.';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('mk-primitives', () => {
  given ('an object', () => {
    when ('checking its type', () => {
      it ('recognizes strings', () => {
        expect(isString("")).to.be.true;
        expect(isString(String(""))).to.be.true;
        expect(isString(0)).to.be.false;
      });

      it ('recognizes numbers', () => {
        expect(isNumber(0)).to.be.true;
        expect(isNumber("")).to.be.false;
      });

      it ('recognizes arrays', () => {
        expect(isArray([])).to.be.true;
        expect(isArray("")).to.be.false;
      });

      it ('recognizes functions', () => {
        expect(isFunction(() => 0)).to.be.true;
        expect(isFunction("")).to.be.false;
      });

      it ('recognizes objects', () => {
        expect(isObject({})).to.be.true;
        expect(isObject(null)).to.be.false;
        expect(isObject(String(""))).to.be.false;
      });

      it ('recognizes null', () => {
        expect(isNull(null)).to.be.true;
        expect(isNull({})).to.be.false;
      });

      it ('recognizes undefined', () => {
        expect(isUndefined(undefined)).to.be.true;
        expect(isUndefined({})).to.be.false;
      });
    });
  });
});