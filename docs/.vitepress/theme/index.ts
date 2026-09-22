import '@alphacifer/slidev-academic-theme/style.css';
import DateComponent from '@alphacifer/slidev-addon-theme/components/core/Date.vue';
import ThanksOutlineSquare from '@alphacifer/slidev-addon-theme/components/core/thanks/ThanksOutlineSquare.vue';
import ThanksSquare from '@alphacifer/slidev-addon-theme/components/core/thanks/ThanksSquare.vue';
import HexTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadCallout.vue';
import HexTriadCenterBadge from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadCenterBadge.vue';
import HexTriadLayer from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadLayer.vue';
import { MotionPlugin } from '@vueuse/motion';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'virtual:uno.css';

// Cards
import ChevronCardDemo from './components/card/ChevronCardDemo.vue';
import HorizCardDemo from './components/card/HorizCardDemo.vue';
import VertCardDemo from './components/card/VertCardDemo.vue';
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
import QnADemo from './components/core/QnADemo.vue';
import QuoteDemo from './components/core/QuoteDemo.vue';
import ReflectedTitleDemo from './components/core/ReflectedTitleDemo.vue';
import SpeakerDemo from './components/core/SpeakerDemo.vue';
import ThanksDemo from './components/core/ThanksDemo.vue';
import TransitionHeadingDemo from './components/core/TransitionHeadingDemo.vue';
import RectOrbitTetradDemo from './components/facets/tetrad/RectOrbitTetradDemo.vue';
// Facets
import ArrowTriadDemo from './components/facets/triad/ArrowTriadDemo.vue';
import GearTriadContentsDemo from './components/facets/triad/GearTriadContentsDemo.vue';
import GearTriadDemo from './components/facets/triad/GearTriadDemo.vue';
import HexTriadDemo from './components/facets/triad/HexTriadDemo.vue';
// Layouts
import LayoutDemo from './components/layouts/LayoutDemo.vue';
// Process
import ArcArrowProcessDemo from './components/process/ArcArrowProcessDemo.vue';
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

    // Slidev Addon Components
    app.component('HexTriadCallout', HexTriadCallout);
    app.component('HexTriadCenterBadge', HexTriadCenterBadge);
    app.component('HexTriadLayer', HexTriadLayer);
    app.component('ThanksSquare', ThanksSquare);
    app.component('ThanksOutlineSquare', ThanksOutlineSquare);

    // Common & Layouts
    app.component('SlidevMockup', SlidevMockup);
    app.component('LayoutDemo', LayoutDemo);

    // Core Demos
    app.component('ArcOrbitDemo', ArcOrbitDemo);
    app.component('SpeakerDemo', SpeakerDemo);
    app.component('DateDemo', DateDemo);
    app.component('QuoteDemo', QuoteDemo);
    app.component('ReflectedTitleDemo', ReflectedTitleDemo);
    app.component('QnADemo', QnADemo);
    app.component('TransitionHeadingDemo', TransitionHeadingDemo);
    app.component('ThanksDemo', ThanksDemo);

    // Facet Demos
    app.component('ArrowTriadDemo', ArrowTriadDemo);
    app.component('GearTriadDemo', GearTriadDemo);
    app.component('GearTriadContentsDemo', GearTriadContentsDemo);
    app.component('HexTriadDemo', HexTriadDemo);
    app.component('RectOrbitTetradDemo', RectOrbitTetradDemo);

    // Process Demos
    app.component('ArcArrowProcessDemo', ArcArrowProcessDemo);

    // Comparison Demos
    app.component('ArcComparisonDemo', ArcComparisonDemo);
    app.component('TableComparisonDemo', TableComparisonDemo);

    // Card Demos
    app.component('HorizCardDemo', HorizCardDemo);
    app.component('VertCardDemo', VertCardDemo);
    app.component('ChevronCardDemo', ChevronCardDemo);
  },
} satisfies Theme;
