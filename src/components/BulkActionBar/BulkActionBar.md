# BulkActionBar Component

The `BulkActionBar` component (also known as the **Ethereal Infinity Blade**) provides high-level actions for multi-selected items. It's a floating UI element anchored to the bottom.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `selectedCount` | `number` | The total number of items currently selected. |
| `onClear` | `() => void` | Clears all current selections and exits selection mode. |
| `onAction` | `(action: string) => void` | Event handler for specific bulk actions (Share, Download, Copy, Move, Delete). |

## UI Architecture

- **Theme-Aware Pulsar Unit**: A selection counter with a pulsing animation to draw user focus. Displays how many items are being affected.
- **Unified Command Hub**: Accessible buttons for primary actions with interactive hover effects.
- **Dynamic Tooltips**: When hovering over an action, a themed tooltip appears above it with a sliding animation.
- **Destructive/Exit Unit**: Quick access to "Delete" and "Close" actions with visual warnings.

## Visual Design

- **Floating UI**: Uses `sticky bottom-10` with a centered `w-fit` container.
- **Backdrop Effects**: Employs `backdrop-blur-2xl` and `bg-bg-secondary/90` for a premium, lightweight feel.
- **Animations**: Features `animate-slide-up-docked` for entry, providing a polished and responsive experience.

## Interaction Logic

- **Pulsing Animation**: Only visible in the pulsar unit to indicate active selections.
- **Hover Micro-Animations**: Buttons scale by 10% on hover (`hover:scale-110`) and shrink on click (`active:scale-95`).
- **Tooltip Sequencing**: Leverages group-hover modifiers for clean transitions.
- **Deletion Precautions**: Uses a distinctive red theme for the Trash action to prevent accidental data loss.
