# @alphacifer/react

React utilities and state management patterns for Alpha's projects, featuring an Immer-powered store factory for Zustand.

## Installation

```sh
pnpm add @alphacifer/react
```

Peer dependencies:

```sh
pnpm add react zustand
```

---

## Zustand Store Factory

Factory function `createStore` combines Zustand state management with [Immer](https://immerjs.github.io/immer/) mutable state updates and DevTools support.

```ts
import {
  createStore,
  type TCreateStoreReturn,
} from '@alphacifer/react/zustand';

interface ISettingsProps {
  indentWidth: number;
  wrapLongLines: boolean;
}

interface IEditorState {
  raw: string;
  settings: ISettingsProps;
  setRaw: (raw: string) => void;
  updateSettings: (settings: Partial<ISettingsProps>) => void;
}

export const editorStore: TCreateStoreReturn<IEditorState> =
  createStore<IEditorState>(
    (set) => {
      return {
        raw: '',
        settings: {
          indentWidth: 2,
          wrapLongLines: false,
        },
        // Direct mutable updates thanks to Immer:
        setRaw: (data) => {
          return set((state) => {
            state.raw = data;
          });
        },
        updateSettings: (data) => {
          return set((state) => {
            Object.assign(state.settings, data);
          });
        },
      };
    },
    {
      name: 'editor-app-store',
    },
  );
```
