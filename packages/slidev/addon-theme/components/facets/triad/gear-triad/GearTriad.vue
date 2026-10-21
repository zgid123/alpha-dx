<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  inject,
  onBeforeUpdate,
  provide,
  type Ref,
  ref,
  useSlots,
  watch,
  type VNode,
} from 'vue';

import {
  createGearTriadGeometry,
  GEAR_TRIAD_BASE_COLOR,
  GEAR_TRIAD_ROOT_KEY,
  type IResolvedGearTriadItem,
  resolveGearTriadItems,
  resolveSingleGearTriadItem,
  type IGearTriadItem,
} from '../../../../utils/facets/triad/gear-triad';
import { useDiagramAutoScale } from '../../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';
import GearTriadCenter from './GearTriadCenter.vue';
import GearTriadIcon from './GearTriadIcon.vue';

defineOptions({
  name: 'GearTriad',
  inheritAttrs: false,
});

export interface IGearTriadProps {
  readonly animation?: boolean;
  readonly active?: boolean;
  readonly startDelay?: number;
  readonly scale?: number;
  readonly autoScale?: boolean;
  readonly maxScale?: number;
  readonly height?: number | string;
  readonly centerIcon?: string | object | false;
  readonly step?: number;
  readonly clicks?: number;
  readonly moved?: boolean;
}

const props = withDefaults(defineProps<IGearTriadProps>(), {
  animation: true,
  active: undefined,
  startDelay: undefined,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
  height: undefined,
  centerIcon: 'gear',
  step: undefined,
  clicks: undefined,
  moved: undefined,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'update:step', step: number): void;
  (e: 'update:moved', moved: boolean): void;
}>();

const slots = useSlots();

const slidevClicks = inject<
  | {
      current: Ref<number> | ComputedRef<number> | number;
      total?: Ref<number> | ComputedRef<number> | number;
    }
  | undefined
>('$$slidev-clicks-context', undefined);

const shiftingIntro = inject<
  | {
      active: ComputedRef<boolean>;
      clicks?: Ref<number> | ComputedRef<number>;
      isShifting?: ComputedRef<boolean>;
    }
  | undefined
>('SLIDEV_LAYOUT_SHIFTING_INTRO', undefined);

const internalStep = ref(props.step ?? 0);

interface INamedComponent {
  readonly name?: string;
  readonly __name?: string;
}

const registeredDetailsCount = ref(0);
const registerDetails = () => {
  registeredDetailsCount.value++;
};

function checkHasDetailsVNodes(nodes: readonly VNode[] | undefined): boolean {
  if (!nodes) {
    return false;
  }

  for (const node of nodes) {
    if (!node) {
      continue;
    }

    if (typeof node.type === 'object' && node.type !== null) {
      const comp = node.type as INamedComponent;
      if (
        comp.name === 'GearTriadDetails' ||
        comp.__name === 'GearTriadDetails'
      ) {
        return true;
      }
    }
    if (Array.isArray(node.children)) {
      if (checkHasDetailsVNodes(node.children as readonly VNode[])) {
        return true;
      }
    }
  }

  return false;
}

const slotHasDetails = computed(() => {
  return slots.default ? checkHasDetailsVNodes(slots.default()) : false;
});

const supportsClicks = computed(() => {
  return registeredDetailsCount.value > 0 || slotHasDetails.value;
});

watch(
  () => props.step,
  (val) => {
    if (val !== undefined) {
      internalStep.value = val;
    }
  },
);

watch(
  () => props.moved,
  (val) => {
    if (val !== undefined) {
      internalStep.value = val ? 1 : 0;
    }
  },
);

const resolvedStep = computed(() => {
  if (props.step !== undefined) {
    return props.step;
  }

  if (props.moved !== undefined) {
    return props.moved ? 1 : 0;
  }

  if (props.clicks !== undefined) {
    return props.clicks;
  }

  if (shiftingIntro?.clicks && typeof shiftingIntro.clicks.value === 'number') {
    return shiftingIntro.clicks.value;
  }

  if (slidevClicks) {
    const curr =
      typeof slidevClicks.current === 'object' &&
      'value' in slidevClicks.current
        ? slidevClicks.current.value
        : (slidevClicks.current as number);
    if (typeof curr === 'number') {
      return curr;
    }
  }

  return internalStep.value;
});

const isShifted = computed(() => resolvedStep.value > 0);

const activeOptionIndex = computed(() => {
  if (resolvedStep.value <= 0) {
    return 0;
  }

  return (resolvedStep.value - 1) % 3;
});

function handleDiagramClick(event: MouseEvent): void {
  emit('click', event);
  if (!supportsClicks.value) {
    return;
  }

  const nextStep = (internalStep.value + 1) % 4;
  internalStep.value = nextStep;
  emit('update:step', nextStep);
  emit('update:moved', nextStep > 0);
}

const diagramTranslateX = computed(() => {
  return isShifted.value ? -260 : 0;
});

const gearRotation = computed(() => {
  if (!isShifted.value) {
    return 0;
  }

  if (activeOptionIndex.value === 0) {
    return 150;
  }

  if (activeOptionIndex.value === 1) {
    return 30;
  }

  return -90;
});

const isAnimated = computed(() => {
  if (!props.animation) {
    return false;
  }

  if (props.active !== undefined) {
    return props.active;
  }

  if (shiftingIntro) {
    return shiftingIntro.active.value;
  }

  return true;
});

const resolvedStartDelay = computed(() => {
  if (props.startDelay !== undefined) {
    return props.startDelay;
  }

  if (shiftingIntro) {
    return shiftingIntro.isShifting?.value ? 600 : 0;
  }

  return 0;
});

const calloutOverrides = ref<Record<number, IGearTriadItem>>({});

const resolvedItems = computed(() => {
  const base = resolveGearTriadItems();

  return [
    resolveSingleGearTriadItem(
      {
        ...base[0],
        ...(calloutOverrides.value[0] ?? {}),
      },
      0,
    ),
    resolveSingleGearTriadItem(
      {
        ...base[1],
        ...(calloutOverrides.value[1] ?? {}),
      },
      1,
    ),
    resolveSingleGearTriadItem(
      {
        ...base[2],
        ...(calloutOverrides.value[2] ?? {}),
      },
      2,
    ),
  ] as const;
});

let calloutCounter = 0;
onBeforeUpdate(() => {
  calloutCounter = 0;
});

const registerCallout = (
  override?: ComputedRef<IGearTriadItem> | (() => IGearTriadItem),
) => {
  const idx = calloutCounter++;
  if (override) {
    watch(
      typeof override === 'function' ? override : () => override.value,
      (val) => {
        if (val) {
          calloutOverrides.value = {
            ...calloutOverrides.value,
            [idx]: val,
          };
        }
      },
      { immediate: true, deep: true },
    );
  }

  return {
    index: idx,
    item: computed(() => resolvedItems.value[idx] ?? resolvedItems.value[0]),
  };
};

provide(GEAR_TRIAD_ROOT_KEY, {
  registerCallout,
  registerDetails,
  hasDetails: supportsClicks,
  items: resolvedItems,
  animation: isAnimated,
  isShifted,
  currentStep: resolvedStep,
  activeOptionIndex,
});

const geo = createGearTriadGeometry();

const item0 = computed(() => resolvedItems.value[0]);
const item1 = computed(() => resolvedItems.value[1]);
const item2 = computed(() => resolvedItems.value[2]);

const sectors = computed(() => [
  {
    name: 'pink',
    rotation: 0,
    item: item2.value,
    iconPosition: geo.pinkSector.iconPosition,
  },
  {
    name: 'cyan',
    rotation: 120,
    item: item0.value,
    iconPosition: geo.cyanSector.iconPosition,
  },
  {
    name: 'orange',
    rotation: 240,
    item: item1.value,
    iconPosition: geo.orangeSector.iconPosition,
  },
]);

function getSectorFaceColor(sector: {
  name: string;
  item: IResolvedGearTriadItem;
}): string {
  if (!isShifted.value) {
    return sector.item.color;
  }

  const focusedSectorName =
    activeOptionIndex.value === 0
      ? 'cyan'
      : activeOptionIndex.value === 1
        ? 'orange'
        : 'pink';
  if (sector.name === focusedSectorName) {
    return sector.item.color;
  }

  return 'var(--alpha-gear-triad-muted-sector)';
}

function getSectorIconColor(sector: { name: string }): string {
  if (!isShifted.value) {
    return 'var(--alpha-gear-triad-icon)';
  }

  const focusedSectorName =
    activeOptionIndex.value === 0
      ? 'cyan'
      : activeOptionIndex.value === 1
        ? 'orange'
        : 'pink';
  if (sector.name === focusedSectorName) {
    return 'var(--alpha-gear-triad-icon)';
  }

  return 'var(--alpha-gear-triad-muted-icon)';
}

const rootRef = ref<HTMLElement | null>(null);

const { resolvedScale, containerHeight } = useDiagramAutoScale({
  rootRef,
  baseWidth: 960,
  baseHeight: 480,
  scale: () => props.scale,
  autoScale: () => props.autoScale,
  maxScale: () => props.maxScale,
  height: () => props.height,
});

const resolvedHeightStyle = computed(() => {
  if (props.height !== undefined) {
    return typeof props.height === 'number'
      ? `${props.height}px`
      : props.height;
  }

  if (containerHeight.value > 0) {
    return `${containerHeight.value}px`;
  }

  return '100%';
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad w-full flex flex-col items-center justify-center select-none font-sans',
);
</script>

<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      '--gear-start-delay': `${resolvedStartDelay}ms`,
      height: resolvedHeightStyle,
    }"
  >
    <!-- Auto-Scaled Stage -->
    <div
      class="alpha-gear-triad__scaler relative flex items-center justify-center origin-center transition-transform duration-200"
      :style="{
        width: '960px',
        height: '480px',
        transform: `scale(${resolvedScale})`,
      }"
    >
      <!-- Central Gear SVG Assembly -->
      <button
        type="button"
        class="alpha-gear-triad__diagram relative flex items-center justify-center w-135 h-120 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-transparent border-0 p-0 m-0 appearance-none"
        :disabled="!supportsClicks"
        aria-label="Advance gear diagram"
        :class="[
          { 'alpha-gear-triad__diagram--animated': isAnimated },
          supportsClicks ? 'cursor-pointer' : 'cursor-default',
        ]"
        :style="{
          transform: `translateX(${diagramTranslateX}px)`,
        }"
        @click="handleDiagramClick"
      >
        <!-- Rotating Wheel (simultaneously rotates while diagram translates) -->
        <div
          class="alpha-gear-triad__wheel relative w-135 h-120 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :style="{
            transformOrigin: `${geo.centerX}px ${geo.centerY}px`,
            transform: `rotate(${gearRotation}deg)`,
          }"
        >
          <svg
            aria-hidden="true"
            class="alpha-gear-triad__svg w-135 h-120 overflow-visible"
            :viewBox="`0 0 ${geo.viewBoxWidth} ${geo.viewBoxHeight}`"
          >
            <defs>
              <!-- Elevation Drop Shadow for Gear Assembly -->
              <filter
                id="alpha-gear-assembly-shadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="14"
                  flood-color="var(--alpha-gear-triad-shadow)"
                  flood-opacity="0.22"
                />
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="5"
                  flood-color="var(--alpha-gear-triad-shadow)"
                  flood-opacity="0.10"
                />
              </filter>
            </defs>
            <!-- Group containing all gear elements with overall elevation drop shadow -->
            <g
              filter="url(#alpha-gear-assembly-shadow)"
              class="alpha-gear-triad__assembly origin-center"
            >
              <!-- LAYER 1: Inter-Sector Valley Shapes Between the 3 Petals (Reused for all 3 Places) -->
              <path
                v-for="sector in sectors"
                :key="`valley-${sector.name}`"
                :d="geo.petal.valleyPath"
                :transform="`rotate(${sector.rotation}, ${geo.centerX}, ${geo.centerY})`"
                :fill="GEAR_TRIAD_BASE_COLOR"
                class="alpha-gear-triad__valley"
              />
              <!-- LAYER 2: Single Reusable Petal Surface Face Rotated for the 3 Sectors -->
              <g
                v-for="sector in sectors"
                :key="`petal-${sector.name}`"
                :transform="`rotate(${sector.rotation}, ${geo.centerX}, ${geo.centerY})`"
              >
                <path
                  :d="geo.petal.facePath"
                  :fill="getSectorFaceColor(sector)"
                  :class="`alpha-gear-triad__petal alpha-gear-triad__petal--${sector.name}`"
                  class="transition-colors duration-500 ease-out"
                />
              </g>
              <!-- LAYER 4: Outline Icons Stamped on the 3 Petals -->
              <foreignObject
                v-for="sector in sectors"
                v-show="sector.item.icon"
                :key="`icon-${sector.name}`"
                :x="sector.iconPosition.x - 17"
                :y="sector.iconPosition.y - 17"
                width="34"
                height="34"
                class="overflow-visible pointer-events-none select-none"
              >
                <div
                  class="w-full h-full flex items-center justify-center origin-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  :style="{
                    transform: `rotate(${-gearRotation}deg)`,
                  }"
                >
                  <GearTriadIcon
                    :icon="sector.item.icon"
                    :size="34"
                    :color="getSectorIconColor(sector)"
                    :stroke-width="2"
                  />
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
        <!-- LAYER 5: Center Floating Circular Hub -->
        <slot name="center">
          <GearTriadCenter
            :radius="geo.hubRadius"
            :icon="props.centerIcon"
            :icon-size="44"
            :class="{ 'alpha-gear-center--animated': isAnimated }"
            :style="{
              top: `${geo.centerY}px`,
              left: `${geo.centerX}px`,
            }"
          />
        </slot>
      </button>
      <!-- Surrounding callouts and their details -->
      <slot />
    </div>
  </div>
</template>

<style scoped>
.alpha-gear-triad__diagram--animated {
  animation: gear-triad-fade-in 700ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--gear-start-delay, 0ms)) backwards;
}

.alpha-gear-center--animated {
  animation: gear-center-pop-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1)
    calc(var(--gear-start-delay, 0ms) + 100ms) backwards;
}

@keyframes gear-triad-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes gear-center-pop-in {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
