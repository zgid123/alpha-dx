import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('ChevronCard components', () => {
  const cardPath = path.resolve(
    __dirname,
    '../../../../components/card/chevron-card/ChevronCard.vue',
  );
  const badgePath = path.resolve(
    __dirname,
    '../../../../components/card/chevron-card/ChevronCardBadge.vue',
  );
  const contentPath = path.resolve(
    __dirname,
    '../../../../components/card/chevron-card/ChevronCardContent.vue',
  );
  const stylePath = path.resolve(
    __dirname,
    '../../../../components/card/chevron-card/style.css',
  );

  const cardSource = fs.readFileSync(cardPath, 'utf8');
  const badgeSource = fs.readFileSync(badgePath, 'utf8');
  const contentSource = fs.readFileSync(contentPath, 'utf8');
  const styleContent = fs.readFileSync(stylePath, 'utf8');

  const { descriptor: cardDesc } = parse(cardSource);
  const { descriptor: badgeDesc } = parse(badgeSource);
  const { descriptor: contentDesc } = parse(contentSource);

  describe('#ChevronCard', () => {
    it('declares props contract with title, step, color, and cardBg defaults', () => {
      const script = cardDesc.scriptSetup?.content ?? '';
      expect(script).toContain('readonly title?:');
      expect(script).toContain('readonly step?:');
      expect(script).toContain('readonly color?:');
      expect(script).toContain('readonly cardBg?:');
      expect(script).toContain("color: 'var(--alpha-chevron-card-accent)'");
    });

    it('compiles template and outputs alpha-chevron-card and body classes', () => {
      const result = compileTemplate({
        source: cardDesc.template?.content ?? '',
        id: 'chevron-card-spec',
        filename: 'ChevronCard.vue',
      });
      expect(result.errors).toEqual([]);

      const template = cardDesc.template?.content ?? '';
      expect(template).toContain('alpha-chevron-card__body');
      expect(template).toContain('alpha-chevron-card-title');
    });

    it('provides fallback scoped rules for body and title', () => {
      const styles = cardDesc.styles.map((s) => s.content).join('\n');
      expect(styles).toContain(':where(.alpha-chevron-card__body)');
      expect(styles).toContain(
        'background-color: var(--alpha-chevron-card-bg)',
      );
      expect(styles).toContain(':where(.alpha-chevron-card-title)');
      expect(styles).toContain('color: var(--alpha-chevron-card-title)');
    });
  });

  describe('#ChevronCardBadge', () => {
    it('declares polygon clipPath for the chevron shape', () => {
      const template = badgeDesc.template?.content ?? '';
      expect(template).toContain('clipPath: `polygon(0% 0%');
      expect(template).toContain('--alpha-chevron-card-badge-bg');
    });

    it('provides fallback scoped rules for badge background and foreground', () => {
      const styles = badgeDesc.styles.map((s) => s.content).join('\n');
      expect(styles).toContain(':where(.alpha-chevron-card-badge)');
      expect(styles).toContain(
        'background-color: var(--alpha-chevron-card-badge-bg)',
      );
      expect(styles).toContain(
        'color: var(--alpha-chevron-card-badge-foreground)',
      );
    });
  });

  describe('#ChevronCardContent', () => {
    it('provides fallback scoped rules for content color', () => {
      const styles = contentDesc.styles.map((s) => s.content).join('\n');
      expect(styles).toContain(':where(.alpha-chevron-card-content)');
      expect(styles).toContain('color: var(--alpha-chevron-card-content)');
    });
  });

  describe('#style.css', () => {
    it('defines tokens inside @layer alpha-theme-tokens', () => {
      expect(styleContent).toContain('@layer alpha-theme-tokens');
      expect(styleContent).toContain('--alpha-chevron-card-accent: #f59e0b;');
      expect(styleContent).toContain(
        '--alpha-chevron-card-badge-bg: var(--alpha-chevron-card-accent);',
      );
      expect(styleContent).toContain(
        '--alpha-chevron-card-badge-foreground: #ffffff;',
      );
      expect(styleContent).toContain('--alpha-chevron-card-bg: #e2e8f0;');
    });

    it('defines element rules for badge, body, title, and content', () => {
      expect(styleContent).toContain('.alpha-chevron-card-badge {');
      expect(styleContent).toContain('.alpha-chevron-card__body {');
      expect(styleContent).toContain('.alpha-chevron-card-title {');
      expect(styleContent).toContain('.alpha-chevron-card-content {');
    });
  });
});
