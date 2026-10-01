export interface TooltipProps {
  content: React.ReactNode; placement?: "top" | "bottom" | "left" | "right"; children: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;
