import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  icon?: "external" | "down" | "none";
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className,
}: ButtonProps) {
  const resolvedIcon = icon ?? (external ? "external" : "none");

  return (
    <a
      href={href}
      className={cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {resolvedIcon === "external" && (
        <ArrowUpRight className="icon-ext h-3.5 w-3.5" aria-hidden />
      )}
      {resolvedIcon === "down" && <ArrowDown className="icon-down h-3.5 w-3.5" aria-hidden />}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}