<template>
	<div>
		<div @click="onClick">
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
					<div class="m-0">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { IVAccordionItemProps, IVAccordionItemEmits } from '@/components/ui/accordion/types';
	import { defineProps, defineEmits, computed } from 'vue';

	const { value, isOpen } = defineProps<IVAccordionItemProps>();

	const emit = defineEmits<IVAccordionItemEmits>();

	const getClassTransform = computed(() => (isOpen ? 'visible  transform-[translateY(0)] ' : 'invisible transform-[translateY(-100%)]'));

	const onClick = () => emit('click', value);
</script>
