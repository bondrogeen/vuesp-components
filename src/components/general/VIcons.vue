<template>
  <component :is="getIcon" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import IconAir from '@/assets/icons/IconAir.svg';
import IconBulb from '@/assets/icons/IconBulb.svg';
import IconCamera from '@/assets/icons/IconCamera.svg';
import IconDots from '@/assets/icons/IconDots.svg';
import IconCold from '@/assets/icons/IconCold.svg';
import IconFolder from '@/assets/icons/IconFolder.svg';
import IconChevron from '@/assets/icons/IconChevron.svg';
import IconClose from '@/assets/icons/IconClose.svg';
import IconDashboard from '@/assets/icons/IconDashboard.svg';
import IconDevice from '@/assets/icons/IconDevice.svg';
import IconDrop from '@/assets/icons/IconDrop.svg';
import IconBurger from '@/assets/icons/IconBurger.svg';
import IconEyeClose from '@/assets/icons/IconEyeClose.svg';
import IconEyeOpen from '@/assets/icons/IconEyeOpen.svg';
import IconFile from '@/assets/icons/IconFile.svg';
import IconGpio from '@/assets/icons/IconGpio.svg';
import IconUpdate from '@/assets/icons/IconUpdate.svg';
import IconHeater from '@/assets/icons/IconHeater.svg';
import IconSetting from '@/assets/icons/IconSetting.svg';
import IconLogo from '@/assets/icons/IconLogo.svg';
import IconLogoMini from '@/assets/icons/IconLogoMini.svg';
import IconPower from '@/assets/icons/IconPower.svg';
import IconTheme from '@/assets/icons/IconTheme.svg';
import IconLight from '@/assets/icons/IconLight.svg';
import IconLock from '@/assets/icons/IconLock.svg';
import IconLogout from '@/assets/icons/IconLogout.svg';
import IconNoti from '@/assets/icons/IconNoti.svg';
import IconSave from '@/assets/icons/IconSave.svg';
import IconSearch from '@/assets/icons/IconSearch.svg';
import IconGarage from '@/assets/icons/IconGarage.svg';
import IconSocket from '@/assets/icons/IconSocket.svg';
import IconStore from '@/assets/icons/IconStore.svg';
import IconTherm from '@/assets/icons/IconTherm.svg';
import IconTv from '@/assets/icons/IconTv.svg';
import IconVent from '@/assets/icons/IconVent.svg';
import IconVideo from '@/assets/icons/IconVideo.svg';
import IconInfo from '@/assets/icons/IconInfo.svg';

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
  IconChevron,
  IconClose,
  IconDashboard,
  IconDevice,
  IconDrop,
  IconBurger,
  IconEyeClose,
  IconEyeOpen,
  IconFile,
  IconGpio,
  IconUpdate,
  IconHeater,
  IconSetting,
  IconLogo,
  IconLogoMini,
  IconPower,
  IconTheme,
  IconInfo,
};

const { name } = defineProps<IProps>();

const getIcon = computed(() => (name ? icons[name] : IconTherm));
</script>
