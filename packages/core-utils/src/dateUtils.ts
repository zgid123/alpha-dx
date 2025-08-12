import { toDate, format as fnsFormat } from 'date-fns';

export * from 'date-fns';

type TFormat = 'dd MMM yyyy';

interface IOptionsProps {
  defaultValue?: string;
  format?: TFormat | Omit<string, TFormat>;
}

export function parseDate(date: string | Date | null | undefined): Date {
  if (!date) {
    return new Date();
  }

  if (typeof date === 'string') {
    return toDate(Date.parse(date));
  }

  return date;
}

export function formatDate(
  value: string | Date | null | undefined,
  opts: IOptionsProps = {},
): string {
  const { format = 'dd MMM yyyy', defaultValue = '' } = opts;

  if (!value) {
    return defaultValue;
  }

  return fnsFormat(parseDate(value), format as string);
}
