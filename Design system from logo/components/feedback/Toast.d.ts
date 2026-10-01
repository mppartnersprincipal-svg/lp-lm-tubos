export interface ToastProps {
  tone?: "info" | "success" | "warning" | "danger"; title: string; description?: string; onClose?: () => void; action?: React.ReactNode;
}
export function Toast(props: ToastProps): JSX.Element;
