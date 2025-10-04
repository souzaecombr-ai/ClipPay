import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Rocket,
  Coins,
  TrendingUp,
  Wallet,
  Plus,
  Bell,
} from "lucide-react";
import * as htmlToImage from "html-to-image";

// Imports dos componentes manuais
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// ====== COMPONENTE PRINCIPAL ======
export default function ClipPayApp() {
  const [theme3D, setTheme3D] = useState(true);
  const [active, setActive] = useState("dashboard");

  const ganhos = useMemo(
    () => [
      { dia: "Seg", valor: 820 },
      { dia: "Ter", valor: 1220 },
      { dia: "Qua", valor: 980 },
      { dia: "Qui", valor: 1530 },
      { dia: "Sex", valor: 1710 },
      { dia: "Sáb", valor: 1420 },
      { dia: "Dom", valor: 1990 },
    ],
    []
  );

  const campanhas = useMemo(
    () => [
      { id: "CMP-3049", nome: "Promo Clipper PRO", status: "Ativa", alcance: 12500, ctr: 3.8, conv: 324 },
      { id: "CMP-3050", nome: "Sorteio Semanal", status: "Pausada", alcance: 7300, ctr: 2.1, conv: 97 },
    ],
    []
  );

  const saldo = 12873.55;
  const comissao = 3879.22;
  const sacado = 7320.0;

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(2000px_800px_at_80%_0%,#0ea5e9_0%,transparent_60%),radial-gradient(1200px_600px_at_-20%_100%,#22c55e_0%,transparent_60%),linear-gradient(160deg,#0b1020_0%,#03050c_100%)] text-white p-4">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <Rocket className="size-6 text-emerald-400" />
          <h1 className="text-xl font-semibold">Clip Pay Console</h1>
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <Label htmlFor="threeD">3D</Label>
          <Switch id="threeD" checked={theme3D} onCheckedChange={setTheme3D} />
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <div className="space-y-2">
          {[{ k: "dashboard", label: "Dashboard", icon: TrendingUp }, { k: "campanhas", label: "Campanhas", icon: Plus }, { k: "saque", label: "Saque", icon: Wallet }].map(({ k, label, icon: Icon }) => (
            <Button
              key={k}
              onClick={() => setActive(k)}
              variant={active === k ? "default" : "secondary"}
              className={`w-full justify-start gap-3 rounded-xl ${
                active === k ? "bg-gradient-to-r from-emerald-500 to-sky-500" : "bg-white/10"
              }`}
            >
              <Icon className="size-4" /> {label}
            </Button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="min-h-[400px]">
          {active === "dashboard" && <Dashboard ganhos={ganhos} saldo={saldo} comissao={comissao} sacado={sacado} theme3D={theme3D} />}
          {active === "campanhas" && <Campanhas campanhas={campanhas} />}
          {active === "saque" && <Saque saldo={saldo} comissao={comissao} sacado={sacado} />}
        </div>
      </div>
    </div>
  );
}

// ====== DASHBOARD ======
function Dashboard({ ganhos, saldo, comissao, sacado, theme3D }) {
  const flyerRef = useRef(null);
  const [flyer, setFlyer] = useState({
    titulo: "Premiação Semanal",
    premio: "R$ 1.000,00",
    subtitulo: "Para o TOP Clipador da Semana",
    data: "Domingo, 20:00h",
    regras: "Regras: mínimo 10 entregas aprovadas e CTR > 3%.",
  });

  const baixarFlyer = async () => {
    if (!flyerRef.current) return;
    const dataUrl = await htmlToImage.toPng(flyerRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "flyer-premiacao.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="grid gap-8">
      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Total ganho" valor={saldo} cor="from-emerald-500 to-sky-500" icon={Coins} />
        <Metric label="Comissão" valor={comissao} cor="from-violet-500 to-fuchsia-500" icon={TrendingUp} />
        <Metric label="Total sacado" valor={sacado} cor="from-amber-500 to-orange-500" icon={Wallet} />
      </div>

      {/* Gráfico */}
      <div className="rounded-2xl bg-white/5 p-4">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={ganhos}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
            <XAxis dataKey="dia" stroke="rgba(255,255,255,.5)" />
            <YAxis stroke="rgba(255,255,255,.5)" />
            <Tooltip contentStyle={{ background: "rgba(10,12,20,.85)", borderRadius: 12, color: "#fff" }} />
            <Area type="monotone" dataKey="valor" stroke="#22c55e" fill="url(#colorValor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Flyer editável com animação */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-0">
          <CardHeader>
            <CardTitle>Flyer de premiação</CardTitle>
            <CardDescription>100% editável e exportável</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Título" value={flyer.titulo} onChange={(e) => setFlyer({ ...flyer, titulo: e.target.value })} />
            <Input placeholder="Prêmio" value={flyer.premio} onChange={(e) => setFlyer({ ...flyer, premio: e.target.value })} />
            <Input placeholder="Subtítulo" value={flyer.subtitulo} onChange={(e) => setFlyer({ ...flyer, subtitulo: e.target.value })} />
            <Input placeholder="Data" value={flyer.data} onChange={(e) => setFlyer({ ...flyer, data: e.target.value })} />
            <Input placeholder="Regras" value={flyer.regras} onChange={(e) => setFlyer({ ...flyer, regras: e.target.value })} />
            <Button onClick={baixarFlyer} className="bg-gradient-to-r from-emerald-500 to-sky-500">📥 Baixar Flyer</Button>
          </CardContent>
        </Card>

        {/* Preview animado */}
        <motion.div
          ref={flyerRef}
          whileHover={theme3D ? { rotateY: 10, rotateX: -5, scale: 1.05 } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-center border border-white/10 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-2 text-emerald-400">{flyer.titulo}</h2>
          <p className="text-4xl font-extrabold mb-4 text-white">{flyer.premio}</p>
          <p className="text-white/80 mb-2">{flyer.subtitulo}</p>
          <p className="text-white/60 mb-4">{flyer.data}</p>
          <p className="text-xs text-white/50">{flyer.regras}</p>
        </motion.div>
      </div>
    </div>
  );
}

// ====== MÉTRICA CARD ======
function Metric({ label, valor, cor, icon: Icon }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl bg-gradient-to-br ${cor} p-4 text-white shadow-lg`}>
      <div className="flex items-center gap-3">
        <Icon className="size-5" />
        <div>
          <p className="text-xs uppercase tracking-wider opacity-80">{label}</p>
          <h2 className="text-xl font-semibold">R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h2>
        </div>
      </div>
    </div>
  );
}

// ====== CAMPANHAS ======
function Campanhas({ campanhas }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white/5 p-4">
      <table className="min-w-full text-sm text-white">
        <thead className="bg-white/10">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Alcance</th>
            <th className="p-3 text-right">CTR</th>
            <th className="p-3 text-right">Conversões</th>
          </tr>
        </thead>
        <tbody>
          {campanhas.map((c) => (
            <tr key={c.id} className="border-t border-white/10 hover:bg-white/10">
              <td className="p-3">{c.id}</td>
              <td className="p-3">{c.nome}</td>
              <td className="p-3">
                <Badge>{c.status}</Badge>
              </td>
              <td className="p-3 text-right">{c.alcance.toLocaleString()}</td>
              <td className="p-3 text-right">{c.ctr}%</td>
              <td className="p-3 text-right">{c.conv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ====== SAQUE ======
function Saque({ saldo, comissao, sacado }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-0 bg-white/5 p-4 text-white">
        <CardHeader>
          <CardTitle>Solicitar Saque</CardTitle>
          <CardDescription className="text-white/70">Transfira via Pix</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Input placeholder="Chave Pix" />
            <Input placeholder="Valor" />
            <Button className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-sky-500">Solicitar</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 bg-white/5 p-4 text-white">
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between"><span>Saldo</span><span>R$ {saldo.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Comissão</span><span>R$ {comissao.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Já Sacado</span><span>R$ {sacado.toLocaleString()}</span></div>
        </CardContent>
      </Card>
    </div>
  );
}
