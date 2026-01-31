"use client";

import React from "react"

import { useState } from "react";
import { CivicLayout } from "@/components/civic/civic-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  FileText,
  Users,
  GraduationCap,
  Heart,
  Home,
  Briefcase,
  Sprout,
  CheckCircle2,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: string[];
  documents: string[];
  howToApply: string;
  category: string;
  icon: React.ElementType;
  isSaved?: boolean;
}

const allSchemes: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    description:
      "Direct income support of Rs. 6000 per year to farmer families",
    benefits:
      "Rs. 6000 per year transferred directly to bank account in 3 installments",
    eligibility: [
      "Landholding farmer family",
      "Valid bank account",
      "Aadhaar card linked to bank",
    ],
    documents: ["Aadhaar Card", "Bank Passbook", "Land Records"],
    howToApply:
      "Visit the nearest Common Service Centre (CSC) or apply online at pmkisan.gov.in",
    category: "farmer",
    icon: Sprout,
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat PMJAY",
    description:
      "Health insurance cover of Rs. 5 lakh per family for secondary and tertiary care",
    benefits:
      "Free treatment up to Rs. 5 lakh per year at any empanelled hospital",
    eligibility: [
      "BPL family or deprivation criteria",
      "SECC database listed",
      "No government job in family",
    ],
    documents: ["Aadhaar Card", "Ration Card", "BPL Certificate"],
    howToApply:
      "Visit Ayushman Bharat Mitra at any government hospital or CSC",
    category: "health",
    icon: Heart,
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    description:
      "Affordable housing for urban and rural poor with subsidy on home loans",
    benefits: "Interest subsidy up to Rs. 2.67 lakh on home loans",
    eligibility: [
      "Annual income below Rs. 18 lakh",
      "No pucca house in family name",
      "First-time home buyer",
    ],
    documents: [
      "Income Certificate",
      "Aadhaar Card",
      "Bank Statement",
      "Property Documents",
    ],
    howToApply: "Apply through your bank or visit pmaymis.gov.in",
    category: "housing",
    icon: Home,
  },
  {
    id: "nsap",
    name: "National Social Assistance Programme",
    description:
      "Pension for elderly, widows, and persons with disabilities",
    benefits: "Monthly pension of Rs. 200-500 depending on category",
    eligibility: [
      "Age 60+ (elderly) or widow or disabled",
      "BPL family",
      "No other pension received",
    ],
    documents: ["Age Proof", "BPL Certificate", "Aadhaar Card", "Bank Passbook"],
    howToApply: "Apply at District Social Welfare Office or Block Office",
    category: "senior",
    icon: Users,
  },
  {
    id: "scholarship",
    name: "National Scholarship Portal",
    description:
      "Various scholarships for students from Class 1 to PhD level",
    benefits:
      "Financial assistance ranging from Rs. 5000 to Rs. 50000 per year",
    eligibility: [
      "Students enrolled in recognized institutions",
      "Family income criteria as per scheme",
      "Minimum attendance and marks",
    ],
    documents: [
      "Marksheet",
      "Income Certificate",
      "Caste Certificate (if applicable)",
      "Bank Account",
    ],
    howToApply: "Register at scholarships.gov.in and apply for relevant schemes",
    category: "student",
    icon: GraduationCap,
  },
  {
    id: "mudra",
    name: "PMMY - Mudra Loan",
    description:
      "Loans up to Rs. 10 lakh for small business and entrepreneurs",
    benefits:
      "Collateral-free loans: Shishu (up to 50K), Kishore (50K-5L), Tarun (5L-10L)",
    eligibility: [
      "Non-farm small business owner",
      "No previous loan default",
      "Valid business plan",
    ],
    documents: [
      "Business Plan",
      "Identity Proof",
      "Address Proof",
      "Business Registration",
    ],
    howToApply: "Apply at any bank, MFI, or through Udyamimitra portal",
    category: "worker",
    icon: Briefcase,
  },
];

type UserCategory =
  | "student"
  | "farmer"
  | "worker"
  | "senior"
  | "woman"
  | "general";

const wizardSteps = [
  {
    id: "age",
    question: "What is your age group?",
    options: [
      { value: "below18", label: "Below 18" },
      { value: "18-35", label: "18 - 35 years" },
      { value: "36-60", label: "36 - 60 years" },
      { value: "above60", label: "Above 60 years" },
    ],
  },
  {
    id: "occupation",
    question: "What is your occupation?",
    options: [
      { value: "student", label: "Student" },
      { value: "farmer", label: "Farmer" },
      { value: "worker", label: "Worker / Self-Employed" },
      { value: "unemployed", label: "Unemployed" },
      { value: "retired", label: "Retired" },
    ],
  },
  {
    id: "income",
    question: "What is your annual family income?",
    options: [
      { value: "below1l", label: "Below Rs. 1 Lakh" },
      { value: "1l-3l", label: "Rs. 1 - 3 Lakh" },
      { value: "3l-6l", label: "Rs. 3 - 6 Lakh" },
      { value: "above6l", label: "Above Rs. 6 Lakh" },
    ],
  },
  {
    id: "category",
    question: "Do you belong to any special category?",
    options: [
      { value: "general", label: "General" },
      { value: "sc", label: "SC / ST" },
      { value: "obc", label: "OBC" },
      { value: "minority", label: "Minority" },
      { value: "pwd", label: "Person with Disability" },
    ],
  },
];

export default function SchemesPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step < wizardSteps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleStartOver = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const toggleSave = (schemeId: string) => {
    setSavedSchemes((prev) =>
      prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  // Filter schemes based on answers
  const getEligibleSchemes = () => {
    const { age, occupation } = answers;
    let filtered = [...allSchemes];

    if (occupation === "student") {
      filtered = filtered.filter(
        (s) => s.category === "student" || s.category === "health"
      );
    } else if (occupation === "farmer") {
      filtered = filtered.filter(
        (s) => s.category === "farmer" || s.category === "health"
      );
    } else if (age === "above60") {
      filtered = filtered.filter(
        (s) =>
          s.category === "senior" ||
          s.category === "health" ||
          s.category === "housing"
      );
    } else if (occupation === "worker") {
      filtered = filtered.filter(
        (s) =>
          s.category === "worker" ||
          s.category === "health" ||
          s.category === "housing"
      );
    }

    return filtered;
  };

  const eligibleSchemes = getEligibleSchemes();
  const currentStep = wizardSteps[step];

  return (
    <CivicLayout>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Government Schemes Finder
          </h1>
          <p className="mt-1 text-muted-foreground">
            Answer a few simple questions to find schemes you may be eligible for
          </p>
        </div>

        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-6 flex items-center gap-2">
              {wizardSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    idx <= step ? "bg-primary" : "bg-secondary"
                  )}
                />
              ))}
            </div>

            {/* Question Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  {currentStep.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentStep.id] || ""}
                  onValueChange={(value) => handleAnswer(currentStep.id, value)}
                  className="space-y-3"
                >
                  {currentStep.options.map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all",
                        answers[currentStep.id] === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="text-base font-medium">
                        {option.label}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentStep.id]}
                className="gap-2"
              >
                {step === wizardSteps.length - 1 ? (
                  <>
                    <Search className="h-4 w-4" />
                    Find Schemes
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <Card className="mb-6 border-accent/30 bg-accent/5">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                  <Sparkles className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {eligibleSchemes.length} Schemes Found
                  </h2>
                  <p className="text-muted-foreground">
                    Based on your profile, you may be eligible for these schemes
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Schemes List */}
            <div className="space-y-4">
              {eligibleSchemes.map((scheme) => (
                <Dialog key={scheme.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <scheme.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-card-foreground">
                                {scheme.name}
                              </h3>
                              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                            </div>
                            <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                              {scheme.description}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {scheme.benefits.split(".")[0]}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <scheme.icon className="h-5 w-5 text-primary" />
                        </div>
                        {scheme.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-6">
                      {/* Description */}
                      <div>
                        <p className="text-muted-foreground">
                          {scheme.description}
                        </p>
                      </div>

                      {/* Benefits */}
                      <Card className="bg-accent/5 border-accent/30">
                        <CardContent className="p-4">
                          <h4 className="mb-2 font-semibold text-foreground">
                            Benefits
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {scheme.benefits}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Eligibility */}
                      <div>
                        <h4 className="mb-3 font-semibold text-foreground">
                          Eligibility Criteria
                        </h4>
                        <ul className="space-y-2">
                          {scheme.eligibility.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Documents */}
                      <div>
                        <h4 className="mb-3 font-semibold text-foreground">
                          Documents Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.documents.map((doc, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="gap-1"
                            >
                              <FileText className="h-3 w-3" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* How to Apply */}
                      <div>
                        <h4 className="mb-2 font-semibold text-foreground">
                          How to Apply
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {scheme.howToApply}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 bg-transparent"
                          onClick={() => toggleSave(scheme.id)}
                        >
                          <Bookmark
                            className={cn(
                              "h-4 w-4",
                              savedSchemes.includes(scheme.id) && "fill-current"
                            )}
                          />
                          {savedSchemes.includes(scheme.id) ? "Saved" : "Save"}
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {/* Start Over */}
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={handleStartOver}>
                Start Over with Different Answers
              </Button>
            </div>
          </>
        )}
      </div>
    </CivicLayout>
  );
}
