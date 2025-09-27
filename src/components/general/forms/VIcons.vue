<template>
  <component :is="getIcon" name="Icon" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import IconAir from '@/assets/icons/Air.svg';
import IconBulb from '@/assets/icons/Bulb.svg';
import IconCamera from '@/assets/icons/Camera.svg';
import IconDots from '@/assets/icons/Dots.svg';
import IconCold from '@/assets/icons/Cold.svg';
import IconFolder from '@/assets/icons/Folder.svg';
import IconChevron from '@/assets/icons/Chevron.svg';
import IconClose from '@/assets/icons/Close.svg';
import IconDashboard from '@/assets/icons/Dashboard.svg';
import IconDevice from '@/assets/icons/Device.svg';
import IconDrop from '@/assets/icons/Drop.svg';
import IconBurger from '@/assets/icons/Burger.svg';
import IconEyeClose from '@/assets/icons/EyeClose.svg';
import IconEyeOpen from '@/assets/icons/EyeOpen.svg';
import IconFile from '@/assets/icons/File.svg';
import IconGpio from '@/assets/icons/Gpio.svg';
import IconUpdate from '@/assets/icons/Update.svg';
import IconHeater from '@/assets/icons/Heater.svg';
import IconSetting from '@/assets/icons/Setting.svg';
import IconLogo from '@/assets/icons/Logo.svg';
import IconLogoMini from '@/assets/icons/LogoMini.svg';
import IconPower from '@/assets/icons/Power.svg';
import IconTheme from '@/assets/icons/Theme.svg';
import IconLight from '@/assets/icons/Light.svg';
import IconLock from '@/assets/icons/Lock.svg';
import IconLogout from '@/assets/icons/Logout.svg';
import IconNoti from '@/assets/icons/Noti.svg';
import IconSave from '@/assets/icons/Save.svg';
import IconSearch from '@/assets/icons/Search.svg';
import IconGarage from '@/assets/icons/Garage.svg';
import IconSocket from '@/assets/icons/Socket.svg';
import IconStore from '@/assets/icons/Store.svg';
import IconTherm from '@/assets/icons/Therm.svg';
import IconTv from '@/assets/icons/Tv.svg';
import IconVent from '@/assets/icons/Vent.svg';
import IconVideo from '@/assets/icons/Video.svg';
import IconInfo from '@/assets/icons/Info.svg';
import IconPlus from '@/assets/icons/Plus.svg';

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
  IconPlus,
};

const { name } = defineProps<IProps>();

const getIcon = computed(() => (name ? icons[name] : IconTherm));
</script>
