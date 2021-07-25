
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { $f } from '..';
import { Subst } from '../../internal';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('fail', () => {
  given ('a fail function', () => {
    when ('applied on a Subst', () => {
      it ('returns non-empty Stream', () => {
        const stream = $f()(new Subst());
        expect(stream.isEmpty()).to.equal(true);
      });
    });
  });
});