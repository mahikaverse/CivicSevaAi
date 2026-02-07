 "use client";

import { CivicLayout } from "@/components/civic/civic-layout";
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
  return (
    <CivicLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* HERO */}
        <section className="mb-12">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-lg">
            <CardContent className="flex flex-col items-center p-8 text-center md:p-12">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>

              <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                Your Smart Civic Assistant for Everyday Problems
              </h1>

              <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
                Report civic issues, discover government schemes, and get instant
                help — all in simple English + Hinglish.
              </p>

              <p className="text-muted-foreground">
                Ask anything using the chat icon below →
              </p>

            </CardContent>
          </Card>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickActionCard
              title="Report Civic Problem"
              description="Roads, water, electricity, garbage issues"
              icon={AlertTriangle}
              href="/report"
              variant="primary"
            />

            <QuickActionCard
              title="Find Government Schemes"
              description="Check schemes you are eligible for"
              icon={FileSearch}
              href="/schemes"
              variant="accent"
            />

            <QuickActionCard
              title="Track Complaint"
              description="Check status of submitted complaints"
              icon={ClipboardList}
              href="/complaints"
              variant="default"
            />

            <QuickActionCard
              title="Civic Help & Guides"
              description="Know your rights and civic processes"
              icon={BookOpen}
              href="/help"
              variant="default"
            />

          </div>
        </section>

        {/* STATS */}
        <section>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 md:p-8 text-center">
              <h2 className="mb-6 text-xl font-semibold">
                Trusted by Citizens
              </h2>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-bold text-primary">10,000+</p>
                  <p className="text-sm text-muted-foreground">
                    Complaints Resolved
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-accent">500+</p>
                  <p className="text-sm text-muted-foreground">
                    Schemes Listed
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">
                    Cities Served
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
        </section>

      </div>
    </CivicLayout>
  );
}
