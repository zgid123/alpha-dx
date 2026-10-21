import { createTocConnectorPath } from '../../../../utils/layouts/table-of-contents/createTocConnectorPath';

describe('createTocConnectorPath', () => {
  it('draws a direct connector for middle items', () => {
    expect(
      createTocConnectorPath({
        start: { x: 10, y: 20 },
        end: { x: 100, y: 80 },
        isMiddle: true,
      }),
    ).toBe('M 10 20 L 100 80');
  });

  it('adds an elbow for non-middle items', () => {
    expect(
      createTocConnectorPath({
        start: { x: 10, y: 20 },
        end: { x: 100, y: 80 },
        isMiddle: false,
      }),
    ).toBe('M 10 20 L 34 80 L 100 80');
  });
});
