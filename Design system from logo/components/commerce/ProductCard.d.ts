/** @startingPoint section="Componentes" subtitle="Card de produto do catálogo com CTA de orçamento" viewport="700x200" */
export interface ProductCardProps {
  title: string; description?: string; image?: string; badge?: string; badgeTone?: "neutral" | "primary" | "secondary" | "success" | "warning" | "danger" | "solid" | "inverse"; cta?: string; onCta?: () => void; href?: string; compact?: boolean;
}
export function ProductCard(props: ProductCardProps): JSX.Element;
