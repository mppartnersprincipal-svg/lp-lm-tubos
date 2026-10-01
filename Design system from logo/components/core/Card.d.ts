export interface CardProps {
  variant?: "tint" | "outline" | "elevated" | "inverse"; padding?: number | string; interactive?: boolean; children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void;
}
export function Card(props: CardProps): JSX.Element;
