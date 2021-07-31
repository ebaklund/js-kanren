
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { Suspension } from '..';

chai.use(chaiAsPromised);

const { expect } = chai;
const given = describe;
const when = describe;

describe ('suspension', () => {
  given ('a constructor', () => {
    when ('constructing', () => {
      it ('returns a Suspension', () => {
        const s = new Suspension(() => []);
        expect(!!s).to.be.true;
      });
    });
  });

  given ('a Suspension', () => {
    when ('evaluated', () => {
      it ('returns a something', () => {
        const s = new Suspension(() => []);
        expect(!!s.eval()).to.be.true;
      });
    });
  });
});