import type { MaybeRefOrGetter } from 'vue';
import type { IBlockProvider } from './provider';
import type { IBlockConfig, IBlockDefinition, IBlockStorage } from './types';

import { computed, onMounted, reactive, ref, toValue } from 'vue';

import { deviceProvider } from './context';
import { resolveBlockBindings } from './resolver';

export interface IUseBlockOptions {
  id?: string;
  provider?: IBlockProvider;
  storage?: IBlockStorage;
}

export const useBlock = (
  definition: IBlockDefinition,
  source: MaybeRefOrGetter<unknown>,
  options: IUseBlockOptions = {},
) => {
  const provider = options.provider ?? deviceProvider;
  const id = options.id ?? definition.defaultId ?? definition.type;

  const config = ref<IBlockConfig>({
    id,
    type: definition.type,
    provider: provider.id,
    title: definition.name,
    bindings: { ...(definition.defaults ?? {}) },
    units: {},
  });

  const context = computed(() => provider.createContext(toValue(source)));
  const data = computed(() => resolveBlockBindings(definition, config.value, context.value));
  const units = computed(() => ({ ...(config.value.units ?? {}) }));

  const load = async () => {
    if (!options.storage) return;

    try {
      const all = await options.storage.read();
      const saved = all.find((block) => block.id === id);

      if (!saved) return;

      config.value = {
        ...config.value,
        ...saved,
        id,
        type: definition.type,
        provider: provider.id,
        bindings: { ...config.value.bindings, ...saved.bindings },
      };
    } catch {
      // Keep defaults if storage is unavailable.
    }
  };

  const update = async (next: IBlockConfig) => {
    config.value = next;

    if (!options.storage) return;

    try {
      const all = await options.storage.read();
      await options.storage.write([...all.filter((block) => block.id !== next.id), next]);
    } catch {
      // The block still works with the in-memory config.
    }
  };

  onMounted(load);

  return reactive({
    config,
    context,
    data,
    units,
    load,
    update,
  });
};
