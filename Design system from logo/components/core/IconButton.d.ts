export interface IconButtonProps {
  label: string; variant?: "ghost" | "outline" | "primary" | "secondary"; size?: "sm" | "md" | "lg"; disabled?: boolean; onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;
