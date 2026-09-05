import type { ComputedRef, InjectionKey } from 'vue';

import type { IQuadHubItem, IResolvedQuadHubItem } from './resolveQuadHubItems';

export interface IQuadHubRegistration {
  readonly index: number;
  readonly item: ComputedRef<IResolvedQuadHubItem>;
  readonly setCustomBadge?: (text: string | number) => void;
}

export interface IQuadHubRootContext {
  readonly animation?: ComputedRef<boolean>;
  readonly registerCallout: (props?: IQuadHubItem) => IQuadHubRegistration;
  readonly items: ComputedRef<readonly IResolvedQuadHubItem[]>;
}

export interface IQuadHubCalloutContext {
  readonly index: number;
  readonly item: ComputedRef<IResolvedQuadHubItem>;
}

export const QUAD_HUB_ROOT_KEY: InjectionKey<IQuadHubRootContext> =
  Symbol('QUAD_HUB_ROOT_KEY');

export const QUAD_HUB_CALLOUT_KEY: InjectionKey<IQuadHubCalloutContext> =
  Symbol('QUAD_HUB_CALLOUT_KEY');
