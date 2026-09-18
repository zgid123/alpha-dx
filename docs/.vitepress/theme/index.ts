import DateComponent from '@alphacifer/slidev-addon-theme/components/core/Date.vue';
import Speaker from '@alphacifer/slidev-addon-theme/components/core/Speaker.vue';
import HexTriadCallout from '@alphacifer/slidev-addon-theme/components/hex-triad/HexTriadCallout.vue';
import HexTriadCenterBadge from '@alphacifer/slidev-addon-theme/components/hex-triad/HexTriadCenterBadge.vue';
import HexTriadLayer from '@alphacifer/slidev-addon-theme/components/hex-triad/HexTriadLayer.vue';
import ThanksOutlineSquare from '@alphacifer/slidev-addon-theme/components/thanks/ThanksOutlineSquare.vue';
import ThanksSquare from '@alphacifer/slidev-addon-theme/components/thanks/ThanksSquare.vue';
import { MotionPlugin } from '@vueuse/motion';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import ArcArrowProcessDemo from './components/ArcArrowProcessDemo.vue';
import ArcCompareDemo from './components/ArcCompareDemo.vue';
import ArrowTriadDemo from './components/ArrowTriadDemo.vue';
import ChevronCardDemo from './components/ChevronCardDemo.vue';
import ComparisonTableDemo from './components/ComparisonTableDemo.vue';
import DateDemo from './components/DateDemo.vue';
import HexTriadDemo from './components/HexTriadDemo.vue';
import HorizCardDemo from './components/HorizCardDemo.vue';
import QnADemo from './components/QnADemo.vue';
import QuadHubDemo from './components/QuadHubDemo.vue';
import QuoteDemo from './components/QuoteDemo.vue';
import ReflectedTitleDemo from './components/ReflectedTitleDemo.vue';
import SlidevMockup from './components/SlidevMockup.vue';
import SpeakerDemo from './components/SpeakerDemo.vue';
import ThanksDemo from './components/ThanksDemo.vue';
import TransitionHeadingDemo from './components/TransitionHeadingDemo.vue';
import VertCardDemo from './components/VertCardDemo.vue';

import '@alphacifer/slidev-academic-theme/style.css';
import 'virtual:uno.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(MotionPlugin as Parameters<typeof app.use>[0]);

    // Core Components
    app.component('Date', DateComponent);
    app.component('Speaker', Speaker);

    // Slidev Addon Components
    app.component('HexTriadCallout', HexTriadCallout);
    app.component('HexTriadCenterBadge', HexTriadCenterBadge);
    app.component('HexTriadLayer', HexTriadLayer);
    app.component('ThanksSquare', ThanksSquare);
    app.component('ThanksOutlineSquare', ThanksOutlineSquare);

    // Demos
    app.component('SlidevMockup', SlidevMockup);
    app.component('SpeakerDemo', SpeakerDemo);
    app.component('DateDemo', DateDemo);
    app.component('QuoteDemo', QuoteDemo);
    app.component('ReflectedTitleDemo', ReflectedTitleDemo);
    app.component('QnADemo', QnADemo);
    app.component('TransitionHeadingDemo', TransitionHeadingDemo);
    app.component('ThanksDemo', ThanksDemo);
    app.component('HorizCardDemo', HorizCardDemo);
    app.component('VertCardDemo', VertCardDemo);
    app.component('ChevronCardDemo', ChevronCardDemo);
    app.component('HexTriadDemo', HexTriadDemo);
    app.component('ArrowTriadDemo', ArrowTriadDemo);
    app.component('QuadHubDemo', QuadHubDemo);
    app.component('ArcCompareDemo', ArcCompareDemo);
    app.component('ArcArrowProcessDemo', ArcArrowProcessDemo);
    app.component('ComparisonTableDemo', ComparisonTableDemo);
  },
} satisfies Theme;
