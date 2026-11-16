export type TCardVariant = 'glass' | 'solid' | 'outline' | 'ghost';
export type TCardPadding = 'none' | 'lg';
export type TCardTone = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

export interface ICardProps {
  variant?: TCardVariant;
  padding?: TCardPadding;
  tone?: TCardTone;
  title?: string;
  subtitle?: string;
  hover?: boolean;
  disabled?: boolean;
  as?: string;
}
