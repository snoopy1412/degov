import { useEffect, useState } from 'react';
import { ConfigContext } from '@/hooks/useConfig';
import Error from '@/components/error';
import type { Config } from '../types/config';

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Config | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/config.json')
      .then((response) => response.json())
      .then((config) => {
        setConfig(config);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;
  if (error)
    return (
      <div className="flex h-dvh w-screen items-center justify-center">
        <Error />
      </div>
    );

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
