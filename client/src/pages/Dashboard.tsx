import { Building2, Activity, Clock, AlertCircle, TrendingUp, Package, Users, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/domain/StatsCard";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { title: "Total Coletas", value: 150, icon: Building2, color: "text-primary", bgColor: "bg-red-50" },
  { title: "Em Processamento", value: 120, icon: Activity, color: "text-green-600", bgColor: "bg-green-100" },
  { title: "Pendentes", value: 25, icon: Clock, color: "text-amber-600", bgColor: "bg-amber-100" },
  { title: "Críticas", value: 5, icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
];

const chartData = [
  { name: "Seg", coletas: 40, entregas: 24 },
  { name: "Ter", coletas: 30, entregas: 13 },
  { name: "Qua", coletas: 20, entregas: 58 },
  { name: "Qui", coletas: 27, entregas: 39 },
  { name: "Sex", coletas: 18, entregas: 48 },
  { name: "Sáb", coletas: 23, entregas: 38 },
];

export default function Dashboard() {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <PageHeader 
        title="Galpão Dashboard" 
        description="Visão geral das operações, coletas e expedições do dia." 
        icon={TrendingUp} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Fluxo Semanal</CardTitle>
            <CardDescription>Comparativo de Coletas vs Entregas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="coletas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="entregas" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Resumo Operacional</CardTitle>
            <CardDescription>Status atual do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Pedidos em Separação</p>
                <div className="w-full bg-secondary h-2 rounded-full mt-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <span className="text-sm font-bold text-muted-foreground">75%</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Equipe Ativa</p>
                <div className="w-full bg-secondary h-2 rounded-full mt-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <span className="text-sm font-bold text-muted-foreground">12/30</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Meta Diária</p>
                <div className="w-full bg-secondary h-2 rounded-full mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <span className="text-sm font-bold text-muted-foreground">90%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
