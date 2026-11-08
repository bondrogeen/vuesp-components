<script setup lang="ts">
import { computed } from 'vue';

const { padded = true } = defineProps<{
	padded?: boolean;
}>();

const paddingClass = computed(() => (padded ? 'p-5 md:p-6' : ''));
</script>

<template>
	<div class="glass-panel" :class="paddingClass">
		<slot />
	</div>
</template>
