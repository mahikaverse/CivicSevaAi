"use client";

import React from "react"

import { useState, useRef } from "react";
import { CivicLayout } from "@/components/civic/civic-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Droplet,
  Car,
  Zap,
  Trash2,
  Lightbulb,
  Building,
  Bus,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Camera,
  MapPin,
  Check,
  Mic,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IssueType =
  | "water"
  | "roads"
  | "electricity"
  | "sanitation"
  | "streetlights"
  | "drainage"
  | "transport"
  | "other";

interface IssueTypeOption {
  id: IssueType;
  title: string;
  icon: React.ElementType;
  description: string;
}

const issueTypes: IssueTypeOption[] = [
  { id: "water", title: "Water", icon: Droplet, description: "Supply, quality, leakage" },
  { id: "roads", title: "Roads", icon: Car, description: "Potholes, damage, traffic" },
  { id: "electricity", title: "Electricity", icon: Zap, description: "Power cuts, wiring" },
  { id: "sanitation", title: "Sanitation", icon: Trash2, description: "Garbage, cleaning" },
  { id: "streetlights", title: "Street Lights", icon: Lightbulb, description: "Not working, needed" },
  { id: "drainage", title: "Drainage", icon: Building, description: "Clogged, overflow" },
  { id: "transport", title: "Transport", icon: Bus, description: "Bus, metro issues" },
  { id: "other", title: "Other", icon: HelpCircle, description: "Any other issue" },
];

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<IssueType | null>(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complaintId, setComplaintId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAutoLocation = () => {
    setIsLocating(true);
    // Simulate geolocation
    setTimeout(() => {
      setLocation("Sector 15, Noida, Uttar Pradesh");
      setIsLocating(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setDescription(
        "There is a large pothole near the main market entrance. It has been causing accidents and needs immediate attention."
      );
      setIsListening(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setComplaintId(`CMP-${Date.now().toString().slice(-8)}`);
      setIsSubmitting(false);
      setStep(5);
    }, 2000);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedType !== null;
      case 2:
        return description.trim().length >= 10;
      case 3:
        return true; // Images are optional
      case 4:
        return location.trim().length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Select Problem Type
            </h2>
            <p className="text-muted-foreground">
              Choose the category that best describes your issue
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {issueTypes.map((type) => (
                <Card
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedType === type.id
                      ? "border-2 border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="flex flex-col items-center p-4 text-center">
                    <div
                      className={cn(
                        "mb-3 flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                        selectedType === type.id
                          ? "bg-primary"
                          : "bg-secondary"
                      )}
                    >
                      <type.icon
                        className={cn(
                          "h-7 w-7",
                          selectedType === type.id
                            ? "text-primary-foreground"
                            : "text-secondary-foreground"
                        )}
                      />
                    </div>
                    <h3 className="font-medium text-card-foreground">
                      {type.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Describe the Problem
            </h2>
            <p className="text-muted-foreground">
              Tell us about the issue in simple words
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your problem here. Be specific about the location and severity..."
                  className="min-h-[150px] resize-none pr-12 text-base"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-2 top-2 rounded-full",
                    isListening && "bg-destructive text-destructive-foreground animate-pulse"
                  )}
                  onClick={handleVoiceInput}
                >
                  {isListening ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {description.length}/500 characters (minimum 10)
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Upload Photos (Optional)
            </h2>
            <p className="text-muted-foreground">
              Add photos to help us understand the issue better
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Upload ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => removeImage(idx)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {images.length < 4 && (
                <Card
                  className="flex aspect-video cursor-pointer items-center justify-center border-2 border-dashed border-border transition-colors hover:border-primary hover:bg-primary/5"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <Upload className="h-6 w-6" />
                      <Camera className="h-6 w-6" />
                    </div>
                    <span className="text-sm">Upload or Take Photo</span>
                  </div>
                </Card>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Add Location
            </h2>
            <p className="text-muted-foreground">
              Enter the area or landmark where the issue is located
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="location">Location / Area / Landmark</Label>
                <div className="relative">
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Near City Hospital, Main Road"
                    className="pr-12"
                  />
                  <MapPin className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full gap-2 bg-transparent"
                onClick={handleAutoLocation}
                disabled={isLocating}
              >
                {isLocating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                {isLocating ? "Detecting Location..." : "Auto-detect My Location"}
              </Button>
            </div>
          </div>
        );

      case 5:
        if (complaintId) {
          return (
            <div className="flex flex-col items-center space-y-6 py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
                <Check className="h-10 w-10 text-accent-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Complaint Submitted!
                </h2>
                <p className="text-muted-foreground">
                  Your complaint has been successfully registered
                </p>
              </div>
              <Card className="w-full max-w-sm border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Complaint ID</p>
                  <p className="text-2xl font-bold text-primary">{complaintId}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Save this ID to track your complaint status
                  </p>
                </CardContent>
              </Card>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.location.href = "/complaints"}>
                  Track Status
                </Button>
                <Button onClick={() => window.location.href = "/"}>
                  Back to Home
                </Button>
              </div>
            </div>
          );
        }
        // Review step before submission
        const selectedTypeInfo = issueTypes.find((t) => t.id === selectedType);
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Review & Submit
            </h2>
            <p className="text-muted-foreground">
              Please review your complaint before submitting
            </p>
            <Card className="overflow-hidden">
              <CardHeader className="bg-secondary/50">
                <CardTitle className="flex items-center gap-3 text-lg">
                  {selectedTypeInfo && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <selectedTypeInfo.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                  {selectedTypeInfo?.title} Issue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <p className="mt-1 text-sm text-foreground">{description}</p>
                </div>
                {images.length > 0 && (
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Photos ({images.length})
                    </Label>
                    <div className="mt-2 flex gap-2">
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`Preview ${idx + 1}`}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Location
                  </Label>
                  <p className="mt-1 flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {location}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  Submit Complaint
                </>
              )}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CivicLayout>
      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* Progress */}
        {step < 5 || !complaintId ? (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {step} of {totalSteps}
              </span>
              <span className="font-medium text-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        ) : null}

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        {step < 5 && (
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setStep(5)}
                disabled={!canProceed()}
                className="gap-2"
              >
                Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </CivicLayout>
  );
}
