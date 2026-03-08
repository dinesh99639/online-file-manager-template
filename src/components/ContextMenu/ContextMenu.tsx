import { Download, Share2, Copy, Move, Edit2, Star, Trash2, Check, Plus, UploadCloud, RefreshCw } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  item: any;
  type: 'file' | 'folder' | 'background';
  isSelectionMode: boolean;
  onClose: () => void;
  toggleSelectionMode: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  item,
  type,
  isSelectionMode,
  onClose,
  toggleSelectionMode
}) => {
  return (
    <div
      id="context-menu"
      className="fixed bg-bg-secondary/90 backdrop-blur-xl border border-border-color rounded-2xl shadow-2xl z-[200] w-60 p-1.5 animate-scale-up py-2.5 overflow-hidden ring-1 ring-black/[0.1]"
      style={{ top: y, left: x }}
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
    >
      <div className="px-3 pb-2 mb-1.5 border-b border-border-color/50">
        <p className="text-[9px] font-extrabold text-text-secondary uppercase tracking-[0.18em] mb-0.5">
          {type === 'background' ? 'Workspace' : type}
        </p>
        <p className="text-[13px] font-bold text-text-primary truncate">{item?.name || 'My Files'}</p>
      </div>

      <div className="space-y-0.5">
        {type !== 'background' ? (
          <>
            <ContextMenuItem icon={<Download size={16} className="text-emerald-500" />} label="Download" onClick={onClose} />
            <ContextMenuItem icon={<Share2 size={16} className="text-blue-500" />} label="Share Link" onClick={onClose} />
            <div className="h-px bg-border-color/50 my-1.5 mx-1"></div>
            <ContextMenuItem icon={<Copy size={16} className="text-purple-500/80" />} label="Copy Item" onClick={onClose} />
            <ContextMenuItem icon={<Move size={16} className="text-orange-500/80" />} label="Move Item" onClick={onClose} />
            <ContextMenuItem icon={<Edit2 size={16} className="text-indigo-500/80" />} label="Rename" onClick={onClose} />
            <ContextMenuItem icon={<Star size={16} className="text-amber-500" />} label={item?.isStarred ? 'Unstar' : 'Add to Starred'} onClick={onClose} />
            <div className="h-px bg-border-color/50 my-1.5 mx-1"></div>
            <ContextMenuItem icon={<Trash2 size={16} className="text-red-500" />} label="Delete" onClick={onClose} danger />
          </>
        ) : (
          <>
            <button
              className="w-full flex items-center gap-3 p-2 px-3 rounded-xl text-sm font-bold text-text-primary hover:bg-bg-tertiary transition-all text-left"
              onClick={() => {
                toggleSelectionMode();
                onClose();
              }}
            >
              <Check size={16} className={isSelectionMode ? "text-accent-primary" : "text-text-secondary/30"} />
              {isSelectionMode ? 'Exit Multi-Select' : 'Select Multiple'}
            </button>
            <div className="h-px bg-border-color/50 my-1.5 mx-1"></div>
            <ContextMenuItem icon={<Plus size={16} className="text-accent-primary" />} label="New Folder" onClick={onClose} />
            <ContextMenuItem icon={<UploadCloud size={16} className="text-accent-primary" />} label="Upload Files" onClick={onClose} />
            <div className="h-px bg-border-color/50 my-1.5 mx-1"></div>
            <ContextMenuItem icon={<RefreshCw size={16} className="text-blue-500/70" />} label="Refresh View" onClick={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

interface ContextMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ icon, label, onClick, danger }) => (
  <button 
    className={`w-full flex items-center gap-3 p-2 px-3 rounded-xl text-sm font-bold transition-all text-left ${danger ? 'text-red-500 hover:bg-red-50' : 'text-text-primary hover:bg-bg-tertiary'}`} 
    onClick={onClick}
  >
    {icon} {label}
  </button>
);

export default ContextMenu;
