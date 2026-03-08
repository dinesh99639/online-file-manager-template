import React from 'react';
import { X, Share2, Download } from 'lucide-react';
import { renderIcon, getKindString, renderOwnerAvatar } from '../utils';

interface FileDetailsPanelProps {
  selectedItem: any;
  setSelectedItem: (item: any) => void;
}

const FileDetailsPanel: React.FC<FileDetailsPanelProps> = ({
  selectedItem,
  setSelectedItem
}) => {
  return (
    <aside className="w-[340px] bg-bg-secondary border-l border-border-color flex flex-col overflow-y-auto z-5 hidden lg:flex shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.02)]" onClick={(e) => e.stopPropagation()}>
      {selectedItem ? (
        <div className="animate-fade-in flex flex-col h-full">
          <div className="p-8 pb-4 flex items-center justify-between sticky top-0 bg-bg-secondary/80 backdrop-blur-md z-10">
            <h2 className="text-[18px] font-extrabold text-text-primary tracking-tight">Information</h2>
            <button className="flex items-center justify-center p-2 rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all active:scale-90" onClick={() => setSelectedItem(null)}>
              <X size={18} />
            </button>
          </div>

          <div className="p-8 pt-2">
            <div className="aspect-square bg-bg-tertiary/50 rounded-[32px] mb-8 flex items-center justify-center overflow-hidden shadow-inner border border-border-color/50 group relative">
              {selectedItem.preview ? (
                <img src={selectedItem.preview} alt={selectedItem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-file-${selectedItem.type === 'folder' ? 'folder' : selectedItem.type} transform transition-transform group-hover:scale-110 duration-500`}>
                  {renderIcon(selectedItem.type === 'folder' ? 'folder' : selectedItem.type, 96)}
                </div>
              )}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="mb-10 text-center">
              <h3 className="text-xl font-extrabold text-text-primary mb-1.5 break-words line-clamp-2 px-2" title={selectedItem.name}>{selectedItem.name}</h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-tertiary rounded-full text-[11px] font-extrabold text-text-secondary uppercase tracking-widest border border-border-color/50">
                {selectedItem.type === 'folder' ? 'Folder' : getKindString(selectedItem.type)}
              </div>
            </div>

            <div className="flex gap-3 mb-10">
              <button className="flex-1 flex items-center justify-center gap-2.5 bg-bg-tertiary text-text-secondary p-3.5 rounded-2xl font-bold text-sm transition-all hover:bg-bg-primary hover:text-text-primary border border-border-color shadow-sm active:scale-95 group">
                <Share2 size={16} className="group-hover:rotate-12 transition-transform" /> Share
              </button>
              <button className="flex-1 flex items-center justify-center gap-2.5 bg-accent-gradient text-white p-3.5 rounded-2xl font-bold text-sm transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-accent-primary/20 active:translate-y-0 active:scale-95 shadow-md shadow-accent-primary/10 group">
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> Save
              </button>
            </div>

            <div className="space-y-6 pt-6 border-t border-border-color/50">
              <DetailRow label="Size" value={selectedItem.size || '--'} />
              <DetailRow label="Modified" value={selectedItem.date || '--'} />
              <div className="flex items-center justify-between group">
                <span className="text-[11px] uppercase font-extrabold text-text-secondary tracking-[0.15em]">Owner</span>
                <div className="flex items-center gap-2 bg-bg-tertiary/50 px-2 py-1 rounded-lg transition-colors group-hover:bg-bg-tertiary">
                  {selectedItem.owner && renderOwnerAvatar(selectedItem.owner)}
                  <span className="text-[13px] text-text-primary font-bold truncate max-w-[100px]">{selectedItem.owner === 'me' ? 'Only me' : selectedItem.owner}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in opacity-60">
          <div className="w-24 h-24 bg-bg-tertiary rounded-[32px] flex items-center justify-center text-text-secondary mb-6 border border-border-color/50">
            {renderIcon('doc', 36)}
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">No selection</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Select a file or folder to view its detailed information and actions.
          </p>
        </div>
      )}
    </aside>
  );
};

const DetailRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between group">
    <span className="text-[11px] uppercase font-extrabold text-text-secondary tracking-[0.15em]">{label}</span>
    <span className="text-[13px] text-text-primary font-bold bg-bg-tertiary/50 px-2.5 py-1 rounded-lg transition-colors group-hover:bg-bg-tertiary">{value}</span>
  </div>
);

export default FileDetailsPanel;
