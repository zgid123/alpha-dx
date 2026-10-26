<script setup lang="ts">
import type { MotionVariants, Variant } from '@vueuse/motion';
import { computed, useSlots } from 'vue';

import SquareThanksContent from './SquareThanksContent.vue';

const { animation, color } = defineProps({
  animation: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: undefined,
  },
});

const slots = useSlots();

const hasExplicitContent = computed(() => {
  if (!slots.default) {
    return false;
  }

  const nodes = slots.default();
  return nodes.some((node) => {
    return (
      typeof node.type === 'object' &&
      node.type !== null &&
      'name' in node.type &&
      node.type.name === 'SquareThanksContent'
    );
  });
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
</script>

<template>
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
    class="alpha-square-thanks-decoration absolute w-37.5 h-37.5 rotate-45 top-[50%] left-[40%] z-10"
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
    class="alpha-square-thanks-decoration w-25 h-25 top-[20%] rotate-45 left-[48%] translate-x-[-50%] translate-y-[-50%] opacity-[0.4]"
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
    class="alpha-square-thanks-decoration w-25 h-25 top-[45%] rotate-45 left-[22%] translate-x-[-50%] translate-y-[-50%] opacity-[0.4]"
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
    class="alpha-square-thanks-decoration w-25 h-25 bottom-0 rotate-45 left-[48%] translate-x-[-50%] translate-y-[-50%] opacity-[0.4]"
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
    class="alpha-square-thanks-decoration w-30 h-30 rotate-45 top-[25%] left-[31%]"
  />
  <ThanksOutlineSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        ...begin,
        x: 0,
        y: 1_000,
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
    class="alpha-square-thanks-decoration w-17.5 h-17.5 rotate-45 top-[52%] left-[30%]"
  />
  <ThanksOutlineSquare
    v-motion
    v-bind="getMotionProps({
      initial: {
        ...begin,
        x: 1_000,
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
    class="alpha-square-thanks-decoration w-25 h-25 rotate-45 top-[42%] left-[43%]"
  />

  <slot v-if="hasExplicitContent" />
  <SquareThanksContent v-else :animation="animation" :color="color">
    <slot> Thank You<br>for your attention! </slot>
  </SquareThanksContent>
</template>
