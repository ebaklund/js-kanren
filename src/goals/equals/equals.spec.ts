
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { equals } from '..';
import { Subst } from '../../internal';

chai.use(chaiAsPromised);


const { expect } = chai;
const given = describe;
const when = describe;

describe ('equals', () => {
  it ('10.48', () => {
    [
      [true, true, false],
      [true, false, true],
      [false, true, true],
      [false, false, false]
    ].forEach(x => {
      const $ = equals(x[0], x[1])(new Subst());
      expect($.isEmpty()).to.equal(x[2]);
    });
  });
});
