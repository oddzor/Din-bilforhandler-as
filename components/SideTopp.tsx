import type { ReactNode } from "react";

interface SideToppProps {
  tittel: string;
  ingress: string;
  /** knapper eller lenker under ingressen */
  children?: ReactNode;
}

/** Felles topp for undersidene: overskrift, ingress og eventuelle handlinger. */
export default function SideTopp({ tittel, ingress, children }: SideToppProps) {
  return (
    <div className="topp">
      <h1>{tittel}</h1>
      <p className="lead">{ingress}</p>
      {children && <div className="topp-act">{children}</div>}
    </div>
  );
}
