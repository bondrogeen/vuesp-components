<template>
	<div>
		<slot
			:on-click="onClick"
			:is-open="isOpen"
		/>
	</div>
</template>

<script lang="ts" setup>
	import type { IVAccordionProps, IVAccordionEmits } from '@/components/ui/accordion/types';
	import { defineProps, defineEmits, } from 'vue';

	const { modelValue } = defineProps<IVAccordionProps>();

	const emit = defineEmits<IVAccordionEmits>();

	const isOpen = (value: string | number) => modelValue.includes(value);

	const onClick = (value: string | number) => {
		let arr = [...modelValue];
		if (arr.includes(value)) {
			arr = arr.filter(i => i !== value);
		} else {
			arr.push(value);
		}
		emit('update:modelValue', arr);
	};

</script>
