---
hideInToc: true
---

# ArcDefenseInDepth

<div class="mt-4 flex items-center justify-center">
  <ArcDefenseInDepth>
    <ArcDefenseInDepthLayer>
      <ArcDefenseInDepthLayerHeading>Physical<br />controls</ArcDefenseInDepthLayerHeading>
      <ArcDefenseInDepthLayerPart>Data center biometric access</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Hardware security modules</ArcDefenseInDepthLayerPart>
    </ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayer>
      <ArcDefenseInDepthLayerHeading>Administrative<br />controls</ArcDefenseInDepthLayerHeading>
      <ArcDefenseInDepthLayerPart>Data retention policy</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Least-privilege audits</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Staff credential review</ArcDefenseInDepthLayerPart>
    </ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayer>
      <ArcDefenseInDepthLayerHeading>Technical<br />controls</ArcDefenseInDepthLayerHeading>
      <ArcDefenseInDepthLayerPart :span="22">Zero-trust Auth</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerSector :span="46" rotate="tangent">
        <ArcDefenseInDepthLayerPart position="top">mTLS Network</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">KMS Encryption</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerSector>
        <ArcDefenseInDepthLayerPart position="top">DDM Masking</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">Egress DLP</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerPart>Audit Trail</ArcDefenseInDepthLayerPart>
    </ArcDefenseInDepthLayer>
  </ArcDefenseInDepth>
</div>
