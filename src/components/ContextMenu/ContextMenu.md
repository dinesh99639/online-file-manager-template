# ContextMenu Component

The `ContextMenu` component is a floating, contextual action list that appears on top of the UI elements when right-clicked or triggered by an action button.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `x` | `number` | The horizontal screen coordinate (px) for the menu. |
| `y` | `number` | The vertical screen coordinate (px) for the menu. |
| `item` | `any` | The target item for the menu actions. |
| `type` | `'file' \| 'folder' \| 'background'` | The target context of the right-click. |
| `isSelectionMode` | `boolean` | State for toggling selection mode. |
| `onClose` | `() => void` | Closes the menu on action or outside click. |
| `toggleSelectionMode` | `() => void` | Event handler for multi-select engagement. |

## Context Sections

- **Item Context (File/Folder)**:
  - **Primary**: `Download`, `Share Link`.
  - **Secondary**: `Copy`, `Move`, `Rename`, `Add to Starred`.
  - **Destructive**: `Delete` with a red highlight.
- **Workspace Context (Background)**:
  - **Modes**: `Select Multiple` / `Exit Multi-Select`.
  - **Creation**: `New Folder`, `Upload Files`.
  - **Utility**: `Refresh View`.

## UI Design

- **Floating UI**: Uses `fixed` positioning with `backdrop-blur-xl` and `bg-bg-secondary/90`.
- **Animations**: Features `animate-scale-up` for entry.
- **Micro-Animations**: Buttons rotate icons or change color on hover.
- **Header Info**: Displays the item name and type-label in uppercase for clarity.

## Implementation Details

- **Coordinate Clamping**: Coordinates are clamped to the viewport size to prevent the menu from overflowing the screen.
- **Propagation Control**: `onClick` and `onMouseDown` events are stopped ( `e.stopPropagation()` ) to prevent triggering underlying layout clicks.
