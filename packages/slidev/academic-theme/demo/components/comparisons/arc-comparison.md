---
hideInToc: true
---

# ArcComparison

<div class="mt-4 flex items-center justify-center">
  <ArcComparison :count="3">
    <ArcComparisonLeft color="#0e7490">
      <template #title>Monolithic Design</template>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Unified Deploy</ArcComparisonHeading>
        <ArcComparisonContent>Single artifact deployment with unified shared database.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Simple Traces</ArcComparisonHeading>
        <ArcComparisonContent>Synchronous in-memory function call traces.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Coupling Risk</ArcComparisonHeading>
        <ArcComparisonContent>Shared state risks cascading component regressions.</ArcComparisonContent>
      </ArcComparisonOrbit>
    </ArcComparisonLeft>
    <ArcComparisonRight color="#0284c7">
      <template #title>Microservices</template>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Bounded Context</ArcComparisonHeading>
        <ArcComparisonContent>Domain services communicate over explicit event contracts.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Elastic Scale</ArcComparisonHeading>
        <ArcComparisonContent>Independent horizontal scaling per bottleneck domain.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Fault Isolation</ArcComparisonHeading>
        <ArcComparisonContent>Failure in one node remains localized without domino crash.</ArcComparisonContent>
      </ArcComparisonOrbit>
    </ArcComparisonRight>
  </ArcComparison>
</div>

---
hideInToc: true
---

# ArcComparison (4 Points)

<div class="mt-4 flex items-center justify-center">
  <ArcComparison :count="4">
    <ArcComparisonLeft :count="4" color="#0e7490">
      <template #title>Baseline Model</template>
      <ArcComparisonOrbit :index="0">
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Inference Latency</ArcComparisonHeading>
        <ArcComparisonContent>Sequential token processing incurs quadratic latency overhead.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="1">
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Memory Footprint</ArcComparisonHeading>
        <ArcComparisonContent>Requires extensive GPU VRAM allocations for key-value caches.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="2">
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Brittle Gradients</ArcComparisonHeading>
        <ArcComparisonContent>Susceptible to vanishing gradients across deep layer stacks.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="3">
        <ArcComparisonBadge>04</ArcComparisonBadge>
        <ArcComparisonHeading>Scaling Bottleneck</ArcComparisonHeading>
        <ArcComparisonContent>Full cross-attention limits effective context length scaling.</ArcComparisonContent>
      </ArcComparisonOrbit>
    </ArcComparisonLeft>
    <ArcComparisonRight :count="4" color="#0284c7">
      <template #title>Proposed Method</template>
      <ArcComparisonOrbit :index="0">
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Sub-linear Time</ArcComparisonHeading>
        <ArcComparisonContent>Parallelized sparse kernel execution achieves 3.8x speedup.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="1">
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Compact Cache</ArcComparisonHeading>
        <ArcComparisonContent>Quantized state representations reduce memory footprint by 4x.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="2">
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Stable Dynamics</ArcComparisonHeading>
        <ArcComparisonContent>Residual RMS normalization guarantees uniform gradient flows.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit :index="3">
        <ArcComparisonBadge>04</ArcComparisonBadge>
        <ArcComparisonHeading>Linear Complexity</ArcComparisonHeading>
        <ArcComparisonContent>Selective state-space projections scale to 128k context windows.</ArcComparisonContent>
      </ArcComparisonOrbit>
    </ArcComparisonRight>
  </ArcComparison>
</div>

---
clicks: 1
hideInToc: true
---

# ArcComparison (Layout Mode)

<div class="mt-4 flex items-center justify-center">
  <ArcComparison as="layout" :moved="$clicks > 0">
    <ArcComparisonLeft color="#0e7490">
      <template #title>Monolithic Design</template>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Unified Deploy</ArcComparisonHeading>
        <ArcComparisonContent>Single artifact deployment with unified shared database.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Simple Traces</ArcComparisonHeading>
        <ArcComparisonContent>Synchronous in-memory function call traces.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Coupling Risk</ArcComparisonHeading>
        <ArcComparisonContent>Shared state risks cascading component regressions.</ArcComparisonContent>
      </ArcComparisonOrbit>
    </ArcComparisonLeft>
    <ArcComparisonRight color="#0284c7">
      <template #title>Microservices</template>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Bounded Context</ArcComparisonHeading>
        <ArcComparisonContent>Domain services communicate over explicit event contracts.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Elastic Scale</ArcComparisonHeading>
        <ArcComparisonContent>Independent horizontal scaling per bottleneck domain.</ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Fault Isolation</ArcComparisonHeading>
        <ArcComparisonContent>Failure in one node remains localized without domino crash.</ArcComparisonContent>
      </ArcComparisonOrbit>
    </ArcComparisonRight>
  </ArcComparison>
</div>
