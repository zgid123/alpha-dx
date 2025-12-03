import { isDate, isObjectType } from 'remeda';

import {
  camelize,
  pascalize,
  snakize,
  type TCamelizeCase,
  type TPascalizeCase,
} from './stringUtils';

function deepLookup<T>(data: T, formatFunc: (str: string) => string): T {
  if (Array.isArray(data)) {
    return data.map((datumn) => {
      return deepLookup(datumn, formatFunc);
    }) as T;
  }

  if (isDate(data) || !isObjectType(data)) {
    return data;
  }

  return Object.entries(data as Record<string, unknown>).reduce(
    (result, [k, v]) => {
      let value: unknown;

      if (isDate(v) || !isObjectType(v)) {
        value = v;
      } else {
        value = deepLookup(v, formatFunc);
      }

      Object.assign(result, {
        [formatFunc(k)]: value,
      });

      return result;
    },
    {},
  ) as T;
}

export type TDeepCamelizeKeys<T> =
  T extends Array<infer U>
    ? TDeepCamelizeKeys<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? TCamelizeCase<K>
            : K]: TDeepCamelizeKeys<T[K]>;
        }
      : T;

export function deepCamelizeKeys<T>(data: T): TDeepCamelizeKeys<T> {
  return deepLookup(data, camelize) as TDeepCamelizeKeys<T>;
}

export function deepSnakeizeKeys<T>(data: T): T {
  return deepLookup(data, snakize);
}

export type TDeepPascalizeKeys<T> =
  T extends Array<infer U>
    ? TDeepPascalizeKeys<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? TPascalizeCase<K>
            : K]: TDeepPascalizeKeys<T[K]>;
        }
      : T;

export function deepPascalizeKeys<T>(data: T): TDeepPascalizeKeys<T> {
  return deepLookup(data, pascalize) as TDeepPascalizeKeys<T>;
}

export function assign<T extends Record<string, unknown>>(
  source: T,
  target: Partial<T & Record<string, unknown>>,
): T {
  return Object.assign(source, target);
}
