---
name: ui-ux-pro-max
description: >
  AI-powered design intelligence with 67 UI styles, 161 color palettes,
  57 font pairings, 99 UX guidelines, and 25 chart types across 15+ tech
  stacks. Provides searchable databases for styles, colors, typography,
  charts, and UX best practices. Use when designing UI, choosing colors,
  picking fonts, reviewing UX, or building landing pages. Trigger: any
  UI/UX design request, "design system", "color palette", "font pairing",
  "ui style", "ux review", "landing page design".
---

# UI/UX Pro Max

AI-powered design intelligence toolkit providing searchable databases of UI styles,
color palettes, font pairings, chart types, and UX guidelines.

## Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**
```bash
brew install python3
```

---

## How to Use This Skill

Use this skill when the user requests any of the following:

| Scenario | Trigger Examples | Start From |
|----------|-----------------|------------|
| **New project / page** | "Build a landing page", "Build a dashboard" | Step 1 → Step 2 (design system) |
| **New component** | "Create a pricing card", "Add a modal" | Step 3 (domain search: style, ux) |
| **Choose style / color / font** | "What style fits a fintech app?" | Step 2 (design system) |
| **Review existing UI** | "Review this page for UX issues" | Quick Reference checklist |
| **Fix a UI bug** | "Button hover is broken" | Quick Reference → relevant section |
| **Improve / optimize** | "Make this faster", "Improve mobile experience" | Step 3 (domain search: ux) |
| **Add charts / data viz** | "Add an analytics dashboard chart" | Step 3 (domain: chart) |
| **Stack best practices** | "React performance tips" | Step 4 (stack search) |

Follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: SaaS, e-commerce, portfolio, healthcare, beauty, service, etc.
- **Target audience**: Consider age group, usage context
- **Style keywords**: playful, vibrant, minimal, dark mode, content-first, immersive, etc.
- **Stack**: HTML/CSS, React, Next.js, Vue, etc.

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

This command:
1. Searches domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules from `ui-reasoning.csv` to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

**Example:**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

### Step 2b: Persist Design System (Master + Overrides Pattern)

To save the design system for retrieval across sessions, add `--persist`:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

### Step 3: Supplement with Detailed Searches (as needed)

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**Available domains:**

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `product` | Product type recommendations | SaaS, e-commerce, portfolio, healthcare |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional, modern |
| `color` | Color palettes by product type | saas, ecommerce, healthcare, fintech |
| `landing` | Page structure, CTA strategies | hero, testimonial, pricing, social-proof |
| `chart` | Chart types, library recommendations | trend, comparison, timeline, funnel |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index, loading |
| `prompt` | AI prompts, CSS keywords | (style name) |

### Step 4: Stack Guidelines

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

Available stacks: `html-tailwind` (default), `react`, `nextjs`, `astro`, `vue`, `nuxtjs`, `nuxt-ui`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`, `angular`, `laravel`, `javafx`

---

## Output Formats

```bash
# ASCII box (default) - best for terminal display
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown - best for documentation
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

## Tips for Better Results

- Use **multi-dimensional keywords** — combine product + industry + tone: `"entertainment social vibrant"` not just `"app"`
- Use `--design-system` first for full recommendations, then `--domain` to deep-dive
- Add `--stack <stack>` for implementation-specific guidance

---

## Common Rules for Professional UI

### Icons & Visual Elements

- Use vector-based icons (e.g., Phosphor, Heroicons). **No emoji as structural icons.**
- Consistent icon sizing via design tokens (icon-sm, icon-md = 24pt, icon-lg)
- Touch target minimum: 44×44pt interactive area
- Follow WCAG contrast: 4.5:1 for small elements, 3:1 for larger glyphs

### Light/Dark Mode Contrast

- Primary text contrast >=4.5:1 in both modes
- Secondary text contrast >=3:1 in both modes
- Use semantic color tokens mapped per theme
- Modal scrim: 40-60% black for foreground legibility

### Layout & Spacing

- Respect safe areas for headers, tab bars, CTA bars
- 4/8dp spacing rhythm for padding/gaps/section spacing
- Adaptive gutters by breakpoint

---

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] Consistent icon family and style
- [ ] Semantic theme tokens used consistently

### Interaction
- [ ] All tappable elements provide pressed feedback
- [ ] Touch targets meet minimum size
- [ ] Micro-interaction timing: 150-300ms with native easing
- [ ] Screen reader focus order matches visual order

### Light/Dark Mode
- [ ] Primary text contrast >=4.5:1 in both modes
- [ ] Dividers/borders visible in both themes
- [ ] Both themes tested before delivery

### Layout
- [ ] Safe areas respected
- [ ] Verified on small/large phone + tablet
- [ ] 4/8dp spacing rhythm maintained

### Accessibility
- [ ] All images/icons have accessibility labels
- [ ] Color is not the only indicator
- [ ] Reduced motion supported
