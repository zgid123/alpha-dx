export interface IColorModifierParams {
  readonly hex: string;
  readonly ratio?: number;
}

interface IModifyColorParams extends IColorModifierParams {
  readonly target: 'white' | 'black';
}

interface IRgbColor {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

function parseHexColor(hex: string): IRgbColor | undefined {
  const raw = hex.trim().replace(/^#/, '');
  const sanitized =
    raw.length === 3
      ? raw
          .split('')
          .map((character) => {
            return character + character;
          })
          .join('')
      : raw;

  if (sanitized.length !== 6) {
    return undefined;
  }

  const red = Number.parseInt(sanitized.slice(0, 2), 16);
  const green = Number.parseInt(sanitized.slice(2, 4), 16);
  const blue = Number.parseInt(sanitized.slice(4, 6), 16);

  if ([red, green, blue].some(Number.isNaN)) {
    return undefined;
  }

  return {
    red,
    green,
    blue,
  };
}

function formatHexChannel(channel: number): string {
  return Math.min(255, Math.max(0, Math.round(channel)))
    .toString(16)
    .padStart(2, '0');
}

function modifyColor({ hex, ratio = 0.5, target }: IModifyColorParams): string {
  if (hex.trim().startsWith('var(')) {
    const weight = Number(
      ((1 - Math.min(1, Math.max(0, ratio))) * 100).toFixed(4),
    );

    return `color-mix(in srgb, ${hex} ${weight}%, ${target})`;
  }

  const color = parseHexColor(hex);

  if (!color) {
    return hex;
  }

  const modifyChannel = (channel: number): number => {
    if (target === 'white') {
      return channel + (255 - channel) * ratio;
    }

    return channel * (1 - ratio);
  };

  return `#${formatHexChannel(modifyChannel(color.red))}${formatHexChannel(modifyChannel(color.green))}${formatHexChannel(modifyChannel(color.blue))}`;
}

export function lightenColor({ hex, ratio }: IColorModifierParams): string {
  return modifyColor({
    hex,
    ratio,
    target: 'white',
  });
}

export function darkenColor({ hex, ratio }: IColorModifierParams): string {
  return modifyColor({
    hex,
    ratio,
    target: 'black',
  });
}
