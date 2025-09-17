<template>
  <component :is="getIcon" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import IconDots from '@/assets/icons/IconDots.svg';
import IconAir from '@/assets/icons/IconAir.svg';
import IconBulb from '@/assets/icons/IconBulb.svg';
import IconCold from '@/assets/icons/IconCold.svg';
import IconCamera from '@/assets/icons/IconCamera.svg';
import IconVent from '@/assets/icons/IconVent.svg';
import IconGarage from '@/assets/icons/IconGarage.svg';
import IconVideo from '@/assets/icons/IconVideo.svg';
import IconLight from '@/assets/icons/IconLight.svg';
import IconTv from '@/assets/icons/IconTv.svg';
import IconTherm from '@/assets/icons/IconTherm.svg';
import IconStore from '@/assets/icons/IconStore.svg';
import IconSocket from '@/assets/icons/IconSocket.svg';
import IconSearch from '@/assets/icons/IconSearch.svg';
import IconSave from '@/assets/icons/IconSave.svg';
import IconNoti from '@/assets/icons/IconNoti.svg';
import IconLogout from '@/assets/icons/IconLogout.svg';
import IconLock from '@/assets/icons/IconLock.svg';
import IconFolder from '@/assets/icons/IconFolder.svg';

interface IProps {
  name: string | undefined;
}

const icons: Record<string, unknown> = {
  IconDots,
  IconAir,
  IconBulb,
  IconCold,
  IconCamera,
  IconVent,
  IconGarage,
  IconVideo,
  IconLight,
  IconTv,
  IconTherm,
  IconStore,
  IconSocket,
  IconSearch,
  IconSave,
  IconNoti,
  IconLogout,
  IconLock,
  IconFolder,
};

const { name } = defineProps<IProps>();

const getIcon = computed(() => (name ? icons[name] : IconTherm));
</script>
