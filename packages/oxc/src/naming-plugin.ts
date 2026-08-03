interface IDeclarationNode {
  id: null | {
    name: string;
  };
}

interface INamingRuleOptions {
  expected: string;
  messageId: string;
  isValid(name: string): boolean;
}

interface IReportContext {
  report(result: {
    messageId: string;
    node: IDeclarationNode['id'];
    data: {
      name: string;
      expected: string;
    };
  }): void;
}

interface IRuleMeta {
  schema: [];
  type: 'suggestion';
  messages: Readonly<Record<string, string>>;
}

type TDeclarationVisitor = (node: IDeclarationNode) => void;
type TClassRuleVisitors = Record<
  'ClassDeclaration' | 'ClassExpression',
  TDeclarationVisitor
>;
type TInterfaceRuleVisitors = Record<
  'TSInterfaceDeclaration',
  TDeclarationVisitor
>;
type TTypeAliasRuleVisitors = Record<
  'TSTypeAliasDeclaration',
  TDeclarationVisitor
>;

const interfaceDeclaration = 'TSInterfaceDeclaration';
const typeAliasDeclaration = 'TSTypeAliasDeclaration';
const classDeclaration = 'ClassDeclaration';
const classExpression = 'ClassExpression';

function isPascalCase(name: string): boolean {
  if (/^\d+$/.test(name)) {
    return true;
  }

  if (!/^[A-Z][A-Za-z\d]*$/.test(name)) {
    return false;
  }

  return name.length === 1 || !/^[A-Z]+$/.test(name);
}

function hasPascalCaseSuffix(name: string, prefix: string): boolean {
  return name.startsWith(prefix) && isPascalCase(name.slice(prefix.length));
}

function createNamingVisitor(
  context: IReportContext,
  { expected, isValid, messageId }: INamingRuleOptions,
): TDeclarationVisitor {
  return function visitDeclaration(node: IDeclarationNode): void {
    if (node.id === null || isValid(node.id.name)) {
      return;
    }

    context.report({
      messageId,
      node: node.id,
      data: {
        expected,
        name: node.id.name,
      },
    });
  };
}

function createRuleMeta(messageId: string): IRuleMeta {
  return {
    schema: [],
    type: 'suggestion',
    messages: {
      [messageId]: '{{ name }} must {{ expected }}.',
    },
  } as const;
}

export default {
  meta: {
    name: '@alphacifer/oxc',
  },
  rules: {
    'class-name': {
      create(context: IReportContext): TClassRuleVisitors {
        const visitor = createNamingVisitor(context, {
          isValid: isPascalCase,
          messageId: 'className',
          expected: 'be in PascalCase',
        });

        return {
          [classExpression]: visitor,
          [classDeclaration]: visitor,
        };
      },
      meta: createRuleMeta('className'),
    },
    'interface-prefix': {
      create(context: IReportContext): TInterfaceRuleVisitors {
        return {
          [interfaceDeclaration]: createNamingVisitor(context, {
            isValid(name: string): boolean {
              return hasPascalCaseSuffix(name, 'I');
            },
            messageId: 'interfacePrefix',
            expected: "start with 'I' followed by a PascalCase name",
          }),
        };
      },
      meta: createRuleMeta('interfacePrefix'),
    },
    'type-alias-prefix': {
      create(context: IReportContext): TTypeAliasRuleVisitors {
        return {
          [typeAliasDeclaration]: createNamingVisitor(context, {
            isValid(name: string): boolean {
              return hasPascalCaseSuffix(name, 'T');
            },
            messageId: 'typeAliasPrefix',
            expected: "start with 'T' followed by a PascalCase name",
          }),
        };
      },
      meta: createRuleMeta('typeAliasPrefix'),
    },
  },
};
