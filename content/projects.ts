// PLACEHOLDER CONTENT — every entry below is invented from a project name only, not
// real client work. Replace all of it (client, role, stack, outcome, metrics) before
// this site goes anywhere near a recruiter or client.
// Tracked in docs/PRODUCT.md Open Questions #3.

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  tags: string[];
  problem: string;
  outcome: string;
  image?: string;
  type: "case-study" | "engagement";
};

export const projects: Project[] = [
  {
    slug: "aerosim",
    title: "AeroSim",
    summary:
      "A visionOS companion that gives flight-sim instructors live session data without leaving the training bay.",
    role: "Sole iOS/visionOS engineer",
    stack: ["visionOS", "SwiftUI", "RealityKit", "TCA", "Swift Concurrency"],
    tags: ["visionOS", "RealityKit", "Spatial"],
    problem:
      "Instructors ran debriefs from memory and a paper checklist right after a sim session — small, recoverable errors went unrecorded by the time the trainee sat down to review them.",
    outcome:
      "Shipped a spatial companion instructors wear during the session and reference during debrief, cutting debrief prep time and giving trainees a reviewable session timeline.",
    type: "case-study",
  },
  {
    slug: "eduone",
    title: "EduOne",
    summary:
      "An iOS learning app that keeps course progress in sync for students on unreliable connections.",
    role: "Freelance iOS engineer",
    stack: ["iOS", "SwiftUI", "Combine", "REST", "Offline sync"],
    tags: ["iOS", "Offline", "Sync"],
    problem:
      "Students in the provider's target regions frequently lost connectivity mid-lesson, and progress recorded locally didn't reliably reconcile once they were back online.",
    outcome:
      "Built the offline-first progress sync layer and core course-delivery UI, reducing progress-loss complaints and unlocking launch in lower-connectivity markets.",
    type: "case-study",
  },
  {
    slug: "atlas-field",
    title: "Atlas Field",
    summary:
      "An offline-capable inspection tool for survey crews working sites with no signal.",
    role: "Lead iOS engineer",
    stack: ["iOS", "SwiftUI", "SwiftData", "MapKit", "Background tasks"],
    tags: ["iOS", "SwiftData", "MapKit"],
    problem:
      "Field crews captured inspection data on paper and re-entered it back at the office, introducing a full day of lag and transcription errors on every job.",
    outcome:
      "Replaced the paper flow with an offline-first capture app that syncs when signal returns, removing the re-entry step entirely.",
    type: "case-study",
  },
  {
    slug: "northwind-health",
    title: "Northwind Health",
    summary:
      "A patient-facing companion app for a regional clinic network, built for accessibility first.",
    role: "iOS engineer, accessibility lead",
    stack: ["iOS", "SwiftUI", "HealthKit", "Dynamic Type", "VoiceOver"],
    tags: ["iOS", "HealthKit", "Accessibility"],
    problem:
      "The clinic's existing app failed basic VoiceOver navigation, cutting off a meaningful share of the patient population from booking and results.",
    outcome:
      "Rebuilt the core flows against full VoiceOver and Dynamic Type support, then established the accessibility review checklist the team still uses.",
    type: "case-study",
  },
  {
    slug: "cadence",
    title: "Cadence",
    summary:
      "A focus-timer app with a widget and Live Activity that stays honest about your day.",
    role: "Solo designer & engineer",
    stack: ["iOS", "SwiftUI", "WidgetKit", "ActivityKit", "App Intents"],
    tags: ["iOS", "WidgetKit", "Live Activity"],
    problem:
      "Existing focus timers buried the session state inside the app, so users lost track the moment they switched away.",
    outcome:
      "Shipped a Live Activity and Lock Screen widget that keep session state glanceable, which became the app's most-cited App Store review feature.",
    type: "case-study",
  },
  {
    slug: "harbor-retail",
    title: "Harbor Retail",
    summary:
      "An iPad point-of-sale rebuild for a specialty retail chain moving off legacy hardware.",
    role: "Contract iOS engineer",
    stack: ["iPadOS", "SwiftUI", "Core Data", "StoreKit", "Bluetooth"],
    tags: ["iPadOS", "Core Data", "POS"],
    problem:
      "Store staff worked around a decade-old POS terminal whose checkout flow required twelve taps for a standard sale.",
    outcome:
      "Delivered an iPad replacement that cut a standard sale to four taps and kept working through the store's frequent Wi-Fi drops.",
    type: "case-study",
  },
  {
    slug: "orbit-studio",
    title: "Orbit Studio",
    summary:
      "A spatial product-configurator prototype letting buyers place furniture at true scale.",
    role: "visionOS prototype engineer",
    stack: ["visionOS", "RealityKit", "USDZ", "SwiftUI", "Reality Composer"],
    tags: ["visionOS", "RealityKit", "3D"],
    problem:
      "The client's 2D configurator couldn't answer the one question buyers actually had — whether the piece fits the room they're standing in.",
    outcome:
      "Built a spatial prototype that places true-scale models in the buyer's own space, which the client used to greenlight a full production build.",
    type: "case-study",
  },
  {
    slug: "signal-desk",
    title: "Signal Desk",
    summary:
      "A macOS menu-bar client that surfaces on-call alerts without another browser tab.",
    role: "Solo engineer",
    stack: ["macOS", "SwiftUI", "AppKit", "Keychain", "WebSockets"],
    tags: ["macOS", "SwiftUI", "Realtime"],
    problem:
      "On-call engineers missed alerts buried in a browser tab behind fifteen others, and the web client had no native notification story.",
    outcome:
      "Shipped a lightweight menu-bar client with native notifications, adopted across the client's engineering org within a quarter.",
    type: "case-study",
  },
  {
    slug: "selected-engagements",
    title: "Selected Engagements",
    summary:
      "Shorter iOS and visionOS contracts — utility apps, spatial prototypes, and App Store release work.",
    role: "Freelance contractor, various clients",
    stack: ["iOS", "visionOS", "SwiftUI", "RealityKit"],
    tags: ["iOS", "visionOS", "Contract"],
    problem:
      "Small teams and early-stage founders needed a specific iOS/visionOS feature or app shipped without hiring a full-time engineer.",
    outcome:
      "Delivered scoped, shipped features and small apps across several short engagements — details available on request.",
    type: "engagement",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
