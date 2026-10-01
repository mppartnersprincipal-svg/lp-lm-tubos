export interface InputProps {
  label?: string; hint?: string; error?: string; placeholder?: string; value?: string; multiline?: boolean; rows?: number; type?: string; onChange?: (e: any) => void; id?: string; style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
