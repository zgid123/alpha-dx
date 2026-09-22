Core Utils for Alpha's projects.

# Installation

```sh
pnpm add @alphacifer/core-utils
```

# Usage

## Timing utilities

Debounce and throttle function execution.

```ts
import { debounce, throttle } from '@alphacifer/core-utils';

const handleInput = debounce(
  (value?: string) => {
    console.log('Search query:', value);
  },
  {
    delay: 300,
  },
);

const handleScroll = throttle(
  () => {
    console.log('Scroll position updated');
  },
  {
    delay: 1_000,
  },
);
```

## Array utilities

```ts
import { wrapArray } from '@alphacifer/core-utils/arrayUtils';

wrapArray(1); // [1]
wrapArray([1, 2]); // [1, 2]
wrapArray(null); // []
wrapArray(undefined); // []
```

## String utilities

```ts
import {
  camelize,
  combine,
  humanize,
  pascalize,
  snakize,
} from '@alphacifer/core-utils/stringUtils';

camelize('hello_world'); // 'helloWorld'
snakize('helloWorld'); // 'hello_world'
pascalize('hello_world'); // 'HelloWorld'
humanize('hello_world'); // 'Hello world'

combine(
  {
    joinWith: '-',
  },
  'alpha',
  'dx',
  'tools',
); // 'alpha-dx-tools'
```

## Object utilities

Deep key casing transformations and object helpers.

```ts
import {
  deepCamelizeKeys,
  deepPascalizeKeys,
  deepSnakeizeKeys,
} from '@alphacifer/core-utils/objectUtils';

// Converts object keys to camelCase deeply
deepCamelizeKeys({
  user_name: 'alpha',
  contact_info: {
    phone_number: '123-456',
  },
});
// { userName: 'alpha', contactInfo: { phoneNumber: '123-456' } }

// Converts object keys to snake_case deeply
deepSnakeizeKeys({
  userName: 'alpha',
  contactInfo: {
    phoneNumber: '123-456',
  },
});
// { user_name: 'alpha', contact_info: { phone_number: '123-456' } }

// Converts object keys to PascalCase deeply
deepPascalizeKeys({
  user_name: 'alpha',
});
// { UserName: 'alpha' }
```

## Date utilities

Date parsing, formatting, and re-exported `date-fns` utilities.

```ts
import { formatDate, parseDate } from '@alphacifer/core-utils/dateUtils';

const date = parseDate('2026-01-01');
formatDate(date); // '01 Jan 2026'
formatDate(date, {
  format: 'yyyy-MM-dd',
}); // '2026-01-01'
```

## URL utilities

```ts
import { buildUrl } from '@alphacifer/core-utils/urlUtils';

buildUrl('https://api.example.com/', '/users'); // 'https://api.example.com/users'
```

## Slugify

Vietnamese tone marks and special character slugification.

```ts
import { slugify } from '@alphacifer/core-utils/slugify';

slugify('Xin chào thế giới!'); // 'xin-chao-the-gioi'
slugify('Đại học Khoa học Tự nhiên'); // 'dai-hoc-khoa-hoc-tu-nhien'
```

## Unique ID

```ts
import { uniqid } from '@alphacifer/core-utils/uniqid';

const id = uniqid(); // unique identifier string
```

## Remeda

Re-exports the complete [remeda](https://remedajs.com/) functional utility library.

```ts
import { filter, map, pipe } from '@alphacifer/core-utils/remeda';
```
