# Breadcrumbs Component

The `Breadcrumbs` component provides a visual path to the current navigation depth and includes primary action controls for the workspace.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `currentPath` | `any[]` | Array of path segments `{ id, name }`. |
| `navigateToBreadcrumb` | `(index: number) => void` | Navigates back to a parent level. |
| `handleContextMenu` | `(e, item, type, alignToElement) => void` | Opens the context menu for global actions. |
| `viewMode` | `string` | The active layout (Grid vs List). |
| `setViewMode` | `(mode: string) => void` | Setter for the view layout. |

## Major Features

- **Path Navigation**: Clickable segments for jumping back into parent folders. Use `LayoutDashboard` for the root and `Folder` for subfolders.
- **Global Actions**: Primary "Actions" button for opening the workspace context menu (creating folders, uploading, etc.).
- **Layout Switcher**: Intuitive toggle between "Grid" and "List" views with icons and text.

## Interaction

- **Visual Cues**: Active path segment is highlighted with the `accent-primary` color.
- **Hover Effects**: Sub-segments have background highlights for clickable regions.
- **Micro-Animations**: Uses `animate-fade-in` and `transition-all` for smooth layout shifts.
