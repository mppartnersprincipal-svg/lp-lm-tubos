export interface SwitchProps {
  label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean;
}
export function Switch(props: SwitchProps): JSX.Element;
