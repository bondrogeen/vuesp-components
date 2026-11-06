<template>
	<div class="glass-inset overflow-hidden rounded-md">
		<div class="px-4 py-3" @click="onClick">
			<slot name="activator" />
		</div>

		<div
			class="grid overflow-hidden transition-anim"
			:class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
		>
			<div class="min-h-0">
				<div
					:class="getClassTransform"
					style="transition: transform 0.2s ease, visibility 0.2s ease"
				>
					<div class="m-0 px-4 pb-4">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { IVAccordionItemProps, IVAccordionItemEmits } from '@/components/ui/accordion/types';
	import { computed } from 'vue';

	const { value, isOpen } = defineProps<IVAccordionItemProps>();

	const emit = defineEmits<IVAccordionItemEmits>();

	const getClassTransform = computed(() => (isOpen ? 'visible  transform-[translateY(0)] ' : 'invisible transform-[translateY(-100%)]'));

	const onClick = () => emit('click', value);
</script>
