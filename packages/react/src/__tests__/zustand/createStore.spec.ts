import {
  createStore,
  type TCreateStoreReturn,
} from '../../zustand/createStore';

type TWorker = 'Biome' | 'Prettier';

interface ISettingsProps {
  indentWidth: number;
  wrapLongLines: boolean;
}

interface IJsonFormatterDataProps {
  raw: string;
  worker: TWorker;
  settings: ISettingsProps;
}

interface IJsonFormatterStateProps extends IJsonFormatterDataProps {
  setRaw: (raw: string) => void;
  setWorker: (worker: TWorker) => void;
  setSettings: (settings: Partial<ISettingsProps>) => void;
}

export const jsonFormatterStore: TCreateStoreReturn<IJsonFormatterStateProps> =
  createStore<IJsonFormatterStateProps>(
    (set) => {
      return {
        raw: '',
        worker: 'Biome',
        settings: {
          indentWidth: 2,
          wrapLongLines: false,
        },
        setRaw(data) {
          return set((state) => {
            state.raw = data;
          });
        },
        setSettings(data) {
          return set((state) => {
            Object.assign(state.settings, data);
          });
        },
        setWorker(data) {
          return set((state) => {
            state.worker = data;
          });
        },
      };
    },
    {
      name: 'json-formatter-app',
    },
  );

describe('#zustandType', () => {
  it('has no test', () => {
    expect(true).toBeTruthy();
  });
});
