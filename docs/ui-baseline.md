# UI Baseline

The minimum set of UI components every bloom-built product should ship with. Five components cover roughly 80% of UI needs for a small web product.

Salvaged from the retired hatch repo's `libs/ui/` library. In the lite profile these are shadcn components copied into the product. In the full profile they live in `libs/ui/`.

## The Five

### Button

Variants: `default`, `destructive`, `outline`, `ghost`, `link`
Sizes: `sm`, `default`, `lg`

```tsx
<Button variant="default" size="default">Save</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Accessibility: focus ring, keyboard activation, disabled state announced.

### Input

```tsx
<Input
  type="email"
  name="email"
  placeholder="you@example.com"
  error={errors.email}
/>
```

Variants: text-line states (default, error). Errors render with red border and below-input error text.

### Card

Sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Account</CardTitle>
    <CardDescription>Manage your profile</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

### Badge

Variants: `default`, `secondary`, `destructive`, `outline`.

```tsx
<Badge variant="secondary">draft</Badge>
<Badge variant="destructive">overdue</Badge>
```

### Alert

Variants: `default`, `destructive`.

```tsx
<Alert variant="destructive">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your session has expired.</AlertDescription>
</Alert>
```

## Source

In the lite profile: copy from shadcn/ui using their CLI.

```bash
pnpm dlx shadcn@latest add button input card badge alert
```

In the full profile: present pre-built under `libs/ui/`.

## Theming

All five components consume the bloom palette defined in [`../stack.yaml`](../stack.yaml) under `ui.theme` — monochrome zinc, light-default with class-based dark toggle, `sm` border radius, compact density.

## What's NOT here

This list is intentionally minimal. Components that are NOT in the baseline (and shouldn't be copied in until needed): Toast, Dialog, DropdownMenu, Select, Combobox, Tabs, Tooltip, Accordion, Avatar, Skeleton, Sheet, Sidebar. Add them per-product when a real use case demands it.

A common failure mode is bulk-copying 30 shadcn components on day one. Most go unused; pruning later is harder than adding when needed.
