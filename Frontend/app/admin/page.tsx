"use client";

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Droplet,
  Car,
  Zap,
  Trash2,
  MapPin,
  Users,
  FileText,
  BarChart3,
} from "lucide-react";
import { Header } from "@/components/civic/header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = {
  total: 10547,
  submitted: 892,
  inProgress: 1234,
  resolved: 8421,
  resolutionRate: 79.8,
};

const issueTypes = [
  { name: "Water", count: 3245, icon: Droplet, color: "#3b82f6" },
  { name: "Roads", count: 2876, icon: Car, color: "#ef4444" },
  { name: "Electricity", count: 1654, icon: Zap, color: "#f59e0b" },
  { name: "Sanitation", count: 1432, icon: Trash2, color: "#22c55e" },
  { name: "Others", count: 1340, icon: AlertTriangle, color: "#8b5cf6" },
];

const areaData = [
  { area: "Sector 15", count: 456, resolved: 389 },
  { area: "MG Road", count: 398, resolved: 356 },
  { area: "Central Park", count: 367, resolved: 312 },
  { area: "Green Colony", count: 289, resolved: 245 },
  { area: "Block C", count: 256, resolved: 198 },
];

const dailyTrends = [
  { day: "Mon", submitted: 145, resolved: 132 },
  { day: "Tue", submitted: 178, resolved: 156 },
  { day: "Wed", submitted: 156, resolved: 167 },
  { day: "Thu", submitted: 189, resolved: 145 },
  { day: "Fri", submitted: 167, resolved: 178 },
  { day: "Sat", submitted: 134, resolved: 189 },
  { day: "Sun", submitted: 98, resolved: 156 },
];

const pieData = [
  { name: "Resolved", value: stats.resolved, color: "#22c55e" },
  { name: "In Progress", value: stats.inProgress, color: "#3b82f6" },
  { name: "Submitted", value: stats.submitted, color: "#f59e0b" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Analytics and overview of civic complaints
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.total.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10">
                <Clock className="h-7 w-7 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-warning">
                  {(stats.submitted + stats.inProgress).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold text-success">
                  {stats.resolved.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <p className="text-3xl font-bold text-accent">
                  {stats.resolutionRate}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Issue Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Issues by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issueTypes.map((type) => (
                  <div key={type.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <type.icon
                          className="h-4 w-4"
                          style={{ color: type.color }}
                        />
                        <span className="font-medium text-foreground">
                          {type.name}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {type.count.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(type.count / stats.total) * 100}
                      className="h-2"
                      style={
                        {
                          "--progress-foreground": type.color,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resolution Status Pie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Resolution Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center gap-6">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Daily Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyTrends}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="submitted"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ fill: "#f59e0b" }}
                      name="Submitted"
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: "#22c55e" }}
                      name="Resolved"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Area-wise Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Area-wise Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaData} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="area"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#3b82f6"
                      name="Total"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="resolved"
                      fill="#22c55e"
                      name="Resolved"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
