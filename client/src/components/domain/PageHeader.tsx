import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" data-testid="page-title">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
