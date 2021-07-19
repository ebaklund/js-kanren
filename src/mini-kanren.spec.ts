

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import * as mk from './mini-kanren';

const { expect } = chai;

describe ('js-kanren', () => {
  it ('hello', () => {
    expect(false).to.equal(true);
  });
});