# Sidereal Advisory Design QA

- Source visual truth: `https://sidereal.lovable.app/`
- Source desktop capture: `source-home-desktop.png`
- Implementation desktop capture: `implementation-home-desktop.png`
- Desktop comparison: `design-qa-desktop.png`
- Source mobile capture: `source-home-mobile.png`
- Implementation mobile capture: `implementation-home-mobile.png`
- Mobile comparison: `design-qa-mobile.png`
- Desktop viewport: 1095 × 906 CSS px, device scale factor 2
- Mobile viewport: 390 × 844 CSS px, device scale factor 2
- State: English homepage, navigation closed, hero video playing
- Pixel normalization: source and implementation were captured at identical CSS viewports and browser density before side-by-side composition.

## Full-view comparison evidence

The implementation preserves the source hierarchy, centered hero composition, responsive pill navigation, video treatment, typography, white/navy palette, three-card service section, statement section, call-to-action, and footer structure. The live video produces different frames between captures; this is expected because both use the same copied source video asset.

## Focused-region comparison evidence

- Header: logo lockup, link spacing, language selector, rounded call-to-action, and mobile menu match the source behavior.
- Hero: Plus Jakarta Sans display typography, headline line breaks, supporting copy, button shapes, video crop, gradient fade, and vertical alignment match at both tested breakpoints.
- Contact: field treatment, two-column desktop layout, icon cards, typography, and contact information match the source.
- Inner pages: About and Services preserve the source editorial hierarchy, large display headings, card borders, spacing rhythm, and navy/neutral token system.

## Required fidelity surfaces

- Fonts and typography: Plus Jakarta Sans, Inter, JetBrains Mono, and Noto Sans Devanagari match the source families and intended weights. Headline sizing and wrapping were checked on desktop and mobile.
- Spacing and layout rhythm: 24px mobile gutters, centered 1047px desktop content width, pill navigation, card spacing, section rhythm, radii, and borders match the captured design.
- Colors and visual tokens: white background, deep navy foreground/buttons, neutral gray copy, subtle glass borders, and blue icon accents match the source.
- Image quality and asset fidelity: the original Sidereal logo and hero MP4 were copied locally. No hotlinked or approximated visual assets are used.
- Copy and content: homepage, About, Services, contact information, and English/French/Hindi navigation and contact states were recreated from source evidence.

## Comparison history

1. Initial desktop/mobile comparison found two P2 issues: inner-page headings were oversized, and mobile hero buttons stretched to the viewport width.
2. Reduced the inner-page display-heading maximum from 78px to 64px and changed mobile hero controls to content width.
3. Post-fix captures show the source line wrapping, CTA proportions, and content alignment are restored. No actionable P0/P1/P2 mismatch remains.

## Interactions tested

- Desktop navigation and direct About, Services, and Contact routes
- Mobile navigation open/close
- English, French, and Hindi language switching
- About process-stage selection
- Contact form input rendering and native email handoff behavior
- GitHub Pages subpath routing and deep-link fallback

## Console check

The final browser-rendered implementation reported no console errors.

## Follow-up polish

- P3: the Lovable editing badge is intentionally omitted because the GitHub Pages version is independent of Lovable.
- P3: video frames vary between captures because the background is continuously animated.

final result: passed
