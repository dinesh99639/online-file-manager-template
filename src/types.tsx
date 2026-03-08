import type { ReactNode } from 'react';

export interface FileItem {
  id: number;
  parentId: number | null;
  name: string;
  type: string;
  size: string;
  date: string;
  owner: string;
  isStarred?: boolean;
  isDeleted?: boolean;
  lastAccessed?: string;
  preview?: string;
}

export interface FolderItem {
  id: number;
  parentId: number | null;
  name: string;
  items: number;
  size: string;
  date: string;
  owner: string;
  isStarred?: boolean;
  isDeleted?: boolean;
  lastAccessed?: string;
}

export interface Space {
  id: number;
  name: string;
  used: string;
  filesCount: number;
  bandwidth: string;
  status: string;
}

export interface Theme {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
}
