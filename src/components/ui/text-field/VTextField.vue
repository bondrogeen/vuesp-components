<script setup lang="ts">
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { IVTextFieldProps, IVTextFieldEmits } from '@/components/ui/text-field/types';

import { computed, onMounted, ref, useSlots } from 'vue';
import type { ComputedRef, Slots } from 'vue';
import { useTextField } from '@/components/ui/text-field/useTextField';

const props = defineProps<IVTextFieldProps>();
const emit = defineEmits<IVTextFieldEmits>();
const slots: Slots = useSlots();

const isInput = computed(() => (props.component ?? 'input') === 'input');
const effectiveMessage = computed(() => props.error || props.message || '');

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const isAutofilled = ref(false);

const checkAutofill = () => {
	const el = inputRef.value;
	if (!el) return;

	try {
		if (el.matches(':-webkit-autofill')) isAutofilled.value = true;
	} catch {
		/* selector is not supported in this browser */
	}

	try {
		if (el.matches(':autofill')) isAutofilled.value = true;
	} catch {
		/* selector is not supported in this browser */
	}
};

onMounted(() => {
	checkAutofill();
	setTimeout(checkAutofill, 50);
	setTimeout(checkAutofill, 300);
	setTimeout(checkAutofill, 1000);
});

const { isFocus, isFloating, labelClass, borderClass, contentClass, slotClass } = useTextField(props, 'field', isAutofilled);

const showIcon: ComputedRef<boolean> = computed(() => Boolean(slots.icon));
const showMessage: ComputedRef<boolean> = computed(() => !props.hideMessage);

const onBlur = (e: Event) => {
	isFocus.value = false;
	emit('blur', e);
};

const onFocus = (e: Event) => {
	isFocus.value = true;
	emit('focus', e);
};

const onInput = ({ target }: Event) => {
	isAutofilled.value = false;
	emit('update:modelValue', (target as HTMLTextAreaElement).value);
};

const onIcon = (e: Event) => {
	if (props.disabled) return;
	emit('on-icon', e);
};
</script>

<template>
	<div class="w-full relative" data-v-text-field>
		<label
			class="glass-inset relative flex w-full items-center rounded-md transition focus-within:border-cyan-main/60 focus-within:ring-1 focus-within:ring-cyan-main/20"
			:class="[slotClass, borderClass]"
		>
			<VIcon v-if="props.icon" :name="props.icon" :size="18" class="ml-3.5 shrink-0 text-gray-main" />

			<span class="absolute -translate-y-1/2 rounded transition-all" :class="labelClass">
				{{ props.label }}
			</span>

			<component
				ref="inputRef"
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
				@animationstart="checkAutofill"
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

		<div v-if="showMessage" class="h-6 px-2 text-xs" :class="props.error ? 'text-red-400' : 'text-gray-dark-25 dark:text-gray-main'">
			<slot name="message">
				{{ effectiveMessage }}
			</slot>
		</div>
	</div>
</template>
