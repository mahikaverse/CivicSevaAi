"use client";

import { useState } from "react";
import { CivicLayout } from "@/components/civic/civic-layout";
import { HeroInput } from "@/components/civic/hero-input";
import { QuickActionCard } from "@/components/civic/quick-action-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  FileSearch,
  ClipboardList,
  BookOpen,
  Shield,
} from "lucide-react";

export default function HomePage() {
  const [language] = useState<"en" | "hi">("en");

  const content = {
    en: {
      heroTitle: "How can I help you today?",
      heroSubtitle:
        "Report problems, find government schemes, and get civic help in simple language.",
      quickActions: [
        {
          title: "Report a Civic Problem",
          description: "Report issues like roads, water, electricity, garbage",
          icon: AlertTriangle,
          href: "/report",
          variant: "primary" as const,
        },
        {
          title: "Find Government Schemes",
          description: "Discover schemes you may be eligible for",
          icon: FileSearch,
          href: "/schemes",
          variant: "accent" as const,
        },
        {
          title: "Track My Complaint",
          description: "Check the status of your submitted complaints",
          icon: ClipboardList,
          href: "/complaints",
          variant: "default" as const,
        },
        {
          title: "Civic Help & Guides",
          description: "Learn about your rights and civic processes",
          icon: BookOpen,
          href: "/help",
          variant: "default" as const,
        },
      ],
      stats: {
        title: "Trusted by Citizens",
        complaints: "10,000+",
        complaintsLabel: "Issues Resolved",
        schemes: "500+",
        schemesLabel: "Schemes Listed",
        cities: "50+",
        citiesLabel: "Cities Served",
      },
    },
    hi: {
      heroTitle: "मैं आज आपकी कैसे मदद कर सकता हूं?",
      heroSubtitle:
        "समस्याओं की रिपोर्ट करें, सरकारी योजनाएं खोजें, और सरल भाषा में नागरिक सहायता प्राप्त करें।",
      quickActions: [
        {
          title: "नागरिक समस्या की रिपोर्ट करें",
          description: "सड़क, पानी, बिजली, कचरा जैसी समस्याओं की रिपोर्ट करें",
          icon: AlertTriangle,
          href: "/report",
          variant: "primary" as const,
        },
        {
          title: "सरकारी योजनाएं खोजें",
          description: "उन योजनाओं की खोज करें जिनके लिए आप पात्र हो सकते हैं",
          icon: FileSearch,
          href: "/schemes",
          variant: "accent" as const,
        },
        {
          title: "मेरी शिकायत ट्रैक करें",
          description: "अपनी जमा की गई शिकायतों की स्थिति जांचें",
          icon: ClipboardList,
          href: "/complaints",
          variant: "default" as const,
        },
        {
          title: "नागरिक सहायता और गाइड",
          description: "अपने अधिकारों और नागरिक प्रक्रियाओं के बारे में जानें",
          icon: BookOpen,
          href: "/help",
          variant: "default" as const,
        },
      ],
      stats: {
        title: "नागरिकों द्वारा विश्वसनीय",
        complaints: "10,000+",
        complaintsLabel: "समस्याएं हल",
        schemes: "500+",
        schemesLabel: "योजनाएं सूचीबद्ध",
        cities: "50+",
        citiesLabel: "शहर सेवित",
      },
    },
  };

  const t = content[language];

  return (
    <CivicLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-lg">
            <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                {t.heroSubtitle}
              </p>
              <div className="w-full max-w-xl">
                <HeroInput currentLanguage={language} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.quickActions.map((action) => (
              <QuickActionCard
                key={action.href}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
                variant={action.variant}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
                {t.stats.title}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary md:text-4xl">
                    {t.stats.complaints}
                  </span>
                  <span className="text-center text-xs text-muted-foreground md:text-sm">
                    {t.stats.complaintsLabel}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-accent md:text-4xl">
                    {t.stats.schemes}
                  </span>
                  <span className="text-center text-xs text-muted-foreground md:text-sm">
                    {t.stats.schemesLabel}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary md:text-4xl">
                    {t.stats.cities}
                  </span>
                  <span className="text-center text-xs text-muted-foreground md:text-sm">
                    {t.stats.citiesLabel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </CivicLayout>
  );
}
