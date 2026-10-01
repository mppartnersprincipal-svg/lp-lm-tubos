export interface CheckboxProps {
  label: React.ReactNode; description?: string; checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; name?: string; value?: string;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
