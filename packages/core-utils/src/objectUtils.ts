/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDate, isObjectType } from 'remeda';

import { camelize, snakize, type TCamelCase } from './stringUtils';

function deepLookup<T>(data: T, formatFunc: (str: string) => string): T {
  if (Array.isArray(data)) {
    return data.map((datumn) => {
      return deepLookup(datumn, formatFunc);
    }) as T;
  }

  if (isDate(data) || !isObjectType(data)) {
    return data;
  }

  return Object.entries(data as Record<string, any>).reduce(
    (result, [k, v]) => {
      let value;

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

type TCamelKeysProps<T> = {
  [K in keyof T as TCamelCase<K>]: T[K];
};

export function deepCamelizeKeys<T>(data: T): TCamelKeysProps<T> {
  return deepLookup(data, camelize) as TCamelKeysProps<T>;
}

export function deepSnakeizeKeys<T>(data: T): T {
  return deepLookup(data, snakize);
}

export function assign<T extends Record<any, any>>(
  source: T,
  target: Partial<T & Record<any, any>>,
): T {
  return Object.assign(source, target);
}
