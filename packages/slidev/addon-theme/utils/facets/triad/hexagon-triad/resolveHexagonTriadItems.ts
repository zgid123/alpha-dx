export interface IHexagonTriadItem {
  readonly id?: string | number;
  readonly title: string;
  readonly description?: string;
  readonly color?: string;
  readonly depthColor?: string;
  readonly lightColor?: string;
}

export const DEFAULT_HEX_TRIAD_ITEMS: readonly [
  IHexagonTriadItem,
  IHexagonTriadItem,
  IHexagonTriadItem,
] = [
  {
    id: '01',
    title: '',
    description: '',
    color: 'var(--alpha-hexagon-triad-item-1-color)',
    depthColor: 'var(--alpha-hexagon-triad-item-1-depth)',
    lightColor: 'var(--alpha-hexagon-triad-item-1-light)',
  },
  {
    id: '02',
    title: '',
    description: '',
    color: 'var(--alpha-hexagon-triad-item-2-color)',
    depthColor: 'var(--alpha-hexagon-triad-item-2-depth)',
    lightColor: 'var(--alpha-hexagon-triad-item-2-light)',
  },
  {
    id: '03',
    title: '',
    description: '',
    color: 'var(--alpha-hexagon-triad-item-3-color)',
    depthColor: 'var(--alpha-hexagon-triad-item-3-depth)',
    lightColor: 'var(--alpha-hexagon-triad-item-3-light)',
  },
];

export function resolveHexagonTriadItems(
  userItems?: readonly IHexagonTriadItem[],
): readonly [IHexagonTriadItem, IHexagonTriadItem, IHexagonTriadItem] {
  const items = userItems ?? [];

  return [
    {
      ...DEFAULT_HEX_TRIAD_ITEMS[0],
      ...(items[0] ?? {}),
    },
    {
      ...DEFAULT_HEX_TRIAD_ITEMS[1],
      ...(items[1] ?? {}),
    },
    {
      ...DEFAULT_HEX_TRIAD_ITEMS[2],
      ...(items[2] ?? {}),
    },
  ] as const;
}
