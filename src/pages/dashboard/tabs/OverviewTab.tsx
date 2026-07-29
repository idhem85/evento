import React, { useState, useEffect } from "react";
import { 
  Users, Scan, Store, BookOpen, TrendingUp, Clock, 
  CheckCircle2, AlertCircle, ArrowUpRight, RefreshCw 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getParticipants, getExhibitors, getPressMembers } from "@/utils/participantUtils";
import { Participant } from "../types";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

// Colors for charts
const COLORS = {
  primary: "#7c3aed",
  primaryLight: "#a78bfa",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  blue: "#3b82f6",
  amber: "#f59e0b",
  teal: "#14b8a6",
  purple: "#8b5cf6",
};

const PIE_COLORS = ["#7c3aed", "#3b82f6", "#f59e0b"];

// KPI Card component
const KpiCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  gradient: string;
  subtitle?: string;
}> = ({ title, value, change, icon: Icon, gradient, subtitle }) => (
  <Card className="relative overflow-hidden border-border/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity`} />
    <div className="relative p-5 md:p-6">
      <div className="flex items-start justify-between mb-3">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        {change && (
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="h-3 w-3" />
            {change}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{title}</p>
        {subtitle && <p className="text-[10px] text-muted-foreground/60">{subtitle}</p>}
      </div>
    </div>
  </Card>
);

// Activity item component
const ActivityItem: React.FC<{
  name: string;
  type: string;
  time: string;
  status: "scanned" | "registered";
}> = ({ name, type, time, status }) => {
  const statusConfig = {
    scanned: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", label: "Entrée validée" },
    registered: { icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", label: "Inscrit" },
  };
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3 py-2.5 group hover:bg-muted/30 rounded-lg px-2 -mx-2 transition-colors">
      <div className={`h-8 w-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{type} • {config.label}</p>
      </div>
      <span className="text-[10px] text-muted-foreground/60 shrink-0">{time}</span>
    </div>
  );
};

// Generate stable mock chart data
const generateMockChartData = () => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  });
  return last7Days.map(date => ({
    name: date,
    inscriptions: Math.floor(Math.random() * 8) + 1,
    scannes: Math.floor(Math.random() * 5),
  }));
};

const OverviewTab: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    participants: Participant[];
    exhibitors: Participant[];
    press: Participant[];
  }>({ participants: [], exhibitors: [], press: [] });
  const [chartData] = useState(generateMockChartData);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        getParticipants(),
        getExhibitors(),
        getPressMembers(),
      ]);
      setData({
        participants: results[0].status === "fulfilled" ? results[0].value : [],
        exhibitors: results[1].status === "fulfilled" ? results[1].value : [],
        press: results[2].status === "fulfilled" ? results[2].value : [],
      });
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Derived KPIs
  const totalParticipants = data.participants.length;
  const totalExhibitors = data.exhibitors.length;
  const totalPress = data.press.length;
  const grandTotal = totalParticipants + totalExhibitors + totalPress;

  const allPeople = [...data.participants, ...data.exhibitors, ...data.press];
  const scannedCount = allPeople.filter(p => p.scanned).length;
  const pendingApprovals = [...data.exhibitors, ...data.press].filter(p => p.approved === false || p.approved === undefined).length;
  const conversionRate = grandTotal > 0 ? Math.round((scannedCount / grandTotal) * 100) : 0;

  // Recent activity (last 5 scanned + registrations)
  const recentActivity = [
    ...allPeople
      .filter(p => p.scanned)
      .slice(0, 3)
      .map(p => ({ 
        name: p.name, 
        type: p.type === "exhibitor" ? "Exposant" : p.type === "press" ? "Presse" : "Visiteur",
        time: new Date(p.registrationDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
        status: "scanned" as const 
      })),
    ...allPeople
      .filter(p => !p.scanned)
      .slice(0, 2)
      .map(p => ({ 
        name: p.name, 
        type: p.type === "exhibitor" ? "Exposant" : p.type === "press" ? "Presse" : "Visiteur",
        time: new Date(p.registrationDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
        status: "registered" as const 
      })),
  ];

  // Chart data: registrations over time (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  });

  const registrationsOverTime = last7Days.map(date => {
    const dayStart = new Date(date + " 2025").getTime(); // simplified - just mock distribution
    return {
      name: date,
      inscriptions: Math.floor(Math.random() * 8) + 1,
      scannes: Math.floor(Math.random() * 5),
    };
  });

  // Type distribution for pie chart
  const typeDistribution = [
    { name: "Visiteurs", value: totalParticipants, color: PIE_COLORS[0] },
    { name: "Exposants", value: totalExhibitors, color: PIE_COLORS[1] },
    { name: "Presse", value: totalPress, color: PIE_COLORS[2] },
  ].filter(t => t.value > 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Tableau de Bord</h2>
          <p className="text-sm text-muted-foreground">Vue d'ensemble de l'événement</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadData}
          className="gap-1.5 rounded-xl text-xs"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Actualiser
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="animate-fade-in">
          <KpiCard
            title="Total Participants"
            value={grandTotal}
            icon={Users}
            gradient="from-violet-500 to-purple-600"
            subtitle="Tous types confondus"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <KpiCard
            title="Entrées Scannées"
            value={scannedCount}
            change={`${conversionRate}%`}
            icon={Scan}
            gradient="from-emerald-500 to-teal-600"
            subtitle={`${grandTotal - scannedCount} en attente`}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <KpiCard
            title="Exposants"
            value={totalExhibitors}
            icon={Store}
            gradient="from-blue-500 to-indigo-600"
            subtitle={pendingApprovals > 0 ? `${pendingApprovals} en attente` : "Tous approuvés"}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <KpiCard
            title="Presse"
            value={totalPress}
            icon={BookOpen}
            gradient="from-amber-500 to-orange-600"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Registrations Chart */}
        <Card className="lg:col-span-2 p-5 md:p-6 border-border/40 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Inscriptions (7 derniers jours)
              </h3>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="inscriptionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="scannesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.success} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="inscriptions" 
                  stroke={COLORS.primary} 
                  strokeWidth={2}
                  fill="url(#inscriptionsGrad)" 
                  name="Inscriptions"
                />
                <Area 
                  type="monotone" 
                  dataKey="scannes" 
                  stroke={COLORS.success} 
                  strokeWidth={2}
                  fill="url(#scannesGrad)" 
                  name="Scannés"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Type Distribution */}
        <Card className="p-5 md:p-6 border-border/40 space-y-4">
          <h3 className="font-semibold text-sm text-foreground">Répartition</h3>
          {typeDistribution.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {typeDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                {typeDistribution.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    {entry.name} ({entry.value})
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
              Aucune donnée
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Row: Recent Activity + Pending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card className="p-5 md:p-6 border-border/40 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Activité Récente
            </h3>
            <span className="text-[10px] text-muted-foreground">{recentActivity.length} événements</span>
          </div>
          <div className="divide-y divide-border/30">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, i) => (
                <ActivityItem key={i} {...item} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Aucune activité récente
              </p>
            )}
          </div>
        </Card>

        {/* Pending Approvals + Quick Stats */}
        <div className="space-y-4">
          {/* Pending Approvals */}
          <Card className="p-5 md:p-6 border-border/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Approbations en Attente
              </h3>
              {pendingApprovals > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                  {pendingApprovals}
                </span>
              )}
            </div>
            {pendingApprovals > 0 ? (
              <div className="space-y-2">
                {data.exhibitors.filter(p => p.approved === false || p.approved === undefined).slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-1.5">
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Exposant</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      En attente
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Toutes les demandes sont traitées
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card className="p-5 md:p-6 border-border/40 space-y-3">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Statistiques Rapides
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Taux de conversion", value: `${conversionRate}%`, color: COLORS.success },
                { label: "Visiteurs", value: totalParticipants, color: COLORS.primary },
                { label: "Taux d'approbation", value: grandTotal > 0 ? `${Math.round(((grandTotal - pendingApprovals) / grandTotal) * 100)}%` : "0%", color: COLORS.blue },
                { label: "Non scannés", value: grandTotal - scannedCount, color: COLORS.warning },
              ].map((stat) => (
                <div key={stat.label} className="bg-muted/30 rounded-xl p-3 border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
