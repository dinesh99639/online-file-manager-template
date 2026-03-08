# Core Types Module

The `types.tsx` module provides centralized TypeScript interfaces for the entire application, ensuring type safety and code consistency across all components.

## Exported Interfaces

### FileItem
Represents an individual file in the storage system.
- `id`: `number` (Unique identifier)
- `parentId`: `number | null` (The ID of the folder containing this file)
- `name`: `string` (The full filename)
- `type`: `string` (The file extension or category like 'doc', 'image', 'video')
- `size`: `string` (The human-readable file size)
- `date`: `string` (The last modification date)
- `owner`: `string` (The owner's name or 'me')
- `isStarred`: `boolean` (Optional, flag for starred items)
- `isDeleted`: `boolean` (Optional, flag for items in Trash)
- `lastAccessed`: `string` (Optional, ISO string for recent browsing)
- `preview`: `string` (Optional, URL for visual thumbnails)

### FolderItem
Represents a folder/directory.
- `id`: `number` (Unique ID)
- `parentId`: `number | null` (The parent directory's ID)
- `name`: `string` (The folder name)
- `items`: `number` (Total count of items contained in the folder)
- `size`: `string` (Combined file size of its contents)
- `date`: `string` (The last modification date)
- `owner`: `string` (The owner's name)
- `isStarred`: `boolean` (Optional)
- `isDeleted`: `boolean` (Optional)
- `lastAccessed`: `string` (Optional)

### Space
Represents a storage workspace or container.
- `id`: `number` (Unique ID)
- `name`: `string` (Workspace label)
- `used`: `string` (Used storage capacity)
- `filesCount`: `number` (Total number of files in the space)
- `bandwidth`: `string` (Bandwidth consumption)
- `status`: `string` (The space health/encrypted status)

### Theme
Configuration for the application's color schemes.
- `id`: `string` (Unique theme ID)
- `name`: `string` (Display label)
- `icon`: `ReactNode` (The Lucide icon used for the theme)
- `color`: `string` (The primary accent color for the theme)

## Usage
These types should be imported as `import type { ... }` where possible to minimize runtime overhead.
