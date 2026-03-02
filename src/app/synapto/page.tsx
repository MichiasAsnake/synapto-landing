"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Search, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";

const landingPage = {
  meta: {
    productName: "Synapto",
  },
  hero: {
    headline: "A second brain for your shop’s existing order system",
    subheadline:
      "Synapto connects to your existing shop system and scans your live orders to surface the few jobs that are actually at risk—late production, missing approvals, rush orders, or high-value clients waiting.",
    body: [
      "Instead of digging through order screens, spreadsheets, and exports, your team opens one dashboard and instantly sees what needs action today.",
    ],
    emphasis: "Built for print and embroidery shops managing dozens of active jobs.",
    primaryCta: "See how it prioritizes your work",
    secondaryCta: "Browse a sample dashboard",
    screenshotLabel: "Shop overview console",
  },
  problem: {
    name: "Problem Framing: Hidden Operational Risk",
    headline: "You can’t fix what you can’t see.",
    subheadline:
      "Most teams know they’re behind; they just don’t know which orders are quietly turning into real risk.",
    body: [
      "Every day, jobs slip from “in production” to “late” without a clear signal. Rush orders queue alongside small tickets. VIP accounts wait as long as everyone else because there’s no single view of risk across the shop.",
      "Synapto ingests your order data and continuously scores each job—late shipments, high‑value work, VIP customers, rush orders, and stalled production—so your team sees risk as a ranked list, not a collection of spreadsheets.",
    ],
    kpis: ["Late orders", "At risk", "VIP active", "Rush (48h)", "Due today"],
  },
  shopHealth: {
    name: "Shop Health Console",
    headline: "One console for your entire shop.",
    subheadline:
      "See late jobs, at‑risk revenue, VIP accounts, and this week’s performance in one view.",
    body: [
      "The Shop Overview screen brings together the numbers operations leaders actually track: how many orders are late, how many are at risk, which VIPs are active, how many rush jobs came in over the last 48 hours, and how much revenue has moved this week.",
      "Below the KPIs, Synapto lists the specific jobs driving those numbers, with flags like “Large Order Late,” “Job In Production,” and “VIP Late,” so you can jump straight from a metric to the work behind it.",
    ],
    bullets: [
      "Late & at‑risk counts",
      "Flag summary across all active jobs",
      "Orders Needing Attention, tied directly to the metrics",
    ],
    cta: "Explore the shop overview demo",
  },
  prioritizedWork: {
    name: "Prioritized Work, Not Just More Data",
    headline: "Know which jobs to work next—and why.",
    subheadline:
      "Synapto’s risk engine turns 175 active orders into a short, sorted list your team can clear.",
    body: [
      "Instead of scanning columns for overdue dates, your team sees a single table of “Orders Needing Attention.” Each row shows job value, customer, ship date, and plain‑language flags like “VIP Late,” “Large Order Late,” and “Job In Production,” plus a clear priority pill.",
      "Behind the scenes, the risk engine combines lateness, value, VIP status, rush status, and workflow signals to score each order. The result: your morning standup is no longer “what should we look at?”—it’s “how far down this list can we get today?”",
    ],
    cta: "Watch the prioritization demo",
  },
  orderDetail: {
    name: "Full Story for Every Order",
    headline: "Every job comes with its own case file.",
    subheadline:
      "From intake to shipment, see exactly what happened and who’s involved—on a single screen.",
    body: [
      "Click any row and Synapto opens a detailed view for that order: pipeline steps with timestamps, events like “Upload received” and “QC passed,” shipment and production data, and a structured summary of partner, study, modality, and priority.",
      "Instead of hunting through email threads or asking “what’s the latest on this job?”, your team can glance at the order timeline and know where it’s stuck, what’s already been done, and who to loop in next.",
    ],
    cta: "See the order detail walkthrough",
  },
  aiSection: {
    name: "Ask Operational Questions in Plain Language",
    headline: "Ask questions the way you speak.",
    subheadline:
      "“Show VIP orders at risk this week” becomes a filtered list, explanations, and suggested actions.",
    body: [
      "Synapto’s search bar and chat panel sit directly on top of your live order data. When an ops lead types “VIP orders shipping late this week,” the system parses the query into structured filters—status, customer tier, and date range—then runs a deterministic search, returning the exact jobs that match.",
      "The built‑in assistant can then explain why each one is at risk, summarize bottlenecks across all open work, or help draft a note back to the customer, powered by the same risk and health data behind the dashboard.",
    ],
    cta: "Watch the AI assistant in action",
  },
  rituals: {
    name: "Built Around Real Ops Rituals",
    headline: "Fits into the way your team already runs the shop.",
    subheadline:
      "Use it for the morning standup, afternoon triage, and weekly health review—without changing how you fulfill orders.",
    body: [
      "Most ERPs are built for back‑office accounting. Synapto is built for the people who actually move orders forward.",
      "Use the Shop Overview page to start your morning standup: review late and at‑risk counts, then walk the “Orders Needing Attention” list from top to bottom. During the day, click into individual orders to unblock issues. At the end of the week, scan revenue, VIP activity, and backlog trends to see whether the shop is getting healthier or just busier.",
    ],
    tiles: [
      {
        title: "Morning standup",
        body: "Start with Shop Health, then walk the Orders Needing Attention list from top to bottom.",
      },
      {
        title: "During the day",
        body: "Use detailed order timelines to unblock issues and keep promises realistic.",
      },
      {
        title: "Weekly health review",
        body: "Track revenue, VIP activity, and backlog trends to see whether the shop is getting healthier or just busier.",
      },
    ],
  },
  finalCta: {
    name: "Final CTA",
    headline: "See your next 40 most important orders.",
    subheadline:
      "We’ll connect Synapto to sample data or your own orders and show you exactly what it would prioritize.",
    body: [
      "In a short walkthrough, we’ll load your real order history into the console, configure the risk model to match your tolerances, and walk through a single day in your shop—from the moment you open the dashboard to the moment the last critical order is cleared.",
    ],
    primaryCta: "Request a Demo",
    secondaryCta: "Or watch a 5‑minute overview",
  },
  footer: {
    columns: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/synapto" },
          { label: "About me", href: "https://michiasasnake.framer.website" },
        ],
      },
      {
        title: "Product",
        links: [
          { label: "Features", href: "#" },
          { label: "Integrations", href: "#" },
          { label: "Checklist", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Docs", href: "#" },
          { label: "Support", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 Synapto. All rights reserved.",
  },
};

const containerClasses = "container-max";
const sectionBase =
  "w-full border-t border-zinc-900/5 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950 text-zinc-50";
const lightSectionBase =
  "w-full border-t border-zinc-200 bg-zinc-50 text-zinc-950";

function PrimaryButton({ children, href }: { children: ReactNode; href?: string }) {
  if (href) {
    return (
      <Button asChild variant="default" size="default" className="gap-2 rounded-full">
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
    );
  }
  return (
    <Button variant="default" size="default" className="gap-2 rounded-full">
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}

function SecondaryButton({ children, href }: { children: ReactNode; href?: string }) {
  if (href) {
    return (
      <Button
        asChild
        variant="secondary"
        size="default"
        className="gap-2 rounded-full border border-zinc-700/70"
      >
        <a href={href}>{children}</a>
      </Button>
    );
  }
  return (
    <Button
      variant="secondary"
      size="default"
      className="gap-2 rounded-full border border-zinc-700/70"
    >
      {children}
    </Button>
  );
}

function LightCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* NAVBAR */}
      <div className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4">
        <header className="flex w-full max-w-[1200px] items-center justify-between rounded-xl border border-zinc-200 bg-white/95 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <a href="/synapto" className="flex items-center gap-2 pl-2">
            <span className="sr-only">Synapto</span>
            <Logo className="h-7 w-auto text-zinc-950" />
          </a>
          <div className="flex items-center gap-4">
            <Button asChild className="h-9 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white shadow-none hover:bg-zinc-800">
              <a href="https://calendly.com/mickyasnake/30min" target="_blank" rel="noopener noreferrer">
                Request a Demo
              </a>
            </Button>
          </div>
        </header>
      </div>
      {/* HERO */}
      <section className={`${sectionBase} pb-16 pt-28 sm:pt-32`}>
        <div className={containerClasses}>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs font-medium text-zinc-300">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                Live shop health for ops teams
              </div>

              <div className="space-y-4">
                <h1 className="text-balance font-display text-4xl leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
                  {landingPage.hero.headline}
                </h1>
                <p className="max-w-xl text-pretty text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {landingPage.hero.subheadline}
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
                {landingPage.hero.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="font-semibold text-zinc-100">
                  {landingPage.hero.emphasis}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton href="https://calendly.com/mickyasnake/30min">{landingPage.hero.primaryCta}</PrimaryButton>
                <SecondaryButton href="/demo">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {landingPage.hero.secondaryCta}
                </SecondaryButton>
              </div>

              <p className="text-xs text-zinc-500">
                No implementation talk on the first call—just a walkthrough of
                your orders in the console.
              </p>
            </div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card>
                <div className="mb-3 flex items-center justify-between text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {landingPage.hero.screenshotLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]">
                    <Search className="h-3 w-3" aria-hidden="true" />
                    Orders, customers, delays, risk…
                  </span>
                </div>
                <div className="space-y-4 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
                      <span className="font-medium">Shop Health — Today</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                      Live sync
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 md:grid-cols-5">
                    {["Late orders", "At risk", "VIP active", "Rush (48h)", "Revenue this week"].map(
                      (label) => {
                        let value = "••";
                        if (label === "Late orders") value = "12";
                        if (label === "At risk") value = "28";
                        if (label === "VIP active") value = "4";
                        if (label === "Rush (48h)") value = "8";
                        if (label === "Revenue this week") value = "$72,256";
                        return (
                          <div
                            key={label}
                            className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-3 py-2"
                          >
                            <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 mb-2">
                              {label}
                            </div>
                            <div className="text-sm font-semibold text-zinc-50">
                              {value}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 text-xs">
                    <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
                      <span className="font-medium text-zinc-200">
                        Orders Needing Attention
                      </span>
                      <div className="inline-flex gap-1 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300">
                        <span className="rounded-full bg-zinc-800 px-2 py-0.5">
                          All (40)
                        </span>
                        <span className="px-2 py-0.5">Critical</span>
                        <span className="px-2 py-0.5">High</span>
                        <span className="px-2 py-0.5">Medium</span>
                      </div>
                    </div>
                    <div className="divide-y divide-zinc-800/80">
                      {[
                        {
                          id: "JB-4889",
                          customer: "Warner Bros",
                          value: "$12,856",
                          flags: ["Large Order Late", "Job In Production"],
                        },
                        {
                          id: "JB-4810",
                          customer: "Red Bull Racing",
                          value: "$10,362",
                          flags: ["VIP Late", "Large Order Late"],
                        },
                      ].map((row) => (
                        <div
                          key={row.id}
                          className="flex items-center gap-3 px-3 py-2.5"
                        >
                          <span className="w-16 text-zinc-200">{row.id}</span>
                          <span className="flex-1 text-zinc-300">
                            {row.customer}
                          </span>
                          <span className="w-24 text-right text-zinc-100">
                            {row.value}
                          </span>
                          <div className="flex flex-1 flex-wrap justify-end gap-1">
                            {row.flags.map((flag) => (
                              <span
                                key={flag}
                                className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-200"
                              >
                                {flag}
                              </span>
                            ))}
                            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] text-red-400">
                              Critical
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className={`${lightSectionBase} py-16 sm:py-24`}>
        <div className={containerClasses}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl text-zinc-900">
              {landingPage.problem.headline}
            </h2>
            <p className="mt-4 text-zinc-600">
              {landingPage.problem.subheadline}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-zinc-600">
              {landingPage.problem.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <LightCard>
              <div className="text-sm font-medium mb-4 text-zinc-900">Tracking Reality vs Systems</div>
              <div className="space-y-3">
                {landingPage.problem.kpis.map((kpi) => (
                  <div key={kpi} className="flex items-center justify-between border-b border-zinc-100 pb-2 last:border-0 last:pb-0">
                    <span className="text-zinc-600 text-sm">{kpi}</span>
                    <span className="font-medium text-zinc-400 text-xs uppercase tracking-wider">Unknown</span>
                  </div>
                ))}
              </div>
            </LightCard>
          </div>
        </div>
      </section>

      {/* SHOP HEALTH */}
      <section className={`${sectionBase} py-16 sm:py-24`}>
        <div className={containerClasses}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <Card>
                <div className="mb-4 text-sm font-medium text-zinc-200">Shop Overview Screen</div>
                <div className="space-y-3">
                  {landingPage.shopHealth.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      {bullet}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="order-1 flex-1 space-y-6 lg:order-2">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                {landingPage.shopHealth.headline}
              </h2>
              <p className="text-zinc-300">
                {landingPage.shopHealth.subheadline}
              </p>
              <div className="space-y-4 text-zinc-400 text-sm">
                {landingPage.shopHealth.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <PrimaryButton href="/demo">{landingPage.shopHealth.cta}</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITIZED WORK */}
      <section className={`${lightSectionBase} py-16 sm:py-24`}>
        <div className={containerClasses}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl text-zinc-900">
              {landingPage.prioritizedWork.headline}
            </h2>
            <p className="mt-4 text-zinc-600">
              {landingPage.prioritizedWork.subheadline}
            </p>
          </div>
          <div className="space-y-8">
            <div className="mx-auto max-w-3xl space-y-4 text-zinc-600 text-center">
              {landingPage.prioritizedWork.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="flex justify-center">
              <Button asChild variant="default" className="gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                <a href="/demo">
                  {landingPage.prioritizedWork.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER DETAIL */}
      <section className={`${sectionBase} py-16 sm:py-24`}>
        <div className={containerClasses}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                {landingPage.orderDetail.headline}
              </h2>
              <p className="text-zinc-300">
                {landingPage.orderDetail.subheadline}
              </p>
              <div className="space-y-4 text-zinc-400 text-sm">
                {landingPage.orderDetail.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <PrimaryButton href="/demo">{landingPage.orderDetail.cta}</PrimaryButton>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Card className="w-full max-w-sm">
                <div className="mb-4 text-sm font-medium text-zinc-200">Timeline</div>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-zinc-900 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm z-10">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-zinc-200 text-xs">QC passed</div>
                        <time className="font-medium text-violet-400 text-[10px]">10:00 AM</time>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-zinc-800/50 bg-zinc-900/50 z-10">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-zinc-400 text-xs">Upload received</div>
                        <time className="text-zinc-500 text-[10px]">09:00 AM</time>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className={`${lightSectionBase} py-16 sm:py-24`}>
        <div className={containerClasses}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <LightCard>
                <div className="flex items-center gap-3 mb-4 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600 shadow-sm">
                  <Search className="h-4 w-4 text-violet-500" />
                  VIP orders shipping late this week
                </div>
                <div className="space-y-3 pl-4 border-l-2 border-violet-100">
                  <div className="text-sm font-medium text-zinc-900">Found 3 matching orders.</div>
                  <div className="text-xs text-zinc-600 leading-relaxed">The most critical is <span className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2">JB-4810</span> for Red Bull Racing, which is currently stalled in production. Would you like me to draft an update to the account manager?</div>
                </div>
              </LightCard>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl text-zinc-900">
                {landingPage.aiSection.headline}
              </h2>
              <p className="text-zinc-600">
                {landingPage.aiSection.subheadline}
              </p>
              <div className="space-y-4 text-zinc-600 text-sm">
                {landingPage.aiSection.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Button asChild variant="default" className="gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                <a href="/demo">
                  {landingPage.aiSection.cta}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RITUALS */}
      <section className={`${sectionBase} py-16 sm:py-24`}>
        <div className={containerClasses}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              {landingPage.rituals.headline}
            </h2>
            <p className="mt-4 text-zinc-300">
              {landingPage.rituals.subheadline}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {landingPage.rituals.tiles.map((tile, i) => (
              <Card key={tile.title} className="bg-zinc-900/40">
                <div className="text-violet-400 font-medium mb-2 text-sm">0{i + 1}</div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{tile.title}</h3>
                <p className="text-sm text-zinc-400">{tile.body}</p>
              </Card>
            ))}
          </div>
          <div className="mx-auto max-w-3xl space-y-4 text-zinc-400 text-center text-sm">
            {landingPage.rituals.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${lightSectionBase} py-24`}>
        <div className={containerClasses}>
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl text-zinc-900">
              {landingPage.finalCta.headline}
            </h2>
            <p className="text-lg text-zinc-600">
              {landingPage.finalCta.subheadline}
            </p>
            <div className="text-zinc-600 max-w-2xl mx-auto space-y-4">
              {landingPage.finalCta.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <Button asChild variant="default" size="lg" className="gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                <a href="https://calendly.com/mickyasnake/30min" target="_blank" rel="noopener noreferrer">
                  {landingPage.finalCta.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="sr-only">{landingPage.meta.productName}</span>
                <Logo className="h-8 w-auto text-zinc-50" />
              </div>
            </div>
            {landingPage.footer.columns.map((col) => (
              <div key={col.title} className="space-y-4">
                <div className="text-sm font-semibold text-zinc-50">{col.title}</div>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-zinc-200 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/60 pt-8 text-xs sm:flex-row">
            <p>{landingPage.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
