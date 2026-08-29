<script setup lang="ts">
import type { IScriptDialogProps, IScriptDialogEmits } from './types';
import type { ValidationSchema } from '@/types';
import { required, maxLen } from '@/validate/';

import { useForm } from '@/composables/';
import { onMounted } from 'vue';

const { idScript } = defineProps<IScriptDialogProps>();
const emit = defineEmits<IScriptDialogEmits>();

const { defineField, handleSubmit, isValid } = useForm({
  validationSchema: () =>
    ({
      name: [required, maxLen(8)],
    }) as ValidationSchema,
});
const [name, nameProps] = defineField<string>('name');

const addScript = () => {
  emit('add', name.value);
};

const onSubmit = handleSubmit(() => {
  addScript();
  name.value = ``;
  emit('close', new Event('close'));
});

onMounted(() => {
  if (!idScript) {
    name.value = `boot`;
  }
});
</script>

<template>
  <div class="my-4">
    <v-text-field v-model="name" v-bind="nameProps" :disabled="!idScript" :label="$t('name')" />

    <v-button class="w-full" color="blue" :disabled="!isValid" @click="onSubmit">
      {{ $t('add') }}
    </v-button>
  </div>
</template>
