import type { JsonObject } from 'type-fest';

function encodeQueryParam(url: URL, key: string, value: any): void {
  if (value === undefined) {
    return;
  }

  url.searchParams.append(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );
}

export function encodeQueryParams<T extends JsonObject>(
  params: T,
  url: URL
): void {
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((it) => {
        encodeQueryParam(url, key, it);
      });
      continue;
    }

    encodeQueryParam(url, key, value);
  }
}