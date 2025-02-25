import { create } from 'zustand';

import { INDEXER_CONFIG } from '@/config/indexer';

interface IndexerState {
  currentBlock: number;
  indexedBlock: number;
  syncPercentage: number;
  status: 'operational' | 'syncing' | 'offline';
  updateStatus: (current: number, indexed: number) => void;
}

export const useIndexerStatus = create<IndexerState>((set) => ({
  currentBlock: 0,
  indexedBlock: 0,
  syncPercentage: 0,
  status: 'offline',

  updateStatus: (current: number, indexed: number) => {
    const syncPercentage = (indexed / current) * 100;

    let status: 'operational' | 'syncing' | 'offline' = 'offline';
    if (indexed && indexed > 0) {
      status = syncPercentage >= INDEXER_CONFIG.OPERATIONAL_THRESHOLD ? 'operational' : 'syncing';
    }

    set({
      currentBlock: current,
      indexedBlock: indexed,
      syncPercentage,
      status
    });
  }
}));
