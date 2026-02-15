# KodNest Premium Build System

A calm, intentional, and coherent design system for serious B2C SaaS products.

## Philosophy

- **Calm** — No visual noise, no competing elements
- **Intentional** — Every decision serves a purpose
- **Coherent** — Feels like one mind designed it
- **Confident** — Clean execution, no hedging

## Quick Start

```html
<link rel="stylesheet" href="design-system/kodnest.css">
```

Or import individual modules:

```css
@import 'design-system/tokens.css';
@import 'design-system/base.css';
@import 'design-system/layout.css';
@import 'design-system/components.css';
```

## File Structure

```
design-system/
├── kodnest.css      # Main entry (imports all)
├── tokens.css       # Design tokens (colors, spacing, typography)
├── base.css         # Reset, typography, utilities
├── layout.css       # Page structure components
├── components.css   # UI components
├── reference.html   # Visual reference of all components
└── README.md        # This file
```

## Color System

Limited to 4 core colors for coherence:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | #F7F6F3 | Page background |
| `--color-primary-text` | #111111 | Primary text |
| `--color-accent` | #8B0000 | Actions, links |
| `--color-success` | #3D6B4F | Positive states |
| `--color-warning` | #9A7B2C | Caution states |

## Typography

**Headings:** Playfair Display (serif) — confident, generous spacing

**Body:** Inter (sans-serif) — 16-18px, line-height 1.6-1.8, max 720px width

**Mono:** JetBrains Mono — code, prompts

## Spacing Scale

Strict 5-step scale. Never use arbitrary values.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 8px | Tight spacing |
| `--space-2` | 16px | Standard gaps |
| `--space-3` | 24px | Section padding |
| `--space-4` | 40px | Major sections |
| `--space-5` | 64px | Page sections |

## Page Layout Structure

Every page follows this structure:

```
┌─────────────────────────────────────────┐
│  TOP BAR                                │
│  [Project] [Progress: Step X/Y] [Status]│
├─────────────────────────────────────────┤
│  CONTEXT HEADER                         │
│  Large serif title + subtitle           │
├─────────────────────────────────────────┤
│                          │              │
│  PRIMARY WORKSPACE       │  SECONDARY   │
│  (70%)                   │  PANEL (30%) │
│                          │              │
│  Main interaction area   │  • Guidance  │
│                          │  • Prompts   │
│                          │  • Actions   │
│                          │              │
├─────────────────────────────────────────┤
│  PROOF FOOTER                           │
│  □ UI Built □ Logic □ Tests □ Deployed  │
└─────────────────────────────────────────┘
```

## Components

### Buttons

```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--danger">Danger</button>

<!-- Sizes -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary btn--lg">Large</button>
```

### Form Controls

```html
<div class="form-group">
  <label class="label">Label</label>
  <input type="text" class="input" placeholder="...">
  <p class="help-text">Helper text</p>
</div>

<textarea class="textarea"></textarea>
<select class="select">...</select>
```

### Cards

```html
<div class="card">
  <div class="card__header">
    <div class="card__title">Title</div>
    <div class="card__subtitle">Subtitle</div>
  </div>
  <div class="card__content">Content</div>
  <div class="card__footer">Footer</div>
</div>

<!-- Variants -->
<div class="card card--interactive">Hoverable</div>
<div class="card card--selected">Selected</div>
```

### Status Badges

```html
<div class="status-badge status-badge--not-started">
  <span class="status-badge__dot"></span>
  Not Started
</div>
<div class="status-badge status-badge--in-progress">...</div>
<div class="status-badge status-badge--shipped">...</div>
```

### Prompt Box

```html
<div class="prompt-box">
  <div class="prompt-box__header">
    <span class="prompt-box__label">Prompt</span>
    <button class="btn btn--ghost btn--sm">Copy</button>
  </div>
  <div class="prompt-box__content">
    Your copyable content here...
  </div>
</div>
```

### Messages

```html
<!-- Error -->
<div class="error-message">
  <div class="error-message__title">Error Title</div>
  <div class="error-message__text">What went wrong</div>
  <div class="error-message__action">→ How to fix it</div>
</div>

<!-- Success -->
<div class="success-message">
  <div class="success-message__title">Success</div>
  <div class="success-message__text">Confirmation message</div>
</div>
```

### Empty State

```html
<div class="empty-state">
  <div class="empty-state__icon">...</div>
  <div class="empty-state__title">No items yet</div>
  <div class="empty-state__text">Helpful guidance</div>
  <button class="btn btn--primary">Next Action</button>
</div>
```

## Interaction Rules

- **Transitions:** 150-200ms, ease-in-out only
- **No bounce, parallax, or decorative animations**
- **Focus states:** 2px accent outline with 2px offset

## Error & Empty State Guidelines

**Errors must:**
1. Explain what went wrong (title)
2. Provide context (description)
3. Suggest how to fix it (action)
4. Never blame the user

**Empty states must:**
1. Acknowledge the empty state
2. Provide clear next action
3. Never feel dead or broken

## Design Principles

1. **No gradients** — Use solid colors
2. **No glassmorphism** — Use clean borders
3. **No neon colors** — Use muted, professional tones
4. **No animation noise** — Use purposeful, subtle transitions
5. **No random spacing** — Use the 5-step scale only
6. **No decorative fonts** — Serif for headings, sans-serif for body
7. **No drop shadows** — Use borders for depth
