/**
 * Project content for the bookshelf.
 *
 * Everything here is editable — refine the copy, add screenshots, and fill in
 * the links once they exist. Nothing in this file is invented: fields that are
 * not available yet are `null` and the interface renders a clear placeholder
 * instead of a fake URL or a claim.
 */

export type ProjectId = "reroute" | "injectmenot" | "futurepath";

export type ProjectLink = { label: string; href: string } | null;

export type Project = {
  id: ProjectId;
  number: string;
  title: string;
  kicker: string;
  tagline: string;
  overview: string;
  problem: string;
  objective: string;
  role: string;
  stack: string[];
  features: string[];
  architecture: { title: string; detail: string }[];
  challenges: string[];
  learnings: string[];
  /** Add image files to public/images/projects/ and reference them here. */
  screenshots: { src: string | null; caption: string }[];
  github: ProjectLink;
  demo: ProjectLink;
  status: string;
};

export const projects: Project[] = [
  {
    id: "reroute",
    number: "01",
    title: "ReRoute",
    kicker: "Circular economy · AI-assisted decisioning",
    tagline:
      "Give an unwanted object a second life instead of a landfill sentence.",
    overview:
      "ReRoute is an AI-assisted circular-economy platform. A user describes or identifies an unwanted item, selects its condition, and receives a recommended next-life route: reuse, repair, donate, resell, upcycle, recycle, or special disposal. Each recommendation is explained rather than simply asserted, so the person understands why a route was chosen.",
    problem:
      "Most people want to dispose of things responsibly but do not know what “responsibly” means for a specific object. Local rules are fragmented, resale is effortful, and the default behaviour — the bin — is the least informed option of all.",
    objective:
      "Explore how AI-assisted identification and decision systems can guide better end-of-life choices for unwanted objects, while keeping the human in control of the final decision.",
    role:
      "Concept, product design, and front-end implementation. Replace this with your precise role and team context.",
    stack: [
      "Add the exact frameworks and services you used",
      "For example: Next.js, TypeScript, an LLM API, a database",
    ],
    features: [
      "Item identification from a description or an image",
      "Condition capture that materially changes the recommendation",
      "Route recommendation across seven second-life paths",
      "Plain-language reasoning attached to every suggestion",
      "Local guidance surfaced alongside the recommendation",
    ],
    architecture: [
      {
        title: "Intake",
        detail:
          "The user identifies the object and records its condition. Replace with the actual input flow.",
      },
      {
        title: "Classification",
        detail:
          "The item is mapped to a category and a set of viable routes. Replace with the real model or rule layer.",
      },
      {
        title: "Recommendation",
        detail:
          "Candidate routes are ranked and explained. Replace with the actual ranking logic.",
      },
      {
        title: "Follow-through",
        detail:
          "The chosen route is turned into a concrete next step. Replace with the real handoff.",
      },
    ],
    challenges: [
      "Turning an open-ended real-world problem into a decision space small enough to be useful.",
      "Keeping explanations honest when the underlying model is uncertain.",
      "Designing for objects that sit between categories.",
    ],
    learnings: [
      "A recommendation is only trusted when the reasoning is visible.",
      "The last mile — what the person does next — decides whether the product matters.",
    ],
    screenshots: [
      { src: null, caption: "Item intake — add a screenshot" },
      { src: null, caption: "Recommended route — add a screenshot" },
    ],
    github: null,
    demo: null,
    status: "Concept and working prototype",
  },
  {
    id: "injectmenot",
    number: "02",
    title: "InjectMeNot",
    kicker: "Security · Prompt-injection detection",
    tagline:
      "Read the text before the model does — and show what it is really being asked to do.",
    overview:
      "InjectMeNot analyses submitted text and PDF documents to detect potentially malicious instructions and prompt-injection attempts. Rather than returning a bare verdict, the interface presents findings clearly: risk indicators, the passages that triggered them, and an explanation of what the injection is trying to achieve.",
    problem:
      "Text that reaches a language model can carry hidden instructions. Documents, pasted text, and scraped pages are all plausible delivery routes, and a single successful injection can redirect an entire workflow.",
    objective:
      "Build a practical detector for text and PDF input that surfaces prompt-injection risk in a way a non-specialist can act on, without blocking legitimate content.",
    role:
      "Concept, detection design, and implementation. Replace with your precise role and team context.",
    stack: [
      "Add the detection approach you used",
      "For example: Next.js, TypeScript, PDF parsing, an LLM classifier",
    ],
    features: [
      "Analysis of pasted text and uploaded PDF documents",
      "Detection of instruction-like and role-hijacking patterns",
      "Risk indicators with severity, not just a single score",
      "Passage-level explanation of why something was flagged",
      "A reading-friendly report layout for findings",
    ],
    architecture: [
      {
        title: "Extraction",
        detail:
          "Text is normalised out of raw input and PDF documents. Replace with the actual extraction pipeline.",
      },
      {
        title: "Detection",
        detail:
          "Pattern, heuristic and model-based checks run over the text. Replace with the real detectors.",
      },
      {
        title: "Explanation",
        detail:
          "Each signal is tied back to the passage that produced it. Replace with the real explanation layer.",
      },
      {
        title: "Report",
        detail:
          "Findings are grouped by severity and rendered for a human reader. Replace with the real report builder.",
      },
    ],
    challenges: [
      "Separating genuine injected instructions from ordinary quoted text.",
      "Keeping false positives low enough that the tool stays usable.",
      "Explaining model behaviour without exposing the detector to the same attack.",
    ],
    learnings: [
      "Security tools are adopted when they explain themselves, not when they only score.",
      "PDFs are a much messier input surface than plain text.",
    ],
    screenshots: [
      { src: null, caption: "Analysis view — add a screenshot" },
      { src: null, caption: "Findings report — add a screenshot" },
    ],
    github: null,
    demo: null,
    status: "Working prototype",
  },
  {
    id: "futurepath",
    number: "03",
    title: "FuturePath",
    kicker: "Career discovery · Personalised guidance",
    tagline:
      "A map of possible futures, drawn from who you actually are.",
    overview:
      "FuturePath is a career exploration and prediction platform concept. It helps people discover plausible career directions using their interests, preferences, and answers to guided questions. The emphasis is on widening the field of view — showing adjacent paths a person would never have searched for — rather than issuing a single verdict about what they should do.",
    problem:
      "Career discovery is usually either a static list of job titles or a confident recommendation that ignores context. Neither helps someone who is unsure where to begin.",
    objective:
      "Explore personalised recommendation and career-discovery models that produce explainable, comparable directions rather than one opaque answer.",
    role:
      "Concept, product design, and early implementation. Replace with your precise role and team context.",
    stack: [
      "Add the recommendation approach you used",
      "For example: Next.js, TypeScript, a preference model, a vector store",
    ],
    features: [
      "Guided question flow built around interests and working preferences",
      "Personalised career directions with rationale",
      "Comparison between several possible paths",
      "Exploration of adjacent roles instead of a single answer",
      "A saved shortlist for later reflection",
    ],
    architecture: [
      {
        title: "Profile",
        detail:
          "Interests and preferences are captured as a structured profile. Replace with the real model.",
      },
      {
        title: "Matching",
        detail:
          "The profile is compared against career directions. Replace with the actual recommendation approach.",
      },
      {
        title: "Explanation",
        detail:
          "Each suggested path is justified in terms of the person's own answers. Replace with the real logic.",
      },
      {
        title: "Exploration",
        detail:
          "Paths are compared and expanded into adjacent possibilities. Replace with the real flow.",
      },
    ],
    challenges: [
      "Avoiding the trap of reducing a person to a score.",
      "Making recommendations feel exploratory rather than prescriptive.",
      "Representing careers in a way that is specific enough to be useful.",
    ],
    learnings: [
      "People trust a recommendation more when they can see the path not taken.",
      "Guided questions work best when they are short and concrete.",
    ],
    screenshots: [
      { src: null, caption: "Guided questions — add a screenshot" },
      { src: null, caption: "Career directions — add a screenshot" },
    ],
    github: null,
    demo: null,
    status: "Concept and early prototype",
  },
];

export const bookOrder: ProjectId[] = ["reroute", "injectmenot", "futurepath"];

export function getProject(id: ProjectId): Project | undefined {
  return projects.find((project) => project.id === id);
}
