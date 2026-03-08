# FileDetailsPanel Component

The `FileDetailsPanel` component provides an informative, right-side sidebar for a granular view of a selected file or folder.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `selectedItem` | `any` | The item to display in the details view. |
| `setSelectedItem` | `(item: any) => void` | Setter for clearing the selection. |

## Major Features

- **Dynamic Preview**: 
    - **Image/Video**: Shows an Unsplash cover preview with a zoom-on-hover effect.
    - **Folder/Doc/Other**: Displays a large, colored icon with a shaded shadow.
- **Header Actions**: Quick access to "Close" button with a background blurring header.
- **Quick Links**: "Share" and "Save" (Download) buttons for primary item actions.
- **Detailed Metadata**: Lists `Size`, `Modified Date`, and `Owner` information in a clean, row-oriented display.

## UI Design

- **Panel Structure**: Fixed-width (`340px`) sidebar with an independent `overflow-y-auto` scrollbar.
- **Layout Logic**: Hidden on small screens to prioritize browsing, visible on `lg` (1024px) breakpoint.
- **Empty State**: Displays a refined "No selection" placeholder with a document icon and helpful text.
- **Hover Micro-Animations**: Buttons and rows have background transitions and scale effects.

## DetailRow Helper
A lightweight sub-component used for rendering metadata rows uniformly with uppercase labels and bold values.
