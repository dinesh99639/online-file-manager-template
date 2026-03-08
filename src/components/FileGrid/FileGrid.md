# FileGrid Component

The `FileGrid` component renders files and folders in an interactive grid layout, optimized for visual browsing.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `displayedFolders` | `FolderItem[]` | Array of folders in the current view. |
| `displayedFiles` | `FileItem[]` | Array of files in the current view. |
| `isSelectionMode` | `boolean` | Flag for multiple item selection mode. |
| `selectedIds` | `Set<string>` | A set of currently selected unique item IDs. |
| `selectedItem` | `any` | The item currently highlighted or active. |
| `toggleItemSelection` | `(id: string) => void` | Setter for selecting/deselecting an item. |
| `navigateToFolder` | `(folder) => void` | Navigates into a subfolder. |
| `setSelectedItem` | `(item: any) => void` | Sets the item for the details panel. |
| `handleContextMenu` | `(e, item, type, align) => void` | Opens the right-click menu for the item. |

## Sub-Components

- **GridItem**: Individual card rendering for a file or folder.

## Item Rendering

- **Folder**: Displays a branded folder icon with an item count.
- **File Preview**: 
    - **Image/Video**: Shows a high-quality cover preview from the Unsplash API when available.
    - **Doc/Archive**: Displays a large, colored icon representing the specific file type.
- **Selection UI**: Checkbox appears in the top-left corner in selection mode.
- **Hover States**: Cards lift and gain shadow depth on hover for better UX.

## Technical Details

- Uses CSS `grid-cols-[repeat(auto-fill,minmax(200px,1fr))]` for automatic responsiveness.
- Implements `transform-gpu` to offload animations to the GPU for better performance.
- Features lazy loading on item previews to optimize network usage.
