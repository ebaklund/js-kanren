
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import { Stream, Suspension } from '..';
import { Subst, isStream } from '../../internal';

const { expect } = chai;
const given = describe;
const when = describe;

describe ('stream', () => {
  given ('a Stream', () => {
    let $: Stream;

    beforeEach(() => {
      $ = new Stream([]);
    });

    when ('checking empty', () => {
      it ('returns true if empty', () => {
        expect($.isEmpty()).to.be.true;
      });

      it ('returns false if not empty', () => {
        $ = new Stream([new Subst()]);
        expect($.isEmpty()).to.be.false;
      });
    });

    when ('checking type', () => {
      it ('returns true if Stream', () => {
        expect(isStream($)).to.be.true;
      });

      it ('returns false if not Stream', () => {
        expect(isStream({})).to.be.false;
      });
    });

    when ('checking for empty', () => {
      it ('returns true if has empty array', () => {
        expect($.isEmpty()).to.be.true;
      });

      it ('returns false if has not empty array', () => {
        expect(new Stream([new Subst()]).isEmpty()).to.be.false;
      });

      it ('returns false if has Suspension', () => {
        expect(new Stream(new Suspension(() => [new Subst()])).isEmpty()).to.be.false;
      });
    });
  });

  given ('two Streams', () => {
    when ('applying append', () => {
      it ('returns Stream if first Stream has a Suspension', () => {
        const $1 = new Stream(new Suspension(() => []));
        const $2 = new Stream([]);
        expect(isStream(Stream.append($1, $2))).to.be.true;
      });

      it ('returns Stream if second Stream has a Suspension', () => {
        const $1 = new Stream([]);
        const $2 = new Stream(new Suspension(() => []));
        expect(isStream(Stream.append($1, $2))).to.be.true;
      });

      it ('returns Stream if both Streams have a Suspension', () => {
        const $1 = new Stream(new Suspension(() => []));
        const $2 = new Stream(new Suspension(() => []));
        expect(isStream(Stream.append($1, $2))).to.be.true;
      });

      it ('returns Stream if both Streams have an Array', () => {
        const $1 = new Stream([]);
        const $2 = new Stream([]);
        expect(isStream(Stream.append($1, $2))).to.be.true;
      });
    });
  });
});