import {
  calculateRectOrbitTetradCoordinates,
  darkenColor,
  lightenColor,
} from '../../../utils/rectOrbitTetrad/createRectOrbitTetradGeometry';

describe('createRectOrbitTetradGeometry', () => {
  describe('#calculateRectOrbitTetradCoordinates', () => {
    suite('when called with default params', () => {
      it('returns 4 quadrants with symmetric geometry centered at 180, 180', () => {
        const coords = calculateRectOrbitTetradCoordinates();

        expect(coords.centerX).toBe(180);
        expect(coords.centerY).toBe(180);
        expect(coords.quadrants).toHaveLength(4);
        expect(coords.arcPaths).toHaveLength(4);
        expect(coords.iconPositions).toHaveLength(4);
        expect(coords.numberPositions).toHaveLength(4);
      });
    });

    suite('when evaluating quadrant box coordinates', () => {
      it('positions top-left and bottom-right diagonally across center', () => {
        const coords = calculateRectOrbitTetradCoordinates();
        const [q0, q1, q2, q3] = coords.quadrants;

        expect(q0.x + q0.width).toBeLessThan(coords.centerX);
        expect(q0.y + q0.height).toBeLessThan(coords.centerY);

        expect(q1.x).toBeGreaterThan(coords.centerX);
        expect(q1.y + q1.height).toBeLessThan(coords.centerY);

        expect(q2.x).toBeGreaterThan(coords.centerX);
        expect(q2.y).toBeGreaterThan(coords.centerY);

        expect(q3.x + q3.width).toBeLessThan(coords.centerX);
        expect(q3.y).toBeGreaterThan(coords.centerY);
      });
    });

    suite('when evaluating arc paths', () => {
      it('generates 4 arc paths covering four 90-degree quadrant sectors', () => {
        const coords = calculateRectOrbitTetradCoordinates();

        for (const p of coords.arcPaths) {
          expect(p).toMatch(/^M \d+(\.\d+)? \d+(\.\d+)? A \d+/);
        }
      });
    });

    suite('when custom dimensions are passed', () => {
      it('recomputes centers and bounds based on custom viewBoxSize and gap', () => {
        const coords = calculateRectOrbitTetradCoordinates({
          viewBoxSize: 500,
          gap: 20,
          width: 200,
          height: 200,
        });

        expect(coords.centerX).toBe(250);
        expect(coords.centerY).toBe(250);
        expect(coords.quadrants[1].x).toBe(260);
      });
    });
  });

  describe('#lightenColor', () => {
    suite('when ratio is 0', () => {
      it('returns original hex color', () => {
        expect(lightenColor({ hex: '#ff0000', ratio: 0 })).toBe('#ff0000');
      });
    });

    suite('when ratio is 1', () => {
      it('returns pure white', () => {
        expect(lightenColor({ hex: '#ff0000', ratio: 1 })).toBe('#ffffff');
      });
    });

    suite('when shorthand hex is passed', () => {
      it('expands shorthand hex correctly', () => {
        expect(lightenColor({ hex: '#f00', ratio: 0 })).toBe('#ff0000');
      });
    });

    suite('when invalid hex is provided', () => {
      it('returns input unchanged', () => {
        expect(lightenColor({ hex: 'invalid' })).toBe('invalid');
      });
    });
  });

  describe('#darkenColor', () => {
    suite('when ratio is 0', () => {
      it('returns original hex color', () => {
        expect(darkenColor({ hex: '#ffffff', ratio: 0 })).toBe('#ffffff');
      });
    });

    suite('when ratio is 1', () => {
      it('returns pure black', () => {
        expect(darkenColor({ hex: '#ffffff', ratio: 1 })).toBe('#000000');
      });
    });

    suite('when valid hex is darkened', () => {
      it('reduces RGB values proportionately', () => {
        const darkened = darkenColor({ hex: '#808080', ratio: 0.5 });
        expect(darkened).toBe('#404040');
      });
    });
  });
});
