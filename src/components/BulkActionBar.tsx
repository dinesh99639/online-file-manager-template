import { Share2, Download, Copy, Move, Trash2, X } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
  onAction: (action: string) => void;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onClear,
  onAction
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky bottom-10 left-0 right-0 z-[150] px-6 pointer-events-none animate-slide-up-docked">
      <div className="mx-auto w-fit max-w-full pointer-events-auto">
        <div className="bg-bg-secondary/90 backdrop-blur-2xl border border-border-color rounded-full p-2 px-3 shadow-lg shadow-black/10 flex items-center gap-2 ring-1 ring-white/5">

          {/* Theme-Aware Pulsar Selection Unit */}
          <div className="flex items-center gap-3 bg-bg-tertiary px-4 py-2.5 rounded-full border border-border-color mr-1 group/pulsar">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-accent-primary rounded-full animate-ping opacity-20"></div>
              <div className="w-2.5 h-2.5 bg-accent-primary rounded-full shadow-[0_0_10px_var(--accent-primary)]"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-black text-text-primary">{selectedCount}</span>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{selectedCount === 1 ? 'Item' : 'Items'}</span>
              </div>
            </div>
          </div>

          {/* Unified Command Hub with Tooltips */}
          <div className="flex items-center gap-1">
            {[
              { icon: <Share2 size={18} />, label: 'Share', color: 'hover:bg-blue-500/10 hover:text-blue-500' },
              { icon: <Download size={18} />, label: 'Download', color: 'hover:bg-emerald-500/10 hover:text-emerald-500' },
              { icon: <Copy size={18} />, label: 'Copy', color: 'hover:bg-purple-500/10 hover:text-purple-500' },
              { icon: <Move size={18} />, label: 'Move', color: 'hover:bg-orange-500/10 hover:text-orange-500' }
            ].map((action) => (
              <div key={action.label} className="relative group/btn">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-text-primary text-bg-primary text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/btn:opacity-100 translate-y-2 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-[160]">
                  {action.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-text-primary"></div>
                </div>

                <button
                  className={`flex items-center justify-center w-11 h-11 rounded-full text-text-secondary transition-all duration-300 hover:scale-110 active:scale-95 ${action.color}`}
                  onClick={() => onAction(action.label)}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>

          <div className="w-px h-6 bg-border-color mx-2"></div>

          {/* Destructive & Exit Unit */}
          <div className="flex items-center gap-1.5 pr-1">
            <div className="relative group/btn">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/btn:opacity-100 translate-y-2 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-[160]">
                Delete
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-red-500"></div>
              </div>
              <button
                className="w-11 h-11 rounded-full text-red-500 hover:bg-red-500/10 transition-all active:scale-90 flex items-center justify-center group/trash"
                onClick={() => onAction('Delete')}
              >
                <Trash2 size={20} className="group-hover/trash:rotate-12 transition-transform" />
              </button>
            </div>

            <div className="relative group/btn">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-text-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/btn:opacity-100 translate-y-2 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-[160]">
                Close
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-text-secondary"></div>
              </div>
              <button
                className="w-11 h-11 rounded-full text-text-secondary hover:bg-bg-tertiary transition-all active:scale-90 flex items-center justify-center group/close"
                onClick={onClear}
              >
                <X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;
