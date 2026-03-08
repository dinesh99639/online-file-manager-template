# FileList Component

The `FileList` component provides a professional, table-based view for data-rich file browsing. It's optimized for efficiency and batch selection.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `displayedFolders` | `FolderItem[]` | Folders in current navigation. |
| `displayedFiles` | `FileItem[]` | Files in current navigation. |
| `isSelectionMode` | `boolean` | State for mass selection. |
| `selectedIds` | `Set<string>` | IDs for selected entries. |
| `selectedItem` | `any` | Highlighting the currently active item. |
| `toggleItemSelection` | `(id: string) => void` | Selects/deselects a specific row. |
| `navigateToFolder` | `(folder) => void` | Setter for navigating deeper. |
| `setSelectedItem` | `(item: any) => void` | Selects a file for the detail view. |
| `handleContextMenu` | `(e, item, type, align) => void` | Right-click/more actions handler. |
| `setSelectedIds` | `(ids: Set<string>) => void` | Batch update for selections. |

## Major Features

- **Fixed Table Header**: The column labels (`Name`, `Kind`, `Owner`, `Modified`, `Size`) remain visible at the top during scrolling.
- **Scrollable Body**: The main list area features an independent scrollbar to keep navigation controls stable.
- **Select All**: In selection mode, a master checkbox appears in the header to select every item in the current view.
- **Custom Scrollbar**: Uses themed CSS properties for a sleek, non-intrusive scrollbar profile.

## UI Elements

- **ListItem**: A row component representing a single folder or file.
- **Kind Badges**: Specific color-coded tags for `Image`, `Document`, `Video`, `Archive`, and `Spreadsheet`.
- **Owner Display**: Shows the user's avatar and name in a compact format.

## Rendering Strategy

- Uses dynamic CSS grids to ensure responsive columns while maintaining alignment.
- Features `divide-y` for subtle row separation.
- Uses `sticky top-0` on the header for consistent UI accessibility.
