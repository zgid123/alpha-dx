import namingPlugin from '../naming-plugin.ts';

interface IReportResult {
  messageId: string;
}

interface ICreateReportCollectorResult {
  reports: IReportResult[];
  context: {
    report(result: IReportResult): void;
  };
}

function createReportCollector(): ICreateReportCollectorResult {
  const reports: IReportResult[] = [];

  const context = {
    report(result: IReportResult) {
      reports.push(result);
    },
  };

  return {
    reports,
    context,
  };
}

function lintInterfaceName(name: string): IReportResult[] {
  const { context, reports } = createReportCollector();
  const visitors = namingPlugin.rules['interface-prefix'].create(context);

  visitors.TSInterfaceDeclaration({ id: { name } });

  return reports;
}

function lintClassName(name: null | string): IReportResult[] {
  const { context, reports } = createReportCollector();
  const visitors = namingPlugin.rules['class-name'].create(context);

  visitors.ClassDeclaration({ id: name === null ? null : { name } });

  return reports;
}

function lintTypeAliasName(name: string): IReportResult[] {
  const { context, reports } = createReportCollector();
  const visitors = namingPlugin.rules['type-alias-prefix'].create(context);

  visitors.TSTypeAliasDeclaration({
    id: {
      name,
    },
  });

  return reports;
}

describe('naming plugin', () => {
  it.each([
    'IUser',
    'IURLParser',
    'I1',
  ])('accepts the interface name %s', (name) => {
    expect(lintInterfaceName(name)).toHaveLength(0);
  });

  it.each([
    'User',
    'Interface',
    'Iuser',
    'IURL',
    'I_User',
  ])('rejects the interface name %s', (name) => {
    expect(lintInterfaceName(name)).toHaveLength(1);
  });

  it.each([
    'TUser',
    'TURLParser',
    'T1',
  ])('accepts the type alias name %s', (name) => {
    expect(lintTypeAliasName(name)).toHaveLength(0);
  });

  it.each([
    'User',
    'Thing',
    'Tuser',
    'TURL',
    'T_User',
  ])('rejects the type alias name %s', (name) => {
    expect(lintTypeAliasName(name)).toHaveLength(1);
  });

  it.each([
    'User',
    'URLParser',
    'UserURL',
    'A',
  ])('accepts the class name %s', (name) => {
    expect(lintClassName(name)).toHaveLength(0);
  });

  it.each([
    'user',
    'XML',
    'user_service',
  ])('rejects the class name %s', (name) => {
    expect(lintClassName(name)).toHaveLength(1);
  });

  it('allows anonymous class expressions', () => {
    expect(lintClassName(null)).toHaveLength(0);
  });
});
