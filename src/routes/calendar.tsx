import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { SCHEDULED, PLATFORM_COLOR, PLATFORMS } from "@/lib/demo-data";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Content Calendar — SocialNxt CRM" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  // July 2026 — 1st falls on a Wednesday (idx 3 if Sun=0)
  const monthLabel = "July 2026";
  const firstWeekday = 3; // Wed
  const daysInMonth = 31;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  return (
    <AppShell
      title="Content Calendar"
      subtitle="Plan, schedule and approve content across every platform."
      actions={<Button className="rounded-xl h-10"><Plus className="h-4 w-4" /> Add Content</Button>}
    >
      <div className="card-soft p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9"><ChevronLeft className="h-4 w-4" /></Button>
            <div className="font-semibold text-lg px-2">{monthLabel}</div>
            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="sm:ml-auto flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1">Platforms:</span>
            {PLATFORMS.map((p) => (
              <button key={p} className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_COLOR[p] }} />
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-2 py-1 font-semibold">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((d, i) => {
            const items = d ? SCHEDULED.filter((s) => s.day === d) : [];
            return (
              <div
                key={i}
                className={`min-h-[110px] rounded-xl border border-border p-2 ${d ? "bg-white hover:border-primary/30 transition-colors" : "bg-muted/30"}`}
              >
                {d && (
                  <>
                    <div className="text-xs font-semibold text-foreground/80 mb-1.5">{d}</div>
                    <div className="space-y-1">
                      {items.map((it) => (
                        <div
                          key={it.id}
                          className="text-[11px] rounded-lg px-2 py-1.5 text-white truncate cursor-pointer hover:opacity-90"
                          style={{ background: PLATFORM_COLOR[it.platform] }}
                          title={`${it.title} — ${it.client}`}
                        >
                          {it.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
