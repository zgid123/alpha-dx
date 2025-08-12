import { isDate, isObjectType } from 'remeda';

import { camelize, snakize } from './stringUtils';

function deepLookup<T>(data: T, formatFunc: (str: string) => string): T {
  if (Array.isArray(data)) {
    return data.map((datumn) => {
      return deepLookup(datumn, formatFunc);
    }) as T;
  }

  if (isDate(data) || !isObjectType(data)) {
    return data;
  }

  return Object.entries(data).reduce((result, [k, v]) => {
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
  }, {}) as T;
}

export function deepCamelizeKeys<T>(data: T): T {
  return deepLookup(data, camelize);
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
