export interface IVTooltipProps {
	timeout?: number;
	disabled?: boolean;
}

export interface IVTooltipEmits {
	(e: 'select', event: Event): void;
}
