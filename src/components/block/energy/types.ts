export interface IEnergyFlowBlockProps {
  title?: string;
  online?: boolean;
  solarPower?: number;
  gridPower?: number;
  batteryPower?: number;
  batterySoc?: number;
  loadPower?: number;
  gridVoltage?: number;
  gridFrequency?: number;
  temperature?: number;
}

export interface IEnergyFlowBlockEmits {
  refresh: [];
}
