export interface RadioProps {
  label: React.ReactNode; description?: string; checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; name?: string; value?: string;
}
export function Radio(props: RadioProps): JSX.Element;
