import { type ReactNode } from "react";

type ViewportSectionProps = {
  id: string;
  minHeight: string;
  children: ReactNode;
};

const ViewportSection = ({
  id,
  minHeight,
  children,
}: ViewportSectionProps) => {
  return (
    <div id={id} className="w-full" style={{ minHeight }}>
      {children}
    </div>
  );
};

export default ViewportSection;
