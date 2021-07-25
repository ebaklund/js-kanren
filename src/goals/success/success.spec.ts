
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { $u } from '..';
import { Subst } from '../../internal';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('success', () => {
  given ('a success function', () => {
    when ('applied on a Subst', () => {
      it ('returns non-empty Stream', () => {
        const stream = $u()(new Subst());
        expect(stream.isEmpty()).to.equal(false);
      });
    });
  });
});