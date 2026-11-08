<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { changeTheme, localGet } from '@/helpers';

import VisionIcon from './VisionIcon.vue';

type Theme = 'dark' | 'light';

const theme = ref<Theme>(localGet('theme') === 'light' ? 'light' : 'dark');

const apply = (value: Theme): void => {
	theme.value = value;
	changeTheme(value);
};

onMounted(async () => {
	// Nuxt applies `htmlAttrs.class` during hydration, after the first client
	// tick. Re-apply the stored theme once hydration is finished.
	await nextTick();
	setTimeout(() => apply(theme.value), 0);
});
</script>

<template>
	<button
		type="button"
		class="grid size-9 place-items-center rounded-md text-gray-600 transition-colors hover:bg-white/50 hover:text-[var(--app-accent)] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
		:aria-label="theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'"
		:title="theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'"
		@click="apply(theme === 'dark' ? 'light' : 'dark')"
	>
		<VisionIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
	</button>
</template>
