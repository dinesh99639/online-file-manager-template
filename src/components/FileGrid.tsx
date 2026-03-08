import React from 'react';
import { Check, MoreVertical } from 'lucide-react';
import type { FileItem, FolderItem } from '../types';
import { renderIcon } from '../utils';

interface FileGridProps {
  displayedFolders: FolderItem[];
  displayedFiles: FileItem[];
  isSelectionMode: boolean;
  selectedIds: Set<string>;
  selectedItem: any;
  toggleItemSelection: (id: string) => void;
  navigateToFolder: (folder: FolderItem) => void;
  setSelectedItem: (item: any) => void;
  handleContextMenu: (e: React.MouseEvent, item: any, type: 'file' | 'folder' | 'background', alignToElement?: boolean) => void;
}

const FileGrid: React.FC<FileGridProps> = ({
  displayedFolders,
  displayedFiles,
  isSelectionMode,
  selectedIds,
  selectedItem,
  toggleItemSelection,
  navigateToFolder,
  setSelectedItem,
  handleContextMenu
}) => {
  return (
    <div className="animate-fade-in grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-7 pb-10">
      {displayedFolders.map(folder => (
        <GridItem
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
        <GridItem
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
  );
};

interface GridItemProps {
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

const GridItem: React.FC<GridItemProps> = ({
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
    ? 'border-file-folder ring-2 ring-file-folder/20 bg-file-folder/[0.03] shadow-lg shadow-file-folder/10'
    : 'border-accent-primary ring-2 ring-accent-primary/20 bg-accent-primary/[0.03] shadow-lg shadow-accent-primary/10';
  
  const selectedClass = 'border-accent-primary ring-2 ring-accent-primary/20 bg-accent-primary/[0.03] shadow-lg shadow-accent-primary/10';
  
  const hoverClass = type === 'folder'
    ? 'hover:border-file-folder/40 hover:bg-bg-tertiary/20'
    : `hover:border-file-${item.type}/40 hover:bg-bg-tertiary/20`;

  return (
    <div
      className={`group bg-bg-secondary rounded-[22px] border p-3.5 transition-all duration-400 cursor-pointer hover:shadow-soft hover:-translate-y-1.5 transform-gpu relative ${isSelectionMode && isSelected ? selectedClass : isActive ? activeClass : `border-border-color ${hoverClass}`}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {isSelectionMode && (
        <div className="absolute top-4 left-4 z-[40]">
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shadow-sm ${isSelected ? 'bg-accent-primary border-accent-primary scale-110' : 'bg-white border-accent-primary/40 -rotate-6 group-hover:rotate-0 group-hover:border-accent-primary shadow-inner'}`}
            onClick={onSelectionToggle}
          >
            {isSelected && <Check size={12} strokeWidth={4} className="text-white" />}
          </div>
        </div>
      )}
      
      {isActive && (
        <div className={`absolute -top-2 -right-2 w-6 h-6 ${type === 'folder' ? 'bg-file-folder' : 'bg-accent-primary'} text-white rounded-full flex items-center justify-center shadow-lg animate-scale-up z-20`}>
          <Check size={14} strokeWidth={3} />
        </div>
      )}

      <div className="aspect-[4/3] bg-bg-tertiary/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden transition-all group-hover:bg-bg-secondary shadow-inner">
        {type === 'file' && item.preview ? (
          <img src={item.preview} alt={item.name} className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-115" loading="lazy" />
        ) : (
          <div className={`text-file-${itemType} relative z-10 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-3 filter drop-shadow-md`}>
            {renderIcon(itemType, 56)}
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br transition-opacity ${type === 'folder' ? 'from-file-folder/5 to-transparent opacity-0 group-hover:opacity-100' : 'from-black/5 to-transparent opacity-100'}`}></div>
      </div>

      <div className="flex flex-col gap-1.5 px-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-extrabold text-text-primary truncate" title={item.name}>{item.name}</span>
          <button
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg border border-border-color bg-bg-secondary text-text-secondary hover:text-text-primary transition-all active:scale-95"
            onClick={onMoreClick}
          >
            <MoreVertical size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
          {type === 'folder' ? (
            <span className="bg-file-folder/10 text-file-folder px-2 py-0.5 rounded-md">{item.items} items</span>
          ) : (
            <span className={`text-file-${item.type} opacity-80 uppercase tracking-tighter text-[10px]`}>{item.type}</span>
          )}
          <span>•</span>
          <span>{item.size}</span>
        </div>
      </div>
    </div>
  );
};

export default FileGrid;
