import { createGearTriadGeometry } from '../../../utils/gearTriad/createGearTriadGeometry';

describe('gearTriad', () => {
  describe('#createGearTriadGeometry', () => {
    suite('when called', () => {
      it('returns static diagram geometry with viewBox 540x480 and 3 sectors', () => {
        const geo = createGearTriadGeometry();

        expect(geo.viewBoxWidth).toBe(540);
        expect(geo.viewBoxHeight).toBe(480);
        expect(geo.centerX).toBe(270);
        expect(geo.centerY).toBe(220);
        expect(geo.hubRadius).toBe(54);
        expect(geo.baseGearPath).toMatch(/^M \d+/);
        expect(geo.cyanSector).toBeDefined();
        expect(geo.orangeSector).toBeDefined();
        expect(geo.pinkSector).toBeDefined();
      });
    });

    suite('when validating sector paths', () => {
      it('provides face path, left fold path, and right fold path for all sectors', () => {
        const geo = createGearTriadGeometry();

        for (const sector of [
          geo.cyanSector,
          geo.orangeSector,
          geo.pinkSector,
        ]) {
          expect(sector.facePath).toMatch(/^M \d+/);
          expect(sector.leftFoldPath).toMatch(/^M \d+/);
          expect(sector.rightFoldPath).toMatch(/^M \d+/);
          expect(sector.iconPosition.x).toBeGreaterThan(0);
          expect(sector.iconPosition.y).toBeGreaterThan(0);
        }
      });
    });

    suite('when validating icon positions', () => {
      it('places cyan at top-left, orange at top-right, and pink at bottom', () => {
        const geo = createGearTriadGeometry();

        // Cyan (top-left): x < centerX, y < centerY
        expect(geo.cyanSector.iconPosition.x).toBeLessThan(geo.centerX);
        expect(geo.cyanSector.iconPosition.y).toBeLessThan(geo.centerY);

        // Orange (top-right): x > centerX, y < centerY
        expect(geo.orangeSector.iconPosition.x).toBeGreaterThan(geo.centerX);
        expect(geo.orangeSector.iconPosition.y).toBeLessThan(geo.centerY);

        // Pink (bottom): x ≈ centerX, y > centerY
        expect(
          Math.abs(geo.pinkSector.iconPosition.x - geo.centerX),
        ).toBeLessThan(5);
        expect(geo.pinkSector.iconPosition.y).toBeGreaterThan(geo.centerY);
      });
    });

    suite('when validating petal notch geometry', () => {
      it('ensures symmetrical notch edges connected by an arc at notch radius', () => {
        const geo = createGearTriadGeometry();

        expect(geo.petal.facePath).toContain('A 128 128 0 0 0');

        const match = geo.petal.facePath.match(
          /L\s+([\d.]+)\s+([\d.]+)\s+A\s+128\s+128\s+0\s+0\s+0\s+([\d.]+)\s+([\d.]+)/,
        );
        expect(match).not.toBeNull();
        const p3aX = Number(match?.[1] ?? 0);
        const p3aY = Number(match?.[2] ?? 0);
        const p3bX = Number(match?.[3] ?? 0);
        const p3bY = Number(match?.[4] ?? 0);

        expect(
          Math.abs(geo.centerX - p3aX - (p3bX - geo.centerX)),
        ).toBeLessThan(0.01);
        expect(p3aY).toBe(p3bY);
      });
    });

    suite('when validating valley geometry', () => {
      it('provides canonical inter-sector valley path with symmetrical edges and root arc', () => {
        const geo = createGearTriadGeometry();

        expect(geo.valleyPath).toMatch(/^M \d+/);
        expect(geo.petal.valleyPath).toBe(geo.valleyPath);
        expect(geo.petal.valleyPath).toContain('A 128 128 0 0 1');
        expect(geo.petal.valleyPath).toContain('A 54 54 0 0 0');
      });
    });
  });
});
