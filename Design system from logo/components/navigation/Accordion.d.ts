export interface AccordionProps { items: Array<{title: string; content: React.ReactNode}>; defaultOpen?: number | null; multiple?: boolean; }
export function Accordion(props: AccordionProps): JSX.Element;
