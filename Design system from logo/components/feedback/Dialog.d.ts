export interface DialogProps {
  open: boolean; title: string; onClose: () => void; children: React.ReactNode; footer?: React.ReactNode; width?: number;
}
export function Dialog(props: DialogProps): JSX.Element;
