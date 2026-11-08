<script setup lang="ts">
import VisionIcon from './VisionIcon.vue';

const model = defineModel<string | number>({ default: '' });

const {
	label = '',
	placeholder = '',
	type = 'text',
	name = '',
	autocomplete = 'off',
	icon = '',
	error = '',
} = defineProps<{
	label?: string;
	placeholder?: string;
	type?: string;
	name?: string;
	autocomplete?: string;
	icon?: string;
	error?: string;
}>();
</script>

<template>
	<label class="block">
		<span v-if="label" class="mb-2 block text-xs font-medium text-vision-muted">{{ label }}</span>

		<span
			class="glass-inset flex items-center gap-3 rounded-md px-4 transition-colors focus-within:border-vision-primary/60"
			:class="error ? 'border-vision-danger/50' : 'border-white/10 hover:border-white/20'"
		>
			<VisionIcon v-if="icon" :name="icon" :size="18" class="shrink-0 text-vision-muted" />
			<input
				v-model="model"
				:type="type"
				:name="name"
				:placeholder="placeholder"
				:autocomplete="autocomplete"
				class="h-11 min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-vision-muted/70 focus:outline-none"
			>
		</span>

		<span v-if="error" class="mt-1 block text-xs text-vision-danger">{{ error }}</span>
	</label>
</template>
