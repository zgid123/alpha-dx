import {
  calculateArcComparisonHubAvailableWidth,
  calculateArcComparisonHubTitleFontSize,
  DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
  MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
  measureArcComparisonHubTitleFontSize,
  resolveSharedArcComparisonHubTitleFontSize,
} from '../../../../utils/comparisons/arc-comparison/useArcComparisonHubTitleFontSize';

describe('useArcComparisonHubTitleFontSize utilities', () => {
  describe('#calculateArcComparisonHubAvailableWidth', () => {
    suite('when called with default clearance and padding', () => {
      it('subtracts vsRadius inner clearance and outer padding from hubRadius', () => {
        const availableWidth = calculateArcComparisonHubAvailableWidth({
          hubRadius: 135,
          vsRadius: 26,
        });

        expect(availableWidth).toBe(93);
      });
    });

    suite('when hubRadius is smaller than combined padding', () => {
      it('clamps the available width to zero', () => {
        const availableWidth = calculateArcComparisonHubAvailableWidth({
          hubRadius: 30,
          vsRadius: 26,
        });

        expect(availableWidth).toBe(0);
      });
    });
  });

  describe('#calculateArcComparisonHubTitleFontSize', () => {
    suite('when not in center layout step (moved or default mode)', () => {
      it('returns the default 18px font size even if contentWidth exceeds availableWidth', () => {
        const fontSize = calculateArcComparisonHubTitleFontSize({
          availableWidth: 93,
          contentWidth: 112,
          inCenter: false,
        });

        expect(fontSize).toBe(DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE);
      });
    });

    suite('when in center layout step and text already fits', () => {
      it('returns the default 18px font size when contentWidth is less than or equal to availableWidth', () => {
        const fontSize = calculateArcComparisonHubTitleFontSize({
          availableWidth: 93,
          contentWidth: 83,
          inCenter: true,
        });

        expect(fontSize).toBe(DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE);
      });
    });

    suite('when in center layout step and text overflows available width', () => {
      it('scales down the font size proportionally to match the available width', () => {
        const fontSize = calculateArcComparisonHubTitleFontSize({
          availableWidth: 93,
          contentWidth: 112,
          inCenter: true,
        });

        expect(fontSize).toBe(14.9);
      });

      it('clamps extremely wide text to the minimum font size', () => {
        const fontSize = calculateArcComparisonHubTitleFontSize({
          availableWidth: 93,
          contentWidth: 500,
          inCenter: true,
        });

        expect(fontSize).toBe(MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE);
      });
    });
  });

  describe('#resolveSharedArcComparisonHubTitleFontSize', () => {
    suite('when one side requires a smaller font size in center step', () => {
      it('synchronizes both sides to the smaller font size', () => {
        expect(
          resolveSharedArcComparisonHubTitleFontSize({
            leftFontSize: 18,
            rightFontSize: 14.9,
            inCenter: true,
          }),
        ).toBe(14.9);

        expect(
          resolveSharedArcComparisonHubTitleFontSize({
            leftFontSize: 14.2,
            rightFontSize: 18,
            inCenter: true,
          }),
        ).toBe(14.2);
      });
    });

    suite('when not in center step (moved or default mode)', () => {
      it('resets both sides to the default 18px font size', () => {
        expect(
          resolveSharedArcComparisonHubTitleFontSize({
            leftFontSize: 18,
            rightFontSize: 14.9,
            inCenter: false,
          }),
        ).toBe(DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE);
      });
    });
  });

  describe('#measureArcComparisonHubTitleFontSize', () => {
    suite('when measuring a fake element in center step', () => {
      it('measures natural scrollWidth at 18px, scales down if needed, and restores inline styles', () => {
        const styleRecord = {
          display: 'inline',
          width: '',
          maxWidth: '100%',
          minWidth: '',
          textAlign: 'center',
          fontSize: '18px',
        };
        const fakeElement = {
          style: styleRecord,
          get scrollWidth(): number {
            if (styleRecord.fontSize === '18px') {
              return 112;
            }

            return 92;
          },
        } as unknown as HTMLElement;

        const fontSize = measureArcComparisonHubTitleFontSize({
          element: fakeElement,
          availableWidth: 93,
          inCenter: true,
        });

        expect(fontSize).toBe(14.9);
        expect(styleRecord).toEqual({
          display: 'inline',
          width: '',
          maxWidth: '100%',
          minWidth: '',
          textAlign: 'center',
          fontSize: '18px',
        });
      });

      it('returns 18px when element is null or inCenter is false', () => {
        expect(
          measureArcComparisonHubTitleFontSize({
            element: null,
            availableWidth: 93,
            inCenter: true,
          }),
        ).toBe(18);

        expect(
          measureArcComparisonHubTitleFontSize({
            element: null,
            availableWidth: 93,
            inCenter: false,
          }),
        ).toBe(18);
      });
    });
  });
});
