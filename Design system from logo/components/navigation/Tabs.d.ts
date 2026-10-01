export interface TabsProps {
  items: Array<{value: string; label: string}>; value?: string; defaultValue?: string; onChange?: (value: string) => void; variant?: "underline" | "pill";
}
export function Tabs(props: TabsProps): JSX.Element;
