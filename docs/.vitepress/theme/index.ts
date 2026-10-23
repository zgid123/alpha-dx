import '@alphacifer/slidev-addon-theme/style.css';
import '@alphacifer/slidev-academic-theme/style.css';
import HorizontalCardBadge from '@alphacifer/slidev-addon-theme/components/card/horizontal-card/HorizontalCardBadge.vue';
import HorizontalCardIcon from '@alphacifer/slidev-addon-theme/components/card/horizontal-card/HorizontalCardIcon.vue';
import VerticalCardBadge from '@alphacifer/slidev-addon-theme/components/card/vertical-card/VerticalCardBadge.vue';
import VerticalCardIcon from '@alphacifer/slidev-addon-theme/components/card/vertical-card/VerticalCardIcon.vue';
import DateComponent from '@alphacifer/slidev-addon-theme/components/core/Date.vue';
import MetaList from '@alphacifer/slidev-addon-theme/components/core/MetaList.vue';
import TransitionHeading from '@alphacifer/slidev-addon-theme/components/core/TransitionHeading.vue';
import SquareThanks from '@alphacifer/slidev-addon-theme/components/core/thanks/SquareThanks.vue';
import ThanksOutlineSquare from '@alphacifer/slidev-addon-theme/components/core/thanks/ThanksOutlineSquare.vue';
import ThanksSquare from '@alphacifer/slidev-addon-theme/components/core/thanks/ThanksSquare.vue';
import HexagonTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadCallout.vue';
import HexagonTriadCenterBadge from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadCenterBadge.vue';
import HexagonTriadLayer from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadLayer.vue';
import { MotionPlugin } from '@vueuse/motion';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'virtual:uno.css';

// Defense in Depth
import ArcDefenseInDepth from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepth.vue';
import ArcDefenseInDepthLayer from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayer.vue';
import ArcDefenseInDepthLayerHeading from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayerHeading.vue';
import ArcDefenseInDepthLayerPart from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayerPart.vue';
import CircularPyramid from '@alphacifer/slidev-addon-theme/components/pyramid/circular-pyramid/CircularPyramid.vue';
import CircularPyramidStack from '@alphacifer/slidev-addon-theme/components/pyramid/circular-pyramid/CircularPyramidStack.vue';
import CircularPyramidStackContent from '@alphacifer/slidev-addon-theme/components/pyramid/circular-pyramid/CircularPyramidStackContent.vue';
import CircularPyramidStackHeading from '@alphacifer/slidev-addon-theme/components/pyramid/circular-pyramid/CircularPyramidStackHeading.vue';
import SquarePyramid from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramid.vue';
import SquarePyramidStack from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramidStack.vue';
import SquarePyramidStackContent from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramidStackContent.vue';
import SquarePyramidStackHeading from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramidStackHeading.vue';

// Cards
import ChevronCardDemo from './components/card/ChevronCardDemo.vue';
import HorizontalCardDemo from './components/card/HorizontalCardDemo.vue';
import VerticalCardDemo from './components/card/VerticalCardDemo.vue';
// Common
import RouterLinkShim from './components/common/RouterLinkShim.vue';
import SlidevMockup from './components/common/SlidevMockup.vue';
import TocPreview from './components/common/TocPreview.vue';
// Comparisons
import ArcComparisonDemo from './components/comparisons/ArcComparisonDemo.vue';
import TableComparisonDemo from './components/comparisons/TableComparisonDemo.vue';
// Core
import ArcOrbitDemo from './components/core/ArcOrbitDemo.vue';
import DateDemo from './components/core/DateDemo.vue';
import DesignSystemDemo from './components/core/DesignSystemDemo.vue';
import MetaListDemo from './components/core/MetaListDemo.vue';
import QnADemo from './components/core/QnADemo.vue';
import QuoteDemo from './components/core/QuoteDemo.vue';
import ReflectedTitleDemo from './components/core/ReflectedTitleDemo.vue';
import SpeakerDemo from './components/core/SpeakerDemo.vue';
import ThanksDemo from './components/core/ThanksDemo.vue';
import TransitionHeadingDemo from './components/core/TransitionHeadingDemo.vue';
import ArcDefenseInDepthDemo from './components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthDemo.vue';
import RectangleOrbitTetradDemo from './components/facets/tetrad/RectangleOrbitTetradDemo.vue';
// Facets
import ArrowTriadDemo from './components/facets/triad/ArrowTriadDemo.vue';
import GearTriadDemo from './components/facets/triad/GearTriadDemo.vue';
import GearTriadDetailsDemo from './components/facets/triad/GearTriadDetailsDemo.vue';
import HexagonTriadDemo from './components/facets/triad/HexagonTriadDemo.vue';
import LayoutDemo from './components/layouts/LayoutDemo.vue';
// Process
import ArcArrowProcessDemo from './components/process/ArcArrowProcessDemo.vue';
// Pyramid
import CircularPyramidDemo from './components/pyramid/circular-pyramid/CircularPyramidDemo.vue';
import SquarePyramidDemo from './components/pyramid/square-pyramid/SquarePyramidDemo.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(MotionPlugin as unknown as Parameters<typeof app.use>[0]);

    // Slidev runtime support directives and builtins
    app.directive('click', () => {});
    app.component('RouterLink', RouterLinkShim);
    app.component('Toc', TocPreview);

    // Core Components
    app.component('Date', DateComponent);
    app.component('MetaList', MetaList);
    app.component('TransitionHeading', TransitionHeading);
    app.component('SquareThanks', SquareThanks);

    // Slidev Addon Components
    app.component('HorizontalCardBadge', HorizontalCardBadge);
    app.component('HorizontalCardIcon', HorizontalCardIcon);
    app.component('VerticalCardBadge', VerticalCardBadge);
    app.component('VerticalCardIcon', VerticalCardIcon);
    app.component('HexagonTriadCallout', HexagonTriadCallout);
    app.component('HexagonTriadCenterBadge', HexagonTriadCenterBadge);
    app.component('HexagonTriadLayer', HexagonTriadLayer);
    app.component('ThanksSquare', ThanksSquare);
    app.component('ThanksOutlineSquare', ThanksOutlineSquare);

    // Common & Layouts
    app.component('SlidevMockup', SlidevMockup);
    app.component('LayoutDemo', LayoutDemo);

    // Core Demos
    app.component('DesignSystemDemo', DesignSystemDemo);
    app.component('ArcOrbitDemo', ArcOrbitDemo);
    app.component('SpeakerDemo', SpeakerDemo);
    app.component('MetaListDemo', MetaListDemo);
    app.component('DateDemo', DateDemo);
    app.component('QuoteDemo', QuoteDemo);
    app.component('ReflectedTitleDemo', ReflectedTitleDemo);
    app.component('QnADemo', QnADemo);
    app.component('TransitionHeadingDemo', TransitionHeadingDemo);
    app.component('ThanksDemo', ThanksDemo);

    // Facet Demos
    app.component('ArrowTriadDemo', ArrowTriadDemo);
    app.component('GearTriadDemo', GearTriadDemo);
    app.component('GearTriadDetailsDemo', GearTriadDetailsDemo);
    app.component('HexagonTriadDemo', HexagonTriadDemo);
    app.component('RectangleOrbitTetradDemo', RectangleOrbitTetradDemo);

    // Process Demos
    app.component('ArcArrowProcessDemo', ArcArrowProcessDemo);

    // Comparison Demos
    app.component('ArcComparisonDemo', ArcComparisonDemo);
    app.component('TableComparisonDemo', TableComparisonDemo);

    // Card Demos
    app.component('HorizontalCardDemo', HorizontalCardDemo);
    app.component('VerticalCardDemo', VerticalCardDemo);
    app.component('ChevronCardDemo', ChevronCardDemo);

    // Pyramid Components & Demo
    app.component('CircularPyramid', CircularPyramid);
    app.component('CircularPyramidStack', CircularPyramidStack);
    app.component('CircularPyramidStackHeading', CircularPyramidStackHeading);
    app.component('CircularPyramidStackContent', CircularPyramidStackContent);
    app.component('CircularPyramidDemo', CircularPyramidDemo);

    app.component('SquarePyramid', SquarePyramid);
    app.component('SquarePyramidStack', SquarePyramidStack);
    app.component('SquarePyramidStackHeading', SquarePyramidStackHeading);
    app.component('SquarePyramidStackContent', SquarePyramidStackContent);
    app.component('SquarePyramidDemo', SquarePyramidDemo);

    // Defense in Depth Components & Demo
    app.component('ArcDefenseInDepth', ArcDefenseInDepth);
    app.component('ArcDefenseInDepthLayer', ArcDefenseInDepthLayer);
    app.component(
      'ArcDefenseInDepthLayerHeading',
      ArcDefenseInDepthLayerHeading,
    );
    app.component('ArcDefenseInDepthLayerPart', ArcDefenseInDepthLayerPart);
    app.component('ArcDefenseInDepthDemo', ArcDefenseInDepthDemo);
  },
} satisfies Theme;
