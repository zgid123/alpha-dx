import { combine } from './stringUtils';

function sanatizeUrlPath(urlPath: string): string {
  return urlPath.replace(/^\/|\/$/g, '');
}

export function buildUrl(baseUrl: string, path: string): string {
  return combine(
    {
      joinWith: '/',
    },
    sanatizeUrlPath(baseUrl),
    sanatizeUrlPath(path),
  );
}
