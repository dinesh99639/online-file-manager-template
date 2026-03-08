# Global Constants Module

The `constants.ts` module centralizes static application data and color mappings, ensuring consistent UI across different views and sections.

## Major Constants

- **`files`**: An array of `FileItem[]` objects, representing the initial data state for the files in the storage system.
- **`folders`**: An array of `FolderItem[]` objects, representing the folder hierarchy.
- **`FILE_COLORS`**: A Record of color mappings for each specific file type (e.g., Image: Pink, Doc: Blue, Video: Red, Folder: Amber).

## Implementation Details

- **Dummy Data Hierarchy**: The `files` and `folders` arrays contain hierarchical IDs (`parentId`) to simulate nested folder exploration.
- **Visual Cues**: The `FILE_COLORS` are used by multiple components (Sidebar, TopBar, FileGrid, FileList) to maintain a cohesive brand identity and help the user quickly identify file types.
- **Data Extensibility**: This module is the single source of truth for the mockup data, making it easy to test large datasets or different organizational structures.
- **Type Safety**: All constants are typed against the core `FileItem` and `FolderItem` interfaces.

## Maintenance
When adding new files or folders for testing, ensure the IDs are unique and the parent IDs correspond to an existing folder in the `folders` array. When adding new file types, also update the `FILE_COLORS` mapping.
