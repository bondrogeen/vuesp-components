<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { changeTheme, localGet } from '@/helpers';

import VisionIcon from './VisionIcon.vue';

type Theme = 'dark' | 'light';

withDefaults(
	defineProps<{
		labelLight?: string;
		labelDark?: string;
		titleLight?: string;
		titleDark?: string;
	}>(),
	{
		labelLight: 'Включить светлую тему',
		labelDark: 'Включить тёмную тему',
		titleLight: 'Светлая тема',
		titleDark: 'Тёмная тема',
	}
);

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
		:aria-label="theme === 'dark' ? labelLight : labelDark"
		:title="theme === 'dark' ? titleLight : titleDark"
		@click="apply(theme === 'dark' ? 'light' : 'dark')"
	>
		<VisionIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
	</button>
</template>
