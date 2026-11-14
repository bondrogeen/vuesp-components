<script setup lang="ts">
import type { IVTextFieldProps, IVTextFieldEmits } from '@/components/ui/text-field/types';

import { computed, useSlots } from 'vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';
import { useTextField } from '@/components/ui/text-field/useTextField';

const props = defineProps<IVTextFieldProps>();
const emit = defineEmits<IVTextFieldEmits>();
const slots = useSlots();

const isInput = computed(() => (props.component ?? 'input') === 'input');
const effectiveMessage = computed(() => props.error || props.message || '');

const { isFocus, isFloating, labelClass, borderClass, contentClass, slotClass } = useTextField(props, 'field');

const showIcon = computed(() => Boolean(slots.icon));
const showMessage = computed(() => !props.hideMessage);

const onBlur = (e: Event) => {
	isFocus.value = false;
	emit('blur', e);
};

const onFocus = (e: Event) => {
	isFocus.value = true;
	emit('focus', e);
};

const onInput = ({ target }: Event) => emit('update:modelValue', (target as HTMLTextAreaElement).value);

const onIcon = (e: Event) => {
	if (props.disabled) return;
	emit('on-icon', e);
};
</script>

<template>
	<div class="w-full relative">
		<label
			class="glass-inset relative flex w-full items-center rounded-md transition focus-within:border-cyan-main/60 focus-within:ring-1 focus-within:ring-cyan-main/20"
			:class="[slotClass, borderClass]"
		>
			<VisionIcon v-if="props.icon" :name="props.icon" :size="18" class="ml-3.5 shrink-0 text-gray-main" />

			<span class="absolute -translate-y-1/2 rounded transition-all" :class="labelClass">
				{{ props.label }}
			</span>

			<component
				:is="props.component ?? 'input'"
				v-bind="$attrs"
				:value="props.modelValue"
				:placeholder="isFloating ? props.placeholder : ''"
				:disabled="Boolean(props.disabled)"
				:type="props.type ?? 'text'"
				:readonly="props.readonly"
				:rows="isInput ? null : '2'"
				:wrap="isInput ? null : 'soft'"
				:class="contentClass"
				:aria-invalid="effectiveMessage ? true : undefined"
				@focus="onFocus"
				@blur="onBlur"
				@input="onInput"
				@click="emit('click', $event)"
				@keypress.enter="emit('enter', $event)"
			/>

			<button
				v-if="showIcon"
				type="button"
				:disabled="Boolean(props.disabled)"
				class="flex h-full flex-[0_0_50px] items-center justify-center rounded-r-md border-l border-gray-light-10/70 text-gray-main transition hover:text-cyan-main disabled:pointer-events-none disabled:opacity-40 dark:border-white/10"
				:class="{ 'cursor-pointer': !props.disabled }"
				@click="onIcon"
			>
				<slot name="icon"></slot>
			</button>
		</label>

		<div v-if="showMessage" class="h-[24px] px-2 text-xs" :class="props.error ? 'text-red-400' : 'text-gray-dark-25 dark:text-gray-main'">
			<slot name="message">
				{{ effectiveMessage }}
			</slot>
		</div>
	</div>
</template>
