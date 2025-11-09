export interface IVAccordionProps {
	modelValue: (string | number)[];
}

export interface IVAccordionEmits {
	(e: 'update:modelValue', event: (string | number)[]): void;
}

export interface IVAccordionItemProps {
	value: string | number;
	isOpen: boolean;
}

export interface IVAccordionItemEmits {
	(e: 'click', event: string | number): void;
}
