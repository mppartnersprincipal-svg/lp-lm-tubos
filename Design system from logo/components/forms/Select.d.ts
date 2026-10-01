export interface SelectProps {
  label?: string; hint?: string; error?: string; placeholder?: string; options: Array<string | {value: string; label: string}>; value?: string; onChange?: (e: any) => void; id?: string;
}
export function Select(props: SelectProps): JSX.Element;
