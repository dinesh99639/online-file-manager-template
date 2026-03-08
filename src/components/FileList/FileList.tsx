import React from 'react';
import { Check, MoreVertical } from 'lucide-react';
import type { FileItem, FolderItem } from '../../types';
import { renderIcon, getKindString, renderOwnerAvatar } from '../../utils';

interface FileListProps {
  displayedFolders: FolderItem[];
  displayedFiles: FileItem[];
  isSelectionMode: boolean;
  selectedIds: Set<string>;
  selectedItem: any;
  toggleItemSelection: (id: string) => void;
  navigateToFolder: (folder: FolderItem) => void;
  setSelectedItem: (item: any) => void;
  handleContextMenu: (e: React.MouseEvent, item: any, type: 'file' | 'folder' | 'background', alignToElement?: boolean) => void;
  setSelectedIds: (ids: Set<string>) => void;
}

const FileList: React.FC<FileListProps> = ({
  displayedFolders,
  displayedFiles,
  isSelectionMode,
  selectedIds,
  selectedItem,
  toggleItemSelection,
  navigateToFolder,
  setSelectedItem,
  handleContextMenu,
  setSelectedIds
}) => {
  const allIdsInView = [
    ...displayedFolders.map(f => `folder-${f.id}`),
    ...displayedFiles.map(f => `file-${f.id}`)
  ];
  const allSelected = allIdsInView.length > 0 && allIdsInView.every(id => selectedIds.has(id));

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (allSelected) {
      allIdsInView.forEach(id => newSelected.delete(id));
    } else {
      allIdsInView.forEach(id => newSelected.add(id));
    }
    setSelectedIds(newSelected);
  };

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="bg-bg-secondary rounded-t-[26px] border border-border-color border-b-0 overflow-hidden shadow-sm flex-shrink-0">
        <div className={`grid ${isSelectionMode ? "grid-cols-[48px_1.5fr_0.8fr_1fr_1fr_0.80fr_48px]" : "grid-cols-[1.5fr_0.8fr_1fr_1fr_0.80fr_48px]"} gap-4 p-4 px-8 bg-bg-tertiary/20 text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.16em] items-center`}>
          {isSelectionMode && (
            <div className="flex justify-center">
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all duration-300 shadow-sm ${allSelected ? 'bg-accent-primary border-accent-primary' : 'bg-white border-accent-primary/30 hover:border-accent-primary'}`}
                onClick={handleSelectAll}
              >
                {allSelected && <Check size={12} strokeWidth={4} className="text-white" />}
              </div>
            </div>
          )}
          <div className="pl-1.5">Name</div>
          <div className="hidden lg:block">Kind</div>
          <div className="hidden lg:block">Owner</div>
          <div className="hidden lg:block">Modified</div>
          <div className="text-right pr-4">Size</div>
          <div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-bg-secondary rounded-b-[26px] border border-border-color border-t-0 shadow-soft min-h-0">
        <div className="divide-y divide-border-color/20">
          {displayedFolders.map(folder => (
            <ListItem
              key={`folder-${folder.id}`}
              item={folder}
              type="folder"
              isSelectionMode={isSelectionMode}
              isSelected={selectedIds.has(`folder-${folder.id}`)}
              isActive={selectedItem?.id === folder.id && selectedItem?.type === 'folder'}
              onClick={(e) => {
                e.stopPropagation();
                if (isSelectionMode) {
                  toggleItemSelection(`folder-${folder.id}`);
                } else {
                  navigateToFolder(folder);
                }
              }}
              onSelectionToggle={(e) => {
                e.stopPropagation();
                toggleItemSelection(`folder-${folder.id}`);
              }}
              onContextMenu={(e) => handleContextMenu(e, folder, 'folder')}
              onMoreClick={(e) => {
                e.stopPropagation();
                handleContextMenu(e, folder, 'folder', true);
              }}
            />
          ))}
          {displayedFiles.map(file => (
            <ListItem
              key={`file-${file.id}`}
              item={file}
              type="file"
              isSelectionMode={isSelectionMode}
              isSelected={selectedIds.has(`file-${file.id}`)}
              isActive={selectedItem?.id === file.id && selectedItem?.type !== 'folder'}
              onClick={(e) => {
                e.stopPropagation();
                if (isSelectionMode) {
                  toggleItemSelection(`file-${file.id}`);
                } else {
                  setSelectedItem(file);
                }
              }}
              onSelectionToggle={(e) => {
                e.stopPropagation();
                toggleItemSelection(`file-${file.id}`);
              }}
              onContextMenu={(e) => handleContextMenu(e, file, 'file')}
              onMoreClick={(e) => {
                e.stopPropagation();
                handleContextMenu(e, file, 'file', true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ListItemProps {
  item: any;
  type: 'file' | 'folder';
  isSelectionMode: boolean;
  isSelected: boolean;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  onSelectionToggle: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onMoreClick: (e: React.MouseEvent) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  type,
  isSelectionMode,
  isSelected,
  isActive,
  onClick,
  onSelectionToggle,
  onContextMenu,
  onMoreClick
}) => {
  const itemType = type === 'folder' ? 'folder' : item.type;
  
  const activeClass = type === 'folder'
    ? 'bg-file-folder/[0.08] shadow-[inset_4px_0_0_0_var(--color-file-folder)] ring-1 ring-file-folder/20'
    : 'bg-accent-primary/[0.08] shadow-[inset_4px_0_0_0_var(--accent-primary)] ring-1 ring-accent-primary/20';

  const selectedClass = 'bg-accent-primary/[0.08] shadow-[inset_4px_0_0_0_var(--accent-primary)] ring-1 ring-accent-primary/20';

  return (
    <div
      className={`group grid ${isSelectionMode ? "grid-cols-[48px_1.5fr_0.8fr_1fr_1fr_0.80fr_48px]" : "grid-cols-[1.5fr_0.8fr_1fr_1fr_0.80fr_48px]"} gap-4 p-4 px-8 items-center cursor-pointer transition-all duration-200 hover:bg-hover-highlight relative ${isSelectionMode && isSelected ? selectedClass : isActive ? activeClass : ''}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {isSelectionMode && (
        <div className="flex justify-center">
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shadow-sm ${isSelected ? 'bg-accent-primary border-accent-primary' : 'bg-white border-accent-primary/30 hover:border-accent-primary'}`}
            onClick={onSelectionToggle}
          >
            {isSelected && <Check size={12} strokeWidth={4} className="text-white" />}
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-file-${itemType}/10 text-file-${itemType} shadow-sm transition-all`}>
          {renderIcon(itemType, 18)}
        </div>
        <span className="text-[14px] font-bold text-text-primary truncate">{item.name}</span>
      </div>
      <div className="hidden lg:block">
        <span className={`text-[10px] font-extrabold text-file-${itemType} bg-file-${itemType}/10 px-2 py-0.5 rounded-md uppercase tracking-tight`}>
          {type === 'folder' ? 'Folder' : getKindString(item.type)}
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-2.5 text-[13px] text-text-secondary font-semibold">
        {renderOwnerAvatar(item.owner)}
        <span className="truncate">{item.owner === 'me' ? 'Only me' : item.owner}</span>
      </div>
      <div className="hidden lg:block text-[13px] text-text-secondary font-medium">{item.date}</div>
      <div className="text-[13px] text-text-secondary font-bold text-right pr-4">{item.size}</div>
      <div className="flex justify-end pr-1">
        <button
          className="p-2 rounded-xl text-text-secondary hover:bg-bg-secondary hover:border-border-color border border-transparent transition-all active:scale-95"
          onClick={onMoreClick}
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default FileList;
