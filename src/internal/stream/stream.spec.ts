
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { Stream, isStream } from '..';
import { Subst } from '../../internal';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('stream', () => {
  given ('a stream', () => {
    let stream: Stream;

    beforeEach(() => {
      stream = new Stream();
    });

    when ('checking empty', () => {
      it ('returns true if empty', () => {
        expect(stream.isEmpty()).to.be.true;
      });

      it ('returns false if not empty', () => {
        stream.push(new Subst());
        expect(stream.isEmpty()).to.be.false;
      });
    });

    when ('checking type', () => {
      it ('returns true if Stream', () => {
        expect(isStream(stream)).to.be.true;
      });

      it ('returns false if not Stream', () => {
        stream.push(new Subst());
        expect(isStream({})).to.be.false;
      });
    });
  });
});