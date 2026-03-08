# Main App Module

The `App.tsx` module serves as the primary coordinator for the Telefiles application. It manages the global state, application layout, and coordinates communication between modular components.

## Core State

- **Theme & View**: 
  - `theme`: The current UI theme string (persisted in `localStorage`).
  - `viewMode`: Grid vs List layout (persisted in `localStorage`).
- **Data Management**:
  - `spaces`: The array of available storage containers.
  - `activeSpaceId`: The ID of the currently active container.
  - `currentPath`: Array of breadcrumb segments representing navigation depth.
  - `currentSection`: The active virtual section (My Files, Starred, etc.).
- **UI Logic**:
  - `isLoading`: Global loading state for simulating network delay.
  - `isSidebarOpen`: Mobile visibility flag for the sidebar.
  - `selectedItem`: The active selection for the Details Panel.
  - `contextMenu`: State for tracking coordinates and target item of the custom context menu.
- **Selection Mode**:
  - `isSelectionMode`: Boolean toggle for multi-select functionality.
  - `selectedIds`: A Set tracking selected items.

## Principal Handlers

- `navigateToFolder`: Navigates into a sub-folder and updates breadcrumbs.
- `navigateToBreadcrumb`: Jumps back to a specific parent level in the path.
- `handleContextMenu`: Logic for opening the context menu with coordinate clamping.
- `toggleSelectionMode`: Switches the UI into bulk-action mode.
- `handleRefreshSimulate`: Simulates data fetching when switching between core sections.

## Layout Structure

1. **Sidebar**: Handles main navigation.
2. **Main Content**:
   - **TopBar**: Search and theme picker.
   - **Breadcrumbs**: Path info and view toggles.
   - **Display Area**: Conditionally renders `FileGrid` or `FileList`.
   - **BulkActionBar**: Shows when multiple items are selected.
3. **FileDetailsPanel**: Contextual info for single items.
4. **Modals & Menus**: `CreateSpaceModal` and `ContextMenu`.

## Implementation Details

- **Memoization**: Uses `useMemo` for heavy filtering and `useCallback` for stable event references.
- **Side Effects**: Employs `useEffect` for theme application and focus management.
- **Custom Scrollbar**: The application enforces a consistent themed scrollbar across all scrollable regions.
