"use client";

import React from "react"

import { useState, useEffect } from "react";

import { CivicLayout } from "@/components/civic/civic-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Droplet,
  Car,
  Zap,
  Trash2,
  Lightbulb,
  Search,
  Calendar,
  MapPin,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ComplaintStatus = "submitted" | "in-progress" | "resolved";

interface Complaint {
  id: string;
  type: string;
  typeIcon: React.ElementType;
  title: string;
  description: string;
  location: string;
  status: ComplaintStatus;
  progress: number;
  date: string;
  lastUpdate: string;
  timeline: {
    date: string;
    status: string;
    description: string;
  }[];
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP-24589631",
    type: "Water",
    typeIcon: Droplet,
    title: "No water supply for 3 days",
    description:
      "Water supply has been disrupted in our area for the past 3 days. Multiple households are affected.",
    location: "Sector 15, Noida",
    status: "in-progress",
    progress: 60,
    date: "Jan 25, 2026",
    lastUpdate: "Jan 28, 2026",
    timeline: [
      {
        date: "Jan 28, 2026",
        status: "In Progress",
        description:
          "Repair team dispatched. Estimated completion by tomorrow.",
      },
      {
        date: "Jan 27, 2026",
        status: "Assigned",
        description: "Complaint assigned to Water Department - Team B",
      },
      {
        date: "Jan 25, 2026",
        status: "Submitted",
        description: "Complaint registered successfully",
      },
    ],
  },
  {
    id: "CMP-24589542",
    type: "Roads",
    typeIcon: Car,
    title: "Large pothole causing accidents",
    description:
      "A dangerous pothole has developed near the main market. Two accidents have already occurred.",
    location: "MG Road, Near City Mall",
    status: "resolved",
    progress: 100,
    date: "Jan 20, 2026",
    lastUpdate: "Jan 24, 2026",
    timeline: [
      {
        date: "Jan 24, 2026",
        status: "Resolved",
        description: "Pothole repaired and road resurfaced",
      },
      {
        date: "Jan 22, 2026",
        status: "In Progress",
        description: "Repair work started by PWD team",
      },
      {
        date: "Jan 21, 2026",
        status: "Assigned",
        description: "Assigned to Public Works Department",
      },
      {
        date: "Jan 20, 2026",
        status: "Submitted",
        description: "Complaint registered successfully",
      },
    ],
  },
  {
    id: "CMP-24589498",
    type: "Electricity",
    typeIcon: Zap,
    title: "Frequent power cuts",
    description:
      "Experiencing power cuts multiple times daily, lasting 2-3 hours each.",
    location: "Block C, Sector 62",
    status: "submitted",
    progress: 10,
    date: "Jan 29, 2026",
    lastUpdate: "Jan 29, 2026",
    timeline: [
      {
        date: "Jan 29, 2026",
        status: "Submitted",
        description: "Complaint registered. Awaiting assignment.",
      },
    ],
  },
  {
    id: "CMP-24589387",
    type: "Sanitation",
    typeIcon: Trash2,
    title: "Garbage not collected for a week",
    description:
      "Municipal garbage collection has not happened in our colony for over a week.",
    location: "Green Park Colony",
    status: "in-progress",
    progress: 40,
    date: "Jan 23, 2026",
    lastUpdate: "Jan 26, 2026",
    timeline: [
      {
        date: "Jan 26, 2026",
        status: "In Progress",
        description: "Sanitation department notified. Collection scheduled for tomorrow.",
      },
      {
        date: "Jan 24, 2026",
        status: "Assigned",
        description: "Complaint assigned to Sanitation Department",
      },
      {
        date: "Jan 23, 2026",
        status: "Submitted",
        description: "Complaint registered successfully",
      },
    ],
  },
  {
    id: "CMP-24589276",
    type: "Street Lights",
    typeIcon: Lightbulb,
    title: "Street light not working",
    description:
      "The street light near the park entrance has not been working for 2 weeks.",
    location: "Central Park, Sector 22",
    status: "resolved",
    progress: 100,
    date: "Jan 15, 2026",
    lastUpdate: "Jan 19, 2026",
    timeline: [
      {
        date: "Jan 19, 2026",
        status: "Resolved",
        description: "New LED street light installed",
      },
      {
        date: "Jan 17, 2026",
        status: "In Progress",
        description: "Electrician assigned for repair",
      },
      {
        date: "Jan 15, 2026",
        status: "Submitted",
        description: "Complaint registered successfully",
      },
    ],
  },
];

const statusConfig = {
  submitted: {
    label: "Submitted",
    color: "bg-warning text-warning-foreground",
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-info text-info-foreground",
    icon: RefreshCw,
  },
  resolved: {
    label: "Resolved",
    color: "bg-success text-success-foreground",
    icon: CheckCircle2,
  },
};

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints");
      const data = await res.json();

      if (!data.success) return;

      const mappedComplaints: Complaint[] = data.complaints.map((c: any) => ({
        id: c._id,
        type: c.issueType,
        typeIcon:
          c.issueType === "water" ? Droplet :
          c.issueType === "roads" ? Car :
          c.issueType === "electricity" ? Zap :
          c.issueType === "sanitation" ? Trash2 :
          c.issueType === "streetlights" ? Lightbulb :
          Trash2,
        title: c.description.slice(0, 40) + "...",
        description: c.description,
        location: c.location,
        status:
          c.status === "Resolved"
            ? "resolved"
            : c.status === "In Progress"
            ? "in-progress"
            : "submitted",
        progress:
          c.status === "Resolved"
            ? 100
            : c.status === "In Progress"
            ? 60
            : 10,
        date: new Date(c.createdAt).toDateString(),
        lastUpdate: new Date(c.updatedAt).toDateString(),
        timeline: [
          {
            date: new Date(c.createdAt).toDateString(),
            status: "Submitted",
            description: "Complaint registered successfully",
          },
        ],
      }));

      setComplaints(mappedComplaints);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchComplaints();
}, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | "all">(
    "all"
  );

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
  total: complaints.length,
  submitted: complaints.filter((c) => c.status === "submitted").length,
  inProgress: complaints.filter((c) => c.status === "in-progress").length,
  resolved: complaints.filter((c) => c.status === "resolved").length,
};


  return (
    <CivicLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            My Complaints
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track the status of your submitted complaints
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-3">
          <Card
            className={cn(
              "cursor-pointer transition-all",
              filterStatus === "all" && "border-primary ring-2 ring-primary/20"
            )}
            onClick={() => setFilterStatus("all")}
          >
            <CardContent className="flex flex-col items-center p-4">
              <span className="text-2xl font-bold text-foreground">
                {stats.total}
              </span>
              <span className="text-xs text-muted-foreground">All</span>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "cursor-pointer transition-all",
              filterStatus === "submitted" &&
                "border-warning ring-2 ring-warning/20"
            )}
            onClick={() => setFilterStatus("submitted")}
          >
            <CardContent className="flex flex-col items-center p-4">
              <span className="text-2xl font-bold text-warning">
                {stats.submitted}
              </span>
              <span className="text-xs text-muted-foreground">Submitted</span>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "cursor-pointer transition-all",
              filterStatus === "in-progress" &&
                "border-info ring-2 ring-info/20"
            )}
            onClick={() => setFilterStatus("in-progress")}
          >
            <CardContent className="flex flex-col items-center p-4">
              <span className="text-2xl font-bold text-info">
                {stats.inProgress}
              </span>
              <span className="text-xs text-muted-foreground">In Progress</span>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "cursor-pointer transition-all",
              filterStatus === "resolved" &&
                "border-success ring-2 ring-success/20"
            )}
            onClick={() => setFilterStatus("resolved")}
          >
            <CardContent className="flex flex-col items-center p-4">
              <span className="text-2xl font-bold text-success">
                {stats.resolved}
              </span>
              <span className="text-xs text-muted-foreground">Resolved</span>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by Complaint ID or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 text-base"
          />
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center py-12 text-center">
                <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground">
                  No complaints found
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "You haven't submitted any complaints yet"}
                </p>
                <Button className="mt-4" onClick={() => window.location.href = "/report"}>
                  Report an Issue
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => {
              const StatusIcon = statusConfig[complaint.status].icon;
              return (
                <Dialog key={complaint.id}>
                  <DialogTrigger asChild>
                    <Card
                      className="cursor-pointer transition-all hover:shadow-md"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                            <complaint.typeIcon className="h-6 w-6 text-secondary-foreground" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <h3 className="truncate font-semibold text-card-foreground">
                                {complaint.title}
                              </h3>
                              <Badge
                                className={cn(
                                  "shrink-0 gap-1",
                                  statusConfig[complaint.status].color
                                )}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {statusConfig[complaint.status].label}
                              </Badge>
                            </div>
                            <p className="mb-2 line-clamp-1 text-sm text-muted-foreground">
                              {complaint.description}
                            </p>
                            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {complaint.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {complaint.date}
                              </span>
                              <span className="font-mono">{complaint.id}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Progress
                                value={complaint.progress}
                                className="h-2 flex-1"
                              />
                              <span className="text-xs font-medium text-muted-foreground">
                                {complaint.progress}%
                              </span>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                          <complaint.typeIcon className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <span className="block">{complaint.title}</span>
                          <span className="text-sm font-normal text-muted-foreground">
                            {complaint.id}
                          </span>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-6">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <Badge
                          className={cn(
                            "gap-1 px-3 py-1 text-sm",
                            statusConfig[complaint.status].color
                          )}
                        >
                          <StatusIcon className="h-4 w-4" />
                          {statusConfig[complaint.status].label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Updated: {complaint.lastUpdate}
                        </span>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Resolution Progress
                          </span>
                          <span className="font-medium text-foreground">
                            {complaint.progress}%
                          </span>
                        </div>
                        <Progress value={complaint.progress} className="h-3" />
                      </div>

                      {/* Details */}
                      <Card className="bg-secondary/30">
                        <CardContent className="space-y-3 p-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Description
                            </span>
                            <p className="mt-1 text-foreground">
                              {complaint.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                              {complaint.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                              Submitted: {complaint.date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Timeline */}
                      <div>
                        <h4 className="mb-4 font-semibold text-foreground">
                          Status Timeline
                        </h4>
                        <div className="space-y-4">
                          {complaint.timeline.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full",
                                    idx === 0
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-secondary-foreground"
                                  )}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </div>
                                {idx < complaint.timeline.length - 1 && (
                                  <div className="h-full w-0.5 bg-border" />
                                )}
                              </div>
                              <div className="pb-4">
                                <p className="font-medium text-foreground">
                                  {item.status}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {item.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })
          )}
        </div>
      </div>
    </CivicLayout>
  );
}
