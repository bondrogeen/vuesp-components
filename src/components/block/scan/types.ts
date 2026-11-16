export interface IScanItem {
  id?: number;
  ssid?: string;
  name?: string;
  channel?: number;
  rssi?: number;
  encryptionType?: number;
  isHidden?: number;
}

export interface IBlockScanProps {
  items?: IScanItem[];
}

export interface IBlockScanEmit {
  (e: 'scan', event: Event): void;
  (e: 'select', event: IScanItem): void;
}
