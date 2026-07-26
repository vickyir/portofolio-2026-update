// PLACEHOLDER CONTENT — adjust these to the services actually offered.
// Tracked in docs/PRODUCT.md Open Questions #3.

export type Capability = {
  title: string;
  body: string;
  tags: string[];
};

export const capabilities: Capability[] = [
  {
    title: "iOS Development",
    body: "Production SwiftUI and UIKit apps, from a single feature inside an existing codebase to a full build.",
    tags: ["SwiftUI", "UIKit"],
  },
  {
    title: "visionOS & Spatial",
    body: "Spatial interfaces and prototypes in RealityKit — built for people doing a job, not for the demo reel.",
    tags: ["visionOS", "RealityKit"],
  },
  {
    title: "Custom Integrations",
    body: "HealthKit, StoreKit, Bluetooth peripherals, and the offline sync layers that keep them honest.",
    tags: ["HealthKit", "StoreKit"],
  },
  {
    title: "Motion & Interaction",
    body: "Interface motion that explains what just happened, with reduced-motion handled as a requirement.",
    tags: ["Animation", "Haptics"],
  },
  {
    title: "Performance",
    body: "Instruments profiling, scroll and launch-time work, and finding the retain cycle nobody wants to look for.",
    tags: ["Instruments", "Profiling"],
  },
  {
    title: "Accessibility & Release",
    body: "VoiceOver and Dynamic Type support, plus App Store submission and the review round-trips that follow.",
    tags: ["VoiceOver", "App Store"],
  },
];
