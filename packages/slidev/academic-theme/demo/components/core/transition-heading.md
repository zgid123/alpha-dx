---
hideInToc: true
clicks: 1
---

<TransitionHeading :center="$clicks === 0">
  <h1>TransitionHeading</h1>
</TransitionHeading>

<div
  class="mt-28 transition-opacity duration-500"
  :class="$clicks === 0 ? 'opacity-0' : 'opacity-100'"
>
  <p class="text-lg text-slate-700">
    Smoothly animates the slide heading from centered presentation mode to standard title position upon advance.
  </p>

  <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="font-bold text-slate-800 mb-2">Stage Progression</div>
    <div class="text-sm text-slate-600">
      Click 0: Centers heading for strong presentation opening.<br>
      Click 1: Glides title upward to reveal body text, diagrams, and supporting evidence.
    </div>
  </div>
</div>
