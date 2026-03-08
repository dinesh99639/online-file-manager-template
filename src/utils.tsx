import {
  FolderOpen, GalleryVertical, FileText, Clapperboard, Package, FileSpreadsheet, File as FileIcon
} from 'lucide-react';
import { FILE_COLORS } from './constants';

export const renderIcon = (type: string, size = 20) => {
  const color = FILE_COLORS[type] || FILE_COLORS.default;
  const props = {
    size,
    fill: color,
    fillOpacity: 0.12,
    strokeWidth: 1.75,
    style: { color: color }
  };
  switch (type) {
    case 'folder': return <FolderOpen {...props} />;
    case 'image': return <GalleryVertical {...props} />;
    case 'doc': return <FileText {...props} />;
    case 'video': return <Clapperboard {...props} />;
    case 'archive': return <Package {...props} />;
    case 'spreadsheet': return <FileSpreadsheet {...props} />;
    default: return <FileIcon {...props} />;
  }
};

export const getKindString = (type: string) => {
  switch (type) {
    case 'folder': return 'Folder';
    case 'image': return 'Image';
    case 'doc': return 'Document';
    case 'video': return 'Video';
    case 'archive': return 'Archive';
    case 'spreadsheet': return 'Spreadsheet';
    default: return 'File';
  }
};

export const renderOwnerAvatar = (owner: string) => {
  if (owner === 'me') {
    return <img src="https://ui-avatars.com/api/?name=Dinesh&background=6366f1&color=fff" alt="me" className="w-6 h-6 rounded-full object-cover mr-2" />;
  }
  return <div className="w-6 h-6 rounded-full bg-bg-tertiary text-text-secondary flex items-center justify-center text-[10px] mr-2 font-bold">{owner.charAt(0)}</div>;
};
