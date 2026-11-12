import { getDataValue } from 'vuesp-dashboard-core';

import type { IBlockProvider } from './provider';
import type { IBlockContext } from './types';

export const createBlockContext = (
  kind: IBlockContext['kind'],
  roots: Record<string, unknown>,
  helpers?: IBlockContext['helpers'],
  meta?: Record<string, unknown>,
): IBlockContext => ({
  kind,
  roots,
  helpers,
  meta,
  get: (path: string) => getDataValue(path, roots),
});

/**
 * vuesp device state: main from the WebSocket store.
 * The same roots are used by the hub, so block configs can be shared.
 */
export const createDeviceContext = (main: Record<string, unknown>): IBlockContext => {
  const context = createBlockContext('device', {
    device: main.device ?? {},
    ports: main.ports ?? {},
    dallas: main.dallas ?? {},
    info: main.info ?? {},
    slots: main.slots ?? {},
    discovery: main.discovery ?? {},
  });

  context.helpers = {
    port: (gpio: unknown) => context.get(`ports.${String(gpio)}`),
    dallas: (address: unknown) => context.get(`dallas.${String(address)}`),
  };

  return context;
};

export const deviceProvider: IBlockProvider = {
  id: 'vuesp.device',
  label: 'Устройство vuesp',
  createContext: (source: unknown) => createDeviceContext(source as Record<string, unknown>),
};
