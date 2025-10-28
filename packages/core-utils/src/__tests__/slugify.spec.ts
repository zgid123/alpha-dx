import { unique } from 'remeda';

import { slugify } from '../slugify';

describe('slugify', () => {
  suite('when value is empty string', () => {
    it('returns empty string', () => {
      expect(slugify('')).toEqual('');
    });
  });

  suite('when value has uppercase', () => {
    it('converts uppercase to lowercase', () => {
      expect(slugify('upperCase')).toEqual('uppercase');
    });
  });

  suite('when value has space', () => {
    it('replaces space with dash', () => {
      expect(slugify('test case')).toEqual('test-case');
    });
  });

  suite('when value has only space', () => {
    it('returns empty string', () => {
      expect(slugify('   ')).toEqual('');
    });
  });

  suite('when value has unicode of character a', () => {
    it('converts to a', () => {
      expect(unique(slugify('àáạảãâầấậẩẫăằắặẳẵ').split('')).join()).toEqual(
        'a',
      );
    });
  });

  suite('when value has unicode of character e', () => {
    it('converts to e', () => {
      expect(unique(slugify('èéẹẻẽêềếệểễ').split('')).join()).toEqual('e');
    });
  });

  suite('when value has unicode of character i', () => {
    it('converts to i', () => {
      expect(unique(slugify('ìíịỉĩ').split('')).join()).toEqual('i');
    });
  });

  suite('when value has unicode of character o', () => {
    it('converts to o', () => {
      expect(unique(slugify('òóọỏõôồốộổỗơờớợởỡ').split('')).join()).toEqual(
        'o',
      );
    });
  });

  suite('when value has unicode of character u', () => {
    it('converts to u', () => {
      expect(unique(slugify('ùúụủũưừứựửữ').split('')).join()).toEqual('u');
    });
  });

  suite('when value has unicode of character y', () => {
    it('converts to y', () => {
      expect(unique(slugify('ỳýỵỷỹ').split('')).join()).toEqual('y');
    });
  });

  suite('when value has unicode of character d', () => {
    it('converts to d', () => {
      expect(unique(slugify('đ').split('')).join()).toEqual('d');
    });
  });

  suite('when value has special character', () => {
    it('replaces special character with dash', () => {
      expect(slugify('test&*+~.()\'"!:@/case')).toEqual('test-case');
    });
  });
});
