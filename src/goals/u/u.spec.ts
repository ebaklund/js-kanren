
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { $u } from '..';
import { Subst } from '../../internal';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('fail', () => {
  given ('a fail function', () => {
    when ('applied on a Subst', () => {
      it ('returns non-empty Stream', () => {
        expect($u.eval(new Subst()).isEmpty()).to.equal(true);
      });
    });
  });
});