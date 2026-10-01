/** @startingPoint section="Componentes" subtitle="CTA pílula com hover elevado e seta animada" viewport="700x200" */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "inverse";
  size?: "sm" | "md" | "lg";
  /** Mostra seta → que desliza no hover (use em CTAs de navegação) */
  arrow?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode; iconRight?: React.ReactNode;
  fullWidth?: boolean; disabled?: boolean; href?: string;
  onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
