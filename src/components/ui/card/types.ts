export type CardVariant = 'glass' | 'solid' | 'outline' | 'ghost';
export type CardPadding = 'none' | 'lg';
export type CardTone = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

export interface ICardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  tone?: CardTone;
  title?: string;
  subtitle?: string;
  hover?: boolean;
  disabled?: boolean;
  as?: string;
}
