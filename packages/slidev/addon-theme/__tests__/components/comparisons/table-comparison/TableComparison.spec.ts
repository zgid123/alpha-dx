import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('TableComparison components', () => {
  const tablePath = path.resolve(
    __dirname,
    '../../../../components/comparisons/table-comparison/TableComparison.vue',
  );
  const columnPath = path.resolve(
    __dirname,
    '../../../../components/comparisons/table-comparison/TableComparisonColumn.vue',
  );
  const rowPath = path.resolve(
    __dirname,
    '../../../../components/comparisons/table-comparison/TableComparisonRow.vue',
  );
  const cellPath = path.resolve(
    __dirname,
    '../../../../components/comparisons/table-comparison/TableComparisonCell.vue',
  );
  const stylePath = path.resolve(
    __dirname,
    '../../../../components/comparisons/table-comparison/style.css',
  );

  const tableSource = fs.readFileSync(tablePath, 'utf8');
  const columnSource = fs.readFileSync(columnPath, 'utf8');
  const rowSource = fs.readFileSync(rowPath, 'utf8');
  const cellSource = fs.readFileSync(cellPath, 'utf8');
  const styleContent = fs.readFileSync(stylePath, 'utf8');

  const { descriptor: tableDesc } = parse(tableSource);
  const { descriptor: columnDesc } = parse(columnSource);
  const { descriptor: rowDesc } = parse(rowSource);
  const { descriptor: cellDesc } = parse(cellSource);

  describe('#TableComparison', () => {
    it('compiles template and outputs alpha-table-comparison wrapper', () => {
      const result = compileTemplate({
        id: 'table-comparison-spec',
        filename: 'TableComparison.vue',
        source: tableDesc.template?.content ?? '',
      });
      expect(result.errors).toEqual([]);

      const template = tableDesc.template?.content ?? '';
      expect(template).toContain('alpha-table-comparison-wrapper');
      expect(template).toContain('alpha-table-comparison--animated');
    });
  });

  describe('#TableComparisonColumn', () => {
    it('binds backgroundColor and color on colStyle', () => {
      const script = columnDesc.scriptSetup?.content ?? '';
      expect(script).toContain('backgroundColor: resolvedColor.value');
      expect(script).toContain('color: resolvedTextColor.value');
      expect(script).toContain('--alpha-table-comparison-col-1-background');
      expect(script).toContain('--alpha-table-comparison-col');
    });

    it('provides fallback scoped rules for column header background and foreground', () => {
      const styles = columnDesc.styles
        .map((styleBlock) => styleBlock.content)
        .join('\n');
      expect(styles).toContain(':where(.alpha-table-comparison-col)');
      expect(styles).toContain(
        'background-color: var(--alpha-table-comparison-col-1-background)',
      );
      expect(styles).toContain('color: var(--alpha-table-comparison-col)');
    });
  });

  describe('#TableComparisonRow', () => {
    it('binds backgroundColor and color on headerStyle', () => {
      const script = rowDesc.scriptSetup?.content ?? '';
      expect(script).toContain('backgroundColor: resolvedBg.value');
      expect(script).toContain('color: resolvedTextColor.value');
      expect(script).toContain('--alpha-table-comparison-row-bg');
      expect(script).toContain('--alpha-table-comparison-row');
    });

    it('provides fallback scoped rules for row header background and foreground', () => {
      const styles = rowDesc.styles
        .map((styleBlock) => styleBlock.content)
        .join('\n');
      expect(styles).toContain(':where(.alpha-table-comparison-row-title)');
      expect(styles).toContain(
        'background-color: var(--alpha-table-comparison-row-bg)',
      );
      expect(styles).toContain('color: var(--alpha-table-comparison-row)');
    });
  });

  describe('#TableComparisonCell', () => {
    it('binds backgroundColor and color on cellStyle', () => {
      const script = cellDesc.scriptSetup?.content ?? '';
      expect(script).toContain('backgroundColor: resolvedBg.value');
      expect(script).toContain('color: resolvedTextColor.value');
      expect(script).toContain('--alpha-table-comparison-cell-bg');
      expect(script).toContain('--alpha-table-comparison-cell');
    });

    it('provides fallback scoped rules for cell background and foreground', () => {
      const styles = cellDesc.styles
        .map((styleBlock) => styleBlock.content)
        .join('\n');
      expect(styles).toContain(':where(.alpha-table-comparison-cell)');
      expect(styles).toContain(
        'background-color: var(--alpha-table-comparison-cell-bg)',
      );
      expect(styles).toContain('color: var(--alpha-table-comparison-cell)');
    });
  });

  describe('#style.css', () => {
    it('defines tokens inside @layer alpha-theme-tokens', () => {
      expect(styleContent).toContain('@layer alpha-theme-tokens');
      expect(styleContent).toContain(
        '--alpha-table-comparison-cell-bg: #d6e5ef;',
      );
      expect(styleContent).toContain('--alpha-table-comparison-col: #ffffff;');
      expect(styleContent).toContain('--alpha-table-comparison-row: #ffffff;');
      expect(styleContent).toContain(
        '--alpha-table-comparison-row-bg: #2e8b9a;',
      );
    });

    it('defines element rules for column header, row title, and cell', () => {
      expect(styleContent).toContain('.alpha-table-comparison-col {');
      expect(styleContent).toContain('.alpha-table-comparison-row-title {');
      expect(styleContent).toContain('.alpha-table-comparison-cell {');
    });
  });
});
