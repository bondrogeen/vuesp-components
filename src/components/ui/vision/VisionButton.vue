<script setup lang="ts">
import { computed } from 'vue';

const {
	to = null,
	href = null,
	type = 'button',
	variant = 'primary',
	size = 'md',
	block = false,
	disabled = false,
} = defineProps<{
	to?: string | null;
	href?: string | null;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'cyan' | 'outline' | 'ghost' | 'dark' | 'danger' | 'success' | 'white';
	size?: 'sm' | 'md' | 'lg';
	block?: boolean;
	disabled?: boolean;
}>();

const component = computed(() => {
	if (to) return 'router-link';
	if (href) return 'a';
	return 'button';
});

const sizeClass = computed(() => ({
	sm: 'h-9 px-3 text-xs',
	md: 'h-11 px-4 text-sm',
	lg: 'h-12 px-6 text-sm',
})[size]);

const variantClass = computed(() => ({
	primary: 'bg-vision-primary text-white shadow-[0_12px_32px_-14px_var(--app-accent-shadow,rgba(37,99,235,0.9))] hover:brightness-110',
	cyan: 'bg-[#28b7f0] text-[#03111f] shadow-[0_12px_32px_-14px_rgba(40,183,240,0.9)] hover:bg-[#66d3f1]',
	outline: 'border border-white/15 bg-transparent text-white hover:border-white/25 hover:bg-white/5',
	ghost: 'bg-transparent text-vision-muted hover:bg-white/5 hover:text-white',
	dark: 'border border-white/10 bg-vision-card-2 text-white hover:bg-white/5',
	danger: 'border border-vision-danger/25 bg-vision-danger/10 text-vision-danger hover:bg-vision-danger/15',
	success: 'border border-vision-success/25 bg-vision-success/10 text-vision-success hover:bg-vision-success/15',
	white: 'bg-white text-[#060b28] hover:bg-white/90',
})[variant]);

const bind = computed(() => {
	if (to) return { to };
	if (href) return { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noreferrer' : undefined };
	return { type, disabled };
});
</script>

<template>
	<component
		:is="component"
		v-bind="bind"
		class="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
		:class="[sizeClass, variantClass, block ? 'w-full' : '']"
	>
		<slot />
	</component>
</template>
