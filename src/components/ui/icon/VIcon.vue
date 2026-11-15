<script setup lang="ts">
import { computed } from 'vue';

import type { IIconData } from './types';
import { ICONS } from './icons';

const {
	name,
	size = 24,
	icons = {},
} = defineProps<{
	name: string;
	size?: number;
	icons?: Record<string, IIconData>;
}>();

const icon = computed<IIconData>(() => icons[name] ?? ICONS[name] ?? icons.help ?? ICONS.help);
const isStroke = computed(() => (icon.value.mode ?? 'fill') === 'stroke');
</script>

<template>
	<svg
		:width="size"
		:height="size"
		:viewBox="icon.viewBox"
		:fill="isStroke ? 'none' : 'currentColor'"
		:stroke="isStroke ? 'currentColor' : undefined"
		:stroke-width="isStroke ? (icon.strokeWidth ?? 1.8) : undefined"
		:stroke-linecap="isStroke ? (icon.strokeLinecap ?? 'round') : undefined"
		:stroke-linejoin="isStroke ? (icon.strokeLinejoin ?? 'round') : undefined"
		:stroke-miterlimit="isStroke ? (icon.strokeMiterlimit ?? 4) : undefined"
		aria-hidden="true"
		focusable="false"
		v-html="icon.body"
	/>
</template>
