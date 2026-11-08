<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import VisionIcon from './VisionIcon.vue';

export interface SearchItem {
	title: string;
	to: string;
	description?: string;
	group?: string;
}

const props = withDefaults(
	defineProps<{
		items: SearchItem[];
		placeholder?: string;
		label?: string;
		dialogLabel?: string;
		emptyText?: string;
	}>(),
	{
		placeholder: 'Поиск по документации и страницам…',
		label: 'Поиск',
		dialogLabel: 'Поиск',
		emptyText: 'Ничего не найдено. Попробуйте другой запрос.',
	}
);

const open = ref(false);
const query = ref('');
const input = ref<HTMLInputElement | null>(null);

const results = computed(() => {
	const value = query.value.trim().toLowerCase();
	const items = value
		? props.items.filter((item) => `${item.title} ${item.description ?? ''} ${item.group ?? ''}`.toLowerCase().includes(value))
		: props.items;

	return items.slice(0, 14);
});

const show = async (): Promise<void> => {
	open.value = true;
	query.value = '';
	await nextTick();
	input.value?.focus();
};

const hide = (): void => {
	open.value = false;
	query.value = '';
};

const onKeydown = (event: KeyboardEvent): void => {
	if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
		event.preventDefault();
		if (open.value) hide();
		else void show();
		return;
	}

	if (event.key === 'Escape' && open.value) hide();
};

watch(open, (value) => {
	if (typeof document !== 'undefined') document.body.style.overflow = value ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', onKeydown));

onUnmounted(() => {
	window.removeEventListener('keydown', onKeydown);
	if (typeof document !== 'undefined') document.body.style.overflow = '';
});
</script>

<template>
	<button
		type="button"
		class="inline-flex h-9 items-center gap-2 rounded-md px-2.5 text-xs text-gray-500 transition-colors hover:bg-white/50 hover:text-[var(--app-accent)] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
		:aria-label="label"
		@click="show"
	>
		<VisionIcon name="search" :size="17" />
		<span class="hidden lg:inline">{{ label }}</span>
		<kbd class="hidden rounded border border-gray-300/60 px-1.5 py-0.5 font-mono text-[10px] text-gray-400 dark:border-white/10 dark:text-gray-500 lg:inline">⌘K</kbd>
	</button>

	<Teleport to="body">
		<div v-if="open" class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/40 px-4 pt-[12vh] backdrop-blur-sm dark:bg-black/60" @click.self="hide">
			<div class="glass-panel w-full max-w-2xl overflow-hidden rounded-[12px] border border-gray-200/70 bg-white/95 dark:border-white/10 dark:bg-[#0b1235]/95" role="dialog" aria-modal="true" :aria-label="dialogLabel">
				<div class="flex items-center gap-3 border-b border-gray-200/70 px-4 dark:border-white/10">
					<VisionIcon name="search" :size="18" class="shrink-0 text-gray-400" />
					<input
						ref="input"
						v-model="query"
						type="search"
						:placeholder="placeholder"
						class="h-14 min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-gray-500"
					>
					<kbd class="hidden rounded border border-gray-300/60 px-1.5 py-0.5 font-mono text-[10px] text-gray-400 dark:border-white/10 dark:text-gray-500 sm:inline">Esc</kbd>
				</div>

				<div class="max-h-[55vh] overflow-y-auto p-2">
					<a
						v-for="item of results"
						:key="`${item.group}-${item.to}-${item.title}`"
						:href="item.to"
						class="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-white/50 dark:hover:bg-white/5"
						@click="hide"
					>
						<VisionIcon name="arrowRight" :size="16" class="mt-0.5 shrink-0 text-gray-400" />
						<span class="min-w-0">
							<span class="flex flex-wrap items-baseline gap-2">
								<span class="text-sm font-medium text-gray-900 dark:text-white">{{ item.title }}</span>
								<span v-if="item.group" class="text-[10px] uppercase tracking-wider text-gray-400">{{ item.group }}</span>
							</span>
							<span v-if="item.description" class="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">{{ item.description }}</span>
						</span>
					</a>

					<p v-if="!results.length" class="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
						{{ emptyText }}
					</p>
				</div>
			</div>
		</div>
	</Teleport>
</template>
