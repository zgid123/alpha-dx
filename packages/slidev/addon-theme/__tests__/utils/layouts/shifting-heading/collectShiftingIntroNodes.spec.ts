import { describe, expect, it } from 'vitest';
import { type FunctionDirective, h, type VNode } from 'vue';

import { collectShiftingIntroNodes } from '../../../../utils/layouts/shifting-heading/collectShiftingIntroNodes';

describe('collectShiftingIntroNodes', () => {
  it('extracts the first h1 element as title and separates other elements as contents', () => {
    const heading = h('h1', 'Main Title');
    const subtitle = h('p', 'Subtitle text');
    const section = h('div', { class: 'content' }, 'Section details');

    const result = collectShiftingIntroNodes([heading, subtitle, section]);

    expect(result.title).toBe(heading);
    expect(result.contents).toHaveLength(2);
    expect(result.contents[0]?.node).toBe(subtitle);
    expect(result.contents[0]?.key).toBe(1);
    expect(result.contents[1]?.node).toBe(section);
    expect(result.contents[1]?.key).toBe(2);
  });

  it('keeps subsequent h1 elements inside contents if the first h1 was already extracted', () => {
    const firstH1 = h('h1', 'First Heading');
    const secondH1 = h('h1', 'Second Heading');

    const result = collectShiftingIntroNodes([firstH1, secondH1]);

    expect(result.title).toBe(firstH1);
    expect(result.contents).toHaveLength(1);
    expect(result.contents[0]?.node).toBe(secondH1);
    expect(result.contents[0]?.key).toBe(1);
  });

  it('handles empty children gracefully', () => {
    const result = collectShiftingIntroNodes([]);

    expect(result.title).toBeNull();
    expect(result.contents).toEqual([]);
    expect(result.clickRef.size).toBe(0);
  });

  it('remaps implicit click directives so they advance after the intro shift click', () => {
    const clickDirective = Object.defineProperty(() => {}, 'name', {
      value: 'v-click',
    }) as unknown as FunctionDirective;

    const heading = h('h1', 'Intro');
    const item1: VNode = {
      ...h('p', 'Point 1'),
      dirs: [
        {
          dir: clickDirective as unknown as import('vue').ObjectDirective,
          value: undefined,
          oldValue: null,
          modifiers: {},
          instance: null,
          arg: undefined,
        },
      ],
    };
    const item2: VNode = {
      ...h('p', 'Point 2'),
      dirs: [
        {
          dir: clickDirective as unknown as import('vue').ObjectDirective,
          value: undefined,
          oldValue: null,
          modifiers: {},
          instance: null,
          arg: undefined,
        },
      ],
    };

    const result = collectShiftingIntroNodes([heading, item1, item2]);

    expect(result.clickRef.get(1)).toBe(2);
    expect(result.clickRef.get(2)).toBe(3);
  });
});
