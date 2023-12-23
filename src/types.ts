import type { ComponentType } from 'svelte';

export interface GalleryEntry {
  metadata: {
    title: string;
    author: string;
    direct_url: string;
    github_url?: string;
  };
  default: ComponentType;
}
