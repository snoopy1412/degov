import { createContext, useContext } from 'react';
import type { Config } from '@/types/config';

export const ConfigContext = createContext<Config | null>(null);

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
