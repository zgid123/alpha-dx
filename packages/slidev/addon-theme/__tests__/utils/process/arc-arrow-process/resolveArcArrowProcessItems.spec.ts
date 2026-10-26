import { resolveSingleArcArrowProcessItem } from '../../../../utils/process/arc-arrow-process/resolveArcArrowProcessItems';

describe('resolveSingleArcArrowProcessItem', () => {
  it('resolves the arrow color from default items', () => {
    const item0 = resolveSingleArcArrowProcessItem(undefined, 0, 4);

    expect(item0.color).toBe('var(--alpha-arc-arrow-process-item-1-color)');

    const customColorItem = resolveSingleArcArrowProcessItem({
      color: '#ea580c',
    });

    expect(customColorItem.color).toBe('#ea580c');
  });

  it('preserves custom id and text color overrides', () => {
    const item = resolveSingleArcArrowProcessItem({
      id: 'custom-01',
      textColor: '#0f172a',
    });

    expect(item.id).toBe('custom-01');
    expect(item.textColor).toBe('#0f172a');
  });
});
