<script setup lang="ts">
import type { IVTextWrapperProps, IVTextWrapperEmits } from '@/components/ui/text-field/types';

import { useTextField } from '@/components/ui/text-field/useTextField';

const props = defineProps<IVTextWrapperProps>();
const emit = defineEmits<IVTextWrapperEmits>();

const { labelClass, borderClass, contentClass, slotClass } = useTextField(props, 'wrapper');
</script>

<template>
	<div class="flex w-full relative">
		<div
			class="glass-inset relative flex w-full items-center rounded-md transition focus-within:border-cyan-main/60"
			:class="[slotClass, borderClass]"
		>
			<span class="absolute -translate-y-1/2 rounded transition-all" :class="labelClass">
				{{ props.label }}
			</span>

			<div :class="contentClass">
				<slot></slot>
			</div>

			<button
				v-if="!props.hideIcon"
				type="button"
				:disabled="props.disabled || props.iconDisabled"
				:aria-label="props.iconLabel || undefined"
				:title="props.iconLabel || undefined"
				class="flex h-full flex-[0_0_50px] items-center justify-center rounded-r-md border-l border-gray-light-10 text-gray-main transition hover:text-cyan-main disabled:pointer-events-none disabled:opacity-40 dark:border-white/10"
				:class="{ 'cursor-pointer': !props.disabled && !props.iconDisabled }"
				@click="emit('icon', $event)"
			>
				<slot name="icon">
					<icon-ri-add-line class="size-4" />
				</slot>
			</button>
		</div>
	</div>
</template>
