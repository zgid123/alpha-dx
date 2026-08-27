import { classifyLayout } from './classifyLayout';
import { classifySimple } from './classifySimple';
import { classifyTypography } from './classifyTypography';
import { classifyVisual } from './classifyVisual';

interface IClassifyUtilityParams {
  readonly rawUtility: string;
}

export function classifyUtility({
  rawUtility,
}: IClassifyUtilityParams): readonly string[] {
  const utility = rawUtility.startsWith('-') ? rawUtility.slice(1) : rawUtility;

  const arbitraryProperty = utility.match(/^\[([^:]+):.+\]$/);

  if (arbitraryProperty) {
    return [`property:${arbitraryProperty[1]}`];
  }

  const conflictKeys =
    classifyLayout({
      utility,
    }) ??
    classifyTypography({
      utility,
    }) ??
    classifyVisual({
      utility,
    }) ??
    classifySimple({
      utility,
    });

  return conflictKeys ?? [`token:${utility}`];
}
