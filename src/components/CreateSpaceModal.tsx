import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import type { Space } from '../types';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaces: Space[];
  setSpaces: (spaces: Space[]) => void;
  setActiveSpaceId: (id: number) => void;
}

const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  isOpen,
  onClose,
  spaces,
  setSpaces,
  setActiveSpaceId
}) => {
  if (!isOpen) return null;

  const handleLaunch = () => {
    const inputEl = document.getElementById('new-space-name') as HTMLInputElement;
    const newName = inputEl?.value || 'New Custom Space';
    const newSpace: Space = {
      id: spaces.length + 1,
      name: newName,
      used: '0 GB',
      filesCount: 0,
      bandwidth: '0 GB',
      status: 'Newly Created'
    };
    setSpaces([...spaces, newSpace]);
    setActiveSpaceId(newSpace.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-bg-secondary border border-border-color rounded-[32px] w-full max-w-md p-10 shadow-soft animate-scale-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">New Workspace</h2>
            <p className="text-sm text-text-secondary font-medium">Set up a dedicated space for your files.</p>
          </div>
          <button className="flex items-center justify-center p-2.5 rounded-2xl border border-border-color bg-bg-tertiary text-text-secondary transition-all hover:bg-bg-primary hover:text-text-primary active:scale-90" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          <div className="group">
            <label className="block text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.14em] mb-3 ml-1">Workspace Name</label>
            <div className="relative">
              <input
                id="new-space-name"
                type="text"
                className="w-full bg-bg-tertiary/50 border border-border-color/80 rounded-2xl p-4 px-5 text-sm text-text-primary outline-none transition-all placeholder:text-text-secondary/40 font-bold focus:bg-bg-secondary focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10"
                placeholder="e.g. Design Projects"
                autoFocus
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-primary opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.14em] mb-3 ml-1">Initial Quota</label>
            <div className="grid grid-cols-2 gap-3">
              {['10 GB', '50 GB', '100 GB', 'Unlimited'].map((option) => (
                <button key={option} className="p-3.5 rounded-2xl border border-border-color bg-bg-tertiary/30 text-xs font-bold text-text-secondary transition-all hover:bg-bg-secondary hover:border-accent-primary/30 hover:text-text-primary focus:bg-bg-secondary focus:border-accent-primary focus:text-accent-primary focus:ring-4 focus:ring-accent-primary/5">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-12">
          <button
            className="w-full flex items-center justify-center gap-3 bg-accent-gradient text-white p-4 rounded-2xl font-extrabold text-[15px] transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-accent-primary/25 active:translate-y-0 active:scale-[0.98] shadow-lg shadow-accent-primary/10 border border-white/10"
            onClick={handleLaunch}
          >
            Launch Workspace
            <ChevronRight size={18} />
          </button>
          <button className="w-full p-4 rounded-2xl font-bold text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all" onClick={onClose}>
            Think about it later
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpaceModal;
