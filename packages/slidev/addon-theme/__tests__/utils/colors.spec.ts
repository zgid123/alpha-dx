import { describe, expect, it } from 'vitest';

import { darkenColor, lightenColor } from '../../utils/colors';

describe('color modifiers', () => {
  it('lightens hex colors by blending each channel with white', () => {
    expect(lightenColor({ hex: '#000000', ratio: 0.5 })).toBe('#808080');
    expect(lightenColor({ hex: '#3b82f6', ratio: 1 })).toBe('#ffffff');
    expect(lightenColor({ hex: '#3b82f6', ratio: 0 })).toBe('#3b82f6');
  });

  it('darkens hex colors by blending each channel with black', () => {
    expect(darkenColor({ hex: '#ffffff', ratio: 0.5 })).toBe('#808080');
    expect(darkenColor({ hex: '#3b82f6', ratio: 1 })).toBe('#000000');
    expect(darkenColor({ hex: '#3b82f6', ratio: 0 })).toBe('#3b82f6');
  });

  it('uses a 50 percent blend when no ratio is provided', () => {
    expect(lightenColor({ hex: '#000000' })).toBe('#808080');
    expect(darkenColor({ hex: '#ffffff' })).toBe('#808080');
  });

  it('expands shorthand hex colors', () => {
    expect(lightenColor({ hex: '#000', ratio: 0.5 })).toBe('#808080');
    expect(darkenColor({ hex: '#fff', ratio: 0.5 })).toBe('#808080');
  });

  it('preserves invalid colors', () => {
    expect(lightenColor({ hex: 'invalid' })).toBe('invalid');
    expect(darkenColor({ hex: 'xyz' })).toBe('xyz');
  });

  it('blends CSS variable colors with white and black', () => {
    const color = 'var(--alpha-square-pyramid-accent, #3b82f6)';

    expect(lightenColor({ hex: color, ratio: 0.5 })).toBe(
      `color-mix(in srgb, ${color} 50%, white)`,
    );
    expect(darkenColor({ hex: color, ratio: 0.5 })).toBe(
      `color-mix(in srgb, ${color} 50%, black)`,
    );
  });
});
