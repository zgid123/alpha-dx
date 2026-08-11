<script setup lang="ts">
import type { MotionVariants, Variant } from '@vueuse/motion';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { animation } = defineProps({
  animation: {
    type: Boolean,
    default: true,
  },
});

const begin = {
  scale: 1.5,
  rotate: -50,
};

const final = {
  scale: 1,
  rotate: 45,
  translateX: '-50%',
  translateY: '-50%',
  transition: {
    mass: 4,
    damping: 10,
    stiffness: 20,
    type: 'spring',
  },
};

interface IGetMotionPropsParams {
  enter: Variant;
  initial: Variant;
}

const getMotionProps = ({
  enter,
  initial,
}: IGetMotionPropsParams): MotionVariants<string> => {
  if (!animation) {
    const state = {
      ...enter,
      transition: {
        duration: 0,
      },
    };

    return {
      enter: state,
      initial: state,
    };
  }

  return {
    enter,
    initial,
  };
};

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'slidev-addon-thanks-content relative h-full w-full',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <ThanksSquare
    v-motion
    v-bind="getMotionProps({
      enter: {
        ...final,
        x: -78,
        y: 30,
      },
      initial: {
        ...begin,
        x: 900,
        y: -100,
      },
    })"
    class="absolute w-[150px] h-[150px] rotate-45 top-[50%] left-[40%] z-10"
    />
    <ThanksSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        y: -150,
        opacity: 0,
      },
      enter:{
        x: -50,
        y: -60,
        rotate: 45,
        opacity: 0.4,
        transition: {
          delay: 2_500,
          duration: 700,
        }
      },
    })"
    class="w-[100px] h-[100px] top-[20%] rotate-45 left-[48%] translate-x-[-50%] translate-y-[-50%] opacity-[0.4]"
    />
    <ThanksSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        x: -150,
        opacity: 0,
      },
      enter: {
        x: -50,
        y: -65,
        rotate: 45,
        opacity: 0.4,
        transition: {
          delay: 2_500,
          duration: 700,
        }
      },
    })"
    class="w-[100px] h-[100px] top-[45%] rotate-45 left-[22%] translate-x-[-50%] translate-y-[-50%] opacity-[0.4]"
    />
    <ThanksSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        y: 150,
        opacity: 0,
      },
      enter: {
        x: -50,
        y: -45,
        rotate: 45,
        opacity: 0.4,
        transition: {
          delay: 2_500,
          duration: 700,
        }
      },
    })"
    class="w-[100px] h-[100px] bottom-0 rotate-45 left-[48%] translate-x-[-50%] translate-y-[-50%] opacity-[0.4]"
    />
    <ThanksOutlineSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        ...begin,
        x: 0,
        y: -1000,
      },
      enter: {
        ...final,
        x: -2,
        y: 72,
        transition: {
          delay: 700,
          duration: 2_000,
        },
      },
    })"
    class="w-[120px] h-[120px] rotate-45 top-[25%] left-[31%]"
    />
    <ThanksOutlineSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        ...begin,
        x: 0,
        y: 1000,
      },
      enter: {
        ...final,
        x: -3,
        y: 45,
        transition: {
          delay: 700,
          duration: 2_000,
        },
      },
    })"
    class="w-[70px] h-[70px] rotate-45 top-[52%] left-[30%]"
    />
    <ThanksOutlineSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        ...begin,
        x: 1000,
        y: 200,
      },
      enter: {
        ...final,
        x: -2,
        y: 72,
        transition: {
          delay: 700,
          duration: 2_000,
        },
      },
    })"
    class="w-[100px] h-[100px] rotate-45 top-[42%] left-[43%]"
    />

    <div
      v-motion
      v-bind="getMotionProps({
        initial: {
          x: -80,
          opacity: 0,
        },
        enter: {
          x: -130,
          y: -46,
          opacity: 1,
          transition: {
            delay: 2_800,
            duration: 1_000,
          }
        },
      })"
      class="color-[#2b90b6] text-3xl absolute top-[50%] left-[69%] translate-x-[-50%] translate-y-[-50%]"
    >
      Thank You
      <br />
      for your attention!
    </div>
  </div>
</template>
