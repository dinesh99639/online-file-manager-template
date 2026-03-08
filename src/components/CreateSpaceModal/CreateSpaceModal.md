# CreateSpaceModal Component

The `CreateSpaceModal` component provides an overlay for creating new storage workspaces within the application.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `isOpen` | `boolean` | State for toggling modal visibility. |
| `onClose` | `() => void` | Event handler to close the modal. |
| `spaces` | `Space[]` | The list of available workspaces. |
| `setSpaces` | `(spaces: Space[]) => void` | Setter for updating the workspaces. |
| `setActiveSpaceId` | `(id: number) => void` | Setter to change the active workspace to the newly created one. |

## Major Features

- **Input Handling**: A styled input box for the workspace name with automatic focus.
- **Quota Selection**: Interactive buttons for choosing the initial storage capacity for that space (10GB, 50GB, 100GB, Unlimited).
- **Workspace Launch**: Primary "Launch Workspace" button with a gradient background and a chevron icon.
- **Cancel Action**: Secondary "Think about it later" link to dismiss the modal without saving.

## UI Design

- **Modal Backdrop**: Uses `fixed inset-0` with `bg-black/60` and `backdrop-blur-md` for high focus.
- **Animations**: Features `animate-fade-in` for the backdrop and `animate-scale-up` for the modal container itself.
- **Layout Constraints**: The modal is centered on the screen and max-width (`max-w-md`) constrained to `448px`.
- **Micro-Animations**: Buttons have specialized hover and active scale-down effects for better tactile feedback.

## Implementation Detail

- **Outside Click**: Clicking the backdrop closes the modal (`onClick={onClose}`).
- **Input Logic**: Uses `document.getElementById` to retrieve the workspace name from the input field for form submission.
- **Automatic Navigation**: Successfully launching a workspace automatically selects it as the active space and closes the modal.
