<script setup lang="ts">
import { computed, ref } from 'vue';
import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import { useI18n } from '@/composables/useI18n';
import { isValidScriptName } from '@/components/script/helpers';
import type { IScriptRenameDialogEmits, IScriptRenameDialogProps } from './types';

const { $t } = useI18n();
const { name, isBusy } = defineProps<IScriptRenameDialogProps>();
const emit = defineEmits<IScriptRenameDialogEmits>();

const value = ref(name);
const isNameValid = computed(() => isValidScriptName(value.value));

const onSave = () => {
  if (!isNameValid.value || isBusy) return;
  emit('save', value.value.toLowerCase());
};
</script>

<template>
  <VDialog size="sm" :title="$t('scriptStudio.editName')" @close="emit('close')">
    <VTextField
      v-model="value"
      size="sm"
      :label="$t('scriptStudio.id')"
      :message="$t('scriptStudio.nameHint')"
      @enter="onSave"
    />
    <div class="mt-5 flex justify-end gap-2">
      <VButton size="sm" variant="outline" color="gray" @click="emit('close')">
        {{ $t('scriptStudio.cancel') }}
      </VButton>
      <VButton size="sm" color="blue" variant="solid" :disabled="isBusy || !isNameValid" @click="onSave">
        {{ $t('save') }}
      </VButton>
    </div>
  </VDialog>
</template>
