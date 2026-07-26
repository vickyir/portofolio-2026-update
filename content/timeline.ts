// PLACEHOLDER CONTENT — this career timeline is invented to fill out the layout.
// Replace with real dates and milestones. Tracked in docs/PRODUCT.md Open Questions #3.

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export const timeline: Milestone[] = [
  {
    year: "2019",
    title: "First lines of Swift",
    body: "Started building small utility apps to learn the platform properly, shipping the first one to the App Store six months in.",
  },
  {
    year: "2020",
    title: "First freelance client",
    body: "Took on a contract rebuilding a small business app, and learned that scoping is most of the job.",
  },
  {
    year: "2021",
    title: "Going deeper on SwiftUI",
    body: "Rewrote a production UIKit codebase in SwiftUI and started caring seriously about accessibility and Dynamic Type.",
  },
  {
    year: "2022",
    title: "Larger teams, larger codebases",
    body: "Joined longer engagements with established iOS teams, working inside architectures I didn't pick and learning to leave them better.",
  },
  {
    year: "2023",
    title: "Spatial computing",
    body: "Started prototyping on visionOS the week the SDK shipped, betting that early depth in a new platform would be worth more than breadth.",
  },
  {
    year: "2024",
    title: "Enterprise training tools",
    body: "Focused on the intersection I care about most — spatial interfaces for people doing real work, not demos.",
  },
  {
    year: "2026",
    title: "The work continues",
    body: "Taking on iOS and visionOS engagements where the hard part is the interaction, not the CRUD.",
  },
];
