import { resolveSingleArcArrowProcessItem } from '../../../../utils/process/arc-arrow-process/resolveArcArrowProcessItems';

describe('resolveSingleArcArrowProcessItem', () => {
  it('keeps the heading foreground default when the accent color changes', () => {
    const item = resolveSingleArcArrowProcessItem({ color: '#ea580c' });

    expect(item.color).toBe('#ea580c');
    expect(item.titleColor).toBe('var(--alpha-arc-arrow-process-heading)');
  });

  it('uses an explicit heading color override', () => {
    const item = resolveSingleArcArrowProcessItem({
      color: '#ea580c',
      titleColor: '#0f172a',
    });

    expect(item.titleColor).toBe('#0f172a');
  });
});
