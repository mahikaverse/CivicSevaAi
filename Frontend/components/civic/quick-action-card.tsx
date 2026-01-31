"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Type as type, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "primary" | "accent";
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  variant = "default",
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "group h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
          variant === "primary" && "border-primary/30 bg-primary/5",
          variant === "accent" && "border-accent/30 bg-accent/5"
        )}
      >
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div
            className={cn(
              "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
              variant === "default" && "bg-secondary",
              variant === "primary" && "bg-primary",
              variant === "accent" && "bg-accent"
            )}
          >
            <Icon
              className={cn(
                "h-8 w-8",
                variant === "default" && "text-secondary-foreground",
                variant === "primary" && "text-primary-foreground",
                variant === "accent" && "text-accent-foreground"
              )}
            />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
