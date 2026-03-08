# Application Utility Functions

The `utils.tsx` module provides reusable helper functions for rendering UI elements and formatting data within the application.

## Exported Functions

### `renderIcon(type: string, size: number)`
Renders a specific Lucide icon based on the file or folder type.
- `type`: The file extension or 'folder'.
- `size`: The integer size (in px) for the icon.
- **Icon Mapping**:
  - `folder`: Folder
  - `doc`: FileText
  - `image`: Image (icon)
  - `video`: Video (icon)
  - `archive`: FileArchive
  - `spreadsheet`: Table
  - `default`: File (generic)

### `getKindString(type: string)`
Returns a human-readable label for a file extension/type.
- `type`: The file extension or 'folder'.
- **Return Type Mapping**:
  - `doc`: Document
  - `image`: Image (text)
  - `video`: Video (text)
  - `archive`: Zip Archive
  - `spreadsheet`: Spreadsheet
  - `default`: File (generic text)

### `renderOwnerAvatar(owner: string)`
Renders a user avatar based on the owner's name.
- `owner`: The owner's name.
- **Functionality**:
  - `me`: Renders the default user's avatar.
  - **Other**: Generates a generic UI avatar using the `ui-avatars.com` API with the owner's name.

## Implementation Detail

- **React Element Return**: All helper functions return valid JSX or React nodes.
- **Consistent Typing**: All types are inferred from the core `types.tsx` interfaces.
- **Responsive Sizing**: The `renderIcon` function accepts a custom size parameter to allow different components (Grid vs List) to use the same icon mapping.
- **Simplified Maintenance**: Centralizing the icon and label mapping allows for global updates to the application's visual system from a single file.
