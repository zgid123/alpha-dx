/// <reference types="vitepress/client" />

declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const component: ComponentOptions;
  export default component;
}

declare module 'virtual:uno.css' {}

declare module '*.css' {}
