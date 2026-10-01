export interface BadgeProps {
  tone?: "neutral" | "primary" | "secondary" | "success" | "warning" | "danger" | "solid" | "inverse"; children: React.ReactNode; style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
