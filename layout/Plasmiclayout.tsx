import { PropsWithChildren } from "react";
import LayoutWrapper from "./LayoutWrapper";

interface PlasmicLayoutProps {
  children: any;
}

export default function PlasmicLayout({
  children,
}: PropsWithChildren<PlasmicLayoutProps>) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
