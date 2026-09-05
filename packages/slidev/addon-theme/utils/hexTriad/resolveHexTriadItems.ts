export interface IHexTriadItem {
  readonly id?: string | number;
  readonly title: string;
  readonly description?: string;
  readonly color?: string;
  readonly depthColor?: string;
  readonly lightColor?: string;
}

export const DEFAULT_HEX_TRIAD_ITEMS: readonly [
  IHexTriadItem,
  IHexTriadItem,
  IHexTriadItem,
] = [
  {
    id: '01',
    title: 'Text Here',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod sed diam nonummy nibh',
    color: '#ee3248',
    depthColor: '#9e1526',
    lightColor: '#ff8595',
  },
  {
    id: '02',
    title: 'Text Here',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod sed diam nonummy nibh',
    color: '#f26522',
    depthColor: '#a83908',
    lightColor: '#ffb088',
  },
  {
    id: '03',
    title: 'Text Here',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod sed diam nonummy nibh',
    color: '#2b4594',
    depthColor: '#172554',
    lightColor: '#8da4e2',
  },
];

export function resolveHexTriadItems(
  userItems?: readonly IHexTriadItem[],
): readonly [IHexTriadItem, IHexTriadItem, IHexTriadItem] {
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
