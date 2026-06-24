# Product Requirements Document (PRD)
## Akash Sikarwar — 3D Interactive Portfolio

**Author:** Akash Sikarwar
**Date:** June 2026
**Status:** Draft v1.0

---

## 1. Overview

A brand-new, from-scratch portfolio website for Akash Sikarwar that uses four pre-rendered 3D videos (`1.mp4`, `2.mp4`, `3.mp4`, `4.mp4`) as immersive, interactive backgrounds. The video playback will be tied to scroll position and mouse pointer movement, creating a "scrubbing" effect rather than passive looping video — making the 3D content feel alive and responsive rather than decorative.

## 2. Product Vision

**What are we building?**
A single-page, scroll-driven 3D-style portfolio website where four pre-rendered 3D videos act as living backgrounds — scrubbed by scroll position and nudged by mouse movement — to present Akash's profile, experience, and projects to recruiters and collaborators.

**Why are we building it?**
The current portfolio (a plain Vite SPA) is functional but generic. Most student/dev portfolios look the same. A scroll-and-pointer-synced 3D video background turns passive scrolling into an interactive, memorable experience — making Akash's site stand out in a recruiter's first 10 seconds, which is often all the attention a portfolio link gets.

## 3. Goals

- Replace the existing static SPA portfolio (akash-sikarwar-portfolio.vercel.app) with a new, visually distinctive 3D-driven experience.
- Use motion (scroll + cursor) as the primary interaction model for the background videos, so the "3D" feel comes from real interactivity, not just video playback.
- Showcase Akash's profile, work experience, projects, skills, and achievements (per resume) in a way that feels premium and memorable to recruiters.
- Keep performance and load time reasonable despite using 4 video assets.

## 4. Non-Goals

- No real-time 3D rendering engine (Three.js scenes, WebGL models) — the "3D" is delivered via pre-rendered video, not live 3D geometry.
- No CMS/backend — content is static, hardcoded from resume data.
- No blog or article system.

## 5. Target Audience

- Recruiters and hiring managers (AI/ML and full-stack internship roles).
- Hackathon teammates / open-source collaborators evaluating Akash's profile.
- Casual visitors via shared links (LinkedIn, GitHub, resume).

## 6. Core Concept: Scroll & Pointer-Synced Video Background

Each major section of the site is paired with one of the four videos as its background:

| Section | Video | Notes |
|---|---|---|
| Hero / Intro | `1.mp4` | First impression — name, title, tagline |
| Experience | `2.mp4` | inAmigos internship, GSSoC contributions |
| Projects | `3.mp4` | WhistleVerse, Smart Air Guardian |
| Skills / Achievements / Contact | `4.mp4` | Closing section, CTA |

**Behavior:**
- Each video's `currentTime` is driven by scroll progress through its section (scrubbing), not autoplay — using the browser's `requestVideoFrameCallback`/`<video>` element with `currentTime` set programmatically based on `IntersectionObserver` + scroll percentage.
- Mouse pointer position adds a secondary modifier: e.g., slight parallax/offset of the video element, subtle playback-speed nudge, or a vignette/light-follow effect — to be decided in design (see Open Questions).
- Videos are muted, no native controls, `preload="auto"`, with a poster frame fallback for slow connections.
- On mobile/touch devices (no mouse pointer), fall back to scroll-only sync.

## 7. Website Structure (Section-by-Section)

### 7.1 Hero Section
- **Background:** `1.mp4`, scrubbed from frame 0 as user lands, fully "played" by the time they scroll past this section.
- **Content:** Name ("Akash Sikarwar"), role tagline ("B.Tech IT @ MMMUT | AI/ML & Full-Stack Developer"), one-line hook.
- **CTAs:** Buttons for Resume (PDF download), GitHub, LinkedIn, Scroll-down indicator.
- **Interaction:** Mouse movement causes a subtle parallax/glow shift on the video layer; no scroll yet needed to see first frame.

### 7.2 About Section
- **Background:** Tail end of `1.mp4` crossfading into `2.mp4`, OR a static/looping segment if `1.mp4` is hero-only (see Open Question #3).
- **Content:** Short bio — CGPA 8.8, Designing Head @ Hack with India Chapter (MMMUT), GSSoC '26 contributor, core interests (AI/ML, full-stack, open source).
- **Layout:** Text-forward, video dimmed/blurred behind a glass-morphism card for readability.

### 7.3 Experience Section
- **Background:** `2.mp4`, scrubbed across this section's scroll range.
- **Content:**
  - AI Data Analyst Intern — inAmigos Foundation (June 2026): data analysis/insights, cross-functional collaboration.
  - Open Source Contributor — GSSoC 2026: 13+ merged PRs across 6 repos (WinHome, CareerPilot, Vura, AlgoScope, Learnova).
- **Layout:** Timeline or stacked cards, each card "pinned" briefly during scroll so the user reads while the video scrubs underneath.

### 7.4 Projects Section
- **Background:** `3.mp4`, scrubbed across this section.
- **Content:**
  - WhistleVerse (React, Node, Express, PostgreSQL, Prisma) — full-stack IPL fan platform, with GitHub + Live Demo links.
  - Smart Air Guardian (Python, Streamlit, Scikit-learn) — AQI prediction dashboard, with GitHub + Live Demo links.
- **Layout:** Two large project cards/tiles, each with a short description, tech-stack chips, and link buttons. Pointer hover on a card could intensify the background glow near the cursor.

### 7.5 Skills Section
- **Background:** Start of `4.mp4`.
- **Content:** Grouped skill chips — Languages, Frameworks, Databases & Cloud, Developer Tools (pulled directly from resume).
- **Layout:** Grid of pill/chip elements, animated in on scroll (staggered fade/slide).

### 7.6 Achievements & Certifications Section
- **Background:** Continuation of `4.mp4`.
- **Content:** Codezilla runner-up, IIIT Bhagalpur Top 15 (out of 100), Hack with India Chapter role, certifications list (Goldman Sachs Forage, Data Labeling Forage, GenAI Data Analytics Forage, GUVI×HCL Data Engineering, Tata iON Presentation Skills).
- **Layout:** Simple list/grid with small badge icons.

### 7.7 Contact / Footer Section
- **Background:** Final frames of `4.mp4`, settling on a calm "resting" frame (video fully scrubbed, no more motion).
- **Content:** Email, phone, LinkedIn, GitHub, resume download CTA repeated.
- **Layout:** Centered, minimal — signals "end of journey."

## 8. User Experience

**What should users feel?**
- Curiosity and delight in the first 5 seconds (hero video reacting to their cursor).
- A sense of "this person can build slick, technical things" — the UX itself is a portfolio piece.
- Smooth, premium, never gimmicky or laggy — interactivity should feel intentional, not distracting from reading the actual content (experience/projects).

**How should they interact?**
- **Scroll:** Primary navigation. Each section's video scrubs proportionally to how far the user has scrolled through that section.
- **Mouse movement:** Secondary, ambient interaction — parallax/glow/light-follow effect on the video layer, never required to read content (must remain a "bonus," not a barrier).
- **Click:** Standard nav links (jump to section), project/demo/GitHub buttons, resume download.
- **Touch (mobile):** Scroll-only sync; no pointer effect (replaced with nothing extra, or a very subtle ambient animation).

## 9. Visual Requirements

- **Theme:** Dark, cinematic, tech-forward — matches the black-background aesthetic Akash already favors (per his reference mockups). High contrast, generous negative space.
- **Colors:** Primary background near-black (#0A0A0A or similar); one vivid accent color for highlights/headings/links — pink/magenta (#FF2D92-ish) or electric blue, used sparingly for emphasis words, buttons, and active nav states; white/off-white for body text.
- **Typography:** Bold, slightly condensed sans-serif for headings (e.g., Space Grotesk, Sora, or similar); clean readable sans for body (e.g., Inter).
- **Animations:**
  - Scroll-linked video scrubbing (core mechanic).
  - Staggered fade/slide-in for text blocks and skill chips as they enter viewport.
  - Subtle hover-scale/glow on buttons and project cards.
- **Transitions:** Crossfade between section backgrounds where one video hands off to the next (avoid hard cuts); smooth easing (ease-in-out) on all scroll-triggered animations — no abrupt snaps.

## 10. Technical Requirements

- **Stack:** React + Vite (consistent with existing portfolio), HTML/CSS/JS fundamentals underneath.
- **Animation/scroll libraries:** GSAP with ScrollTrigger (preferred for frame-accurate video scrubbing) or Framer Motion for simpler section transitions.
- **Styling:** Tailwind CSS for rapid, consistent styling.
- **Performance goals:**
  - First Contentful Paint under ~2.5s on a typical connection.
  - Videos lazy-loaded per section (only `1.mp4` loads on initial page load; `2.mp4`–`4.mp4` preload as the user approaches each section).
  - Target smooth 60fps scroll-scrubbing on modern desktop browsers; graceful degradation (lower frame sampling or static frame fallback) on low-end devices.
- **Responsive design:**
  - Fully responsive layout across mobile, tablet, and desktop breakpoints.
  - Mobile: scroll-only video sync (no pointer effects), simplified layouts (single-column cards), and option to swap to lighter/compressed video versions or poster images if bandwidth/performance demands it.
  - Respect `prefers-reduced-motion` — disable scrubbing/parallax, show a static poster frame or gently looping video instead.

## 12. Functional Requirements

- FR1: Each section's background video scrubs in sync with scroll position within that section's viewport bounds.
- FR2: Mouse movement produces a visible, smooth secondary effect on the video/3D layer (parallax or similar).
- FR3: Site is a single-page scrolling experience with anchor-based nav (sticky/floating nav bar).
- FR4: Resume PDF downloadable directly from the site.
- FR5: Fully responsive — graceful fallback on mobile (static video or single representative frame per section if performance is a concern).
- FR6: Page load — show a lightweight loader while videos preload; avoid blocking interaction.
- FR7: All project/demo/GitHub links open in new tabs.

## 13. Non-Functional Requirements

- Initial load (LCP) should stay reasonable despite 4 video assets — use compression, lazy-load videos for sections below the fold (only load `2.mp4` etc. as user approaches that section).
- Smooth 60fps scroll-scrubbing on modern desktop browsers; acceptable degraded experience on low-end devices.
- Cross-browser support: Chrome, Edge, Safari, Firefox (latest 2 versions).
- Accessible: respect `prefers-reduced-motion` by disabling scroll-scrub/parallax and just looping video gently or showing static poster.

## 14. Tech Stack (proposed)

- **Framework:** React + Vite (matches your existing SPA experience/preference)
- **Scroll/animation:** GSAP (ScrollTrigger) or Framer Motion for scroll-linked video scrubbing
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (per your prior deployment experience)
- **Video assets:** Compressed via H.264/MP4, possibly served via a CDN if file size becomes a bottleneck (your `4.mp4` is ~11MB — all 4 together will need compression/optimization passes)

## 15. Success Metrics

- Page successfully scrubs all 4 videos smoothly on scroll without visible stutter (manual QA across 3 devices/browsers).
- Total page weight optimized so first contentful paint is under ~2.5s on a decent connection.
- Positive informal feedback from at least 2-3 peers/recruiters on "feel" of the site before sharing widely.

## 16. Open Questions

1. What should the **mouse pointer effect** specifically do — parallax offset, light/cursor-follow glow, brightness shift, or something else? (Needs a quick visual decision before build.)
2. Should nav between sections also **jump-scrub** the video (snap to a frame) or only respond to organic scroll?
3. Do you want **section transitions** to crossfade between videos, or hard-cut when one section's video ends and the next begins?
4. Should the existing portfolio be replaced entirely, or kept as a fallback/lite version for low-end devices?
5. Final video specs (resolution/duration/loopability) for `1.mp4`-`4.mp4` — confirm they're long/detailed enough to scrub through a full section scroll without feeling like they "run out" of frames.

## 17. Milestones (proposed)

| Milestone | Description |
|---|---|
| M1 | Finalize video assets + compress/optimize all 4 |
| M2 | Build static layout with resume content, no video sync yet |
| M3 | Implement scroll-based video scrubbing (single section as proof of concept) |
| M4 | Add mouse-pointer interaction layer |
| M5 | Roll out scroll-scrub across all 4 sections |
| M6 | Responsive/mobile fallback + accessibility pass |
| M7 | Performance optimization + deploy to Vercel |
