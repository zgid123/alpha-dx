# @alphacifer/core-utils

Core TypeScript utility library providing safe helpers for functions, arrays, strings, objects, dates, URLs, slugs, and unique IDs.

## Installation

```sh
pnpm add @alphacifer/core-utils
```

---

## Timing Utilities

Debounce and throttle function execution with typed parameter support.

```ts
import { debounce, throttle } from '@alphacifer/core-utils';

// Debounce: delays invocation until 300ms after the last call
const handleSearch = debounce(
  (query?: string) => {
    console.log('Searching for:', query);
  },
  {
    delay: 300,
  },
);

// Throttle: limits execution to once every 1_000ms
const handleScroll = throttle(
  () => {
    console.log('Scroll event processed');
  },
  {
    delay: 1_000,
  },
);
```

---

## Array Utilities

Safely wraps items into an array, handling `null`, `undefined`, single elements, or existing arrays.

```ts
import { wrapArray } from '@alphacifer/core-utils/arrayUtils';

wrapArray(1);          // [1]
wrapArray([1, 2, 3]);  // [1, 2, 3]
wrapArray(null);       // []
wrapArray(undefined);  // []
```

---

## String Utilities

Convert string casings and combine string tokens.

```ts
import {
  camelize,
  combine,
  humanize,
  pascalize,
  snakize,
} from '@alphacifer/core-utils/stringUtils';

camelize('hello_world'); // 'helloWorld'
snakize('helloWorld');  // 'hello_world'
pascalize('hello_world'); // 'HelloWorld'
humanize('hello_world'); // 'Hello world'

// Combine multiple strings with custom separator
combine(
  {
    joinWith: '-',
  },
  'alpha',
  'dx',
  'tools',
); // 'alpha-dx-tools'
```

---

## Object Utilities

Deep key casing transformations for nested objects and arrays.

```ts
import {
  deepCamelizeKeys,
  deepPascalizeKeys,
  deepSnakeizeKeys,
} from '@alphacifer/core-utils/objectUtils';

// Deep camelCase conversion
deepCamelizeKeys({
  user_name: 'alpha',
  contact_info: {
    phone_number: '123-456',
  },
});
// Result: { userName: 'alpha', contactInfo: { phoneNumber: '123-456' } }

// Deep snake_case conversion
deepSnakeizeKeys({
  userName: 'alpha',
  contactInfo: {
    phoneNumber: '123-456',
  },
});
// Result: { user_name: 'alpha', contact_info: { phone_number: '123-456' } }

// Deep PascalCase conversion
deepPascalizeKeys({
  user_name: 'alpha',
});
// Result: { UserName: 'alpha' }
```

---

## Date Utilities

Date parsing, formatting, and re-exported `date-fns` helpers.

```ts
import { formatDate, parseDate } from '@alphacifer/core-utils/dateUtils';

const date = parseDate('2026-01-01');
formatDate(date); // '01 Jan 2026'
formatDate(date, {
  format: 'yyyy-MM-dd',
}); // '2026-01-01'
```

---

## URL Utilities

Safely combine base URLs and path segments without accidental duplicate slashes.

```ts
import { buildUrl } from '@alphacifer/core-utils/urlUtils';

buildUrl('https://api.example.com/', '/users'); // 'https://api.example.com/users'
buildUrl('https://api.example.com', 'v1', 'items'); // 'https://api.example.com/v1/items'
```

---

## Vietnamese Slugify

Transforms strings with Vietnamese tone marks and accents into clean URL slugs.

```ts
import { slugify } from '@alphacifer/core-utils/slugify';

slugify('Xin chào thế giới!'); // 'xin-chao-the-gioi'
slugify('Đại học Khoa học Tự nhiên'); // 'dai-hoc-khoa-hoc-tu-nhien'
```

---

## Unique ID Generation

Lightweight, collision-resistant unique identifier generator.

```ts
import { uniqid } from '@alphacifer/core-utils/uniqid';

const id = uniqid(); // e.g. 'clxyz123abc'
```

---

## Remeda Functional Utilities

Re-exports the complete [remeda](https://remedajs.com/) functional utility library for data manipulation.

```ts
import { filter, map, pipe } from '@alphacifer/core-utils/remeda';

const numbers = [1, 2, 3, 4, 5, 6];

const result = pipe(
  numbers,
  filter((n) => n % 2 === 0),
  map((n) => n * 10),
);
// [20, 40, 60]
```
