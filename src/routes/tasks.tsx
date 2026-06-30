import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { TASKS } from "@/lib/demo-data";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks — SocialNxt CRM" }] }),
  component: TasksPage,
});

const PRIORITY_TONE: Record<string, string> = {
  Low: "bg-[#10B981]/10 text-[#047857]",
  Medium: "bg-[#F59E0B]/10 text-[#B45309]",
  High: "bg-[#EF4444]/10 text-[#B91C1C]",
};
const STATUS_TONE: Record<string, string> = {
  Pending: "bg-muted text-foreground/70",
  "In Progress": "bg-primary/10 text-primary",
  Completed: "bg-[#10B981]/10 text-[#047857]",
};

function TasksPage() {
  const counts = {
    all: TASKS.length,
    pending: TASKS.filter((t) => t.status === "Pending").length,
    progress: TASKS.filter((t) => t.status === "In Progress").length,
    done: TASKS.filter((t) => t.status === "Completed").length,
  };

  return (
    <AppShell
      title="Tasks"
      subtitle="Track every deliverable across teams and clients."
      actions={<Button className="rounded-xl h-10"><Plus className="h-4 w-4" /> Add Task</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { label: "All Tasks", value: counts.all, tone: "text-primary" },
          { label: "Pending", value: counts.pending, tone: "text-[#B45309]" },
          { label: "In Progress", value: counts.progress, tone: "text-primary" },
          { label: "Completed", value: counts.done, tone: "text-[#047857]" },
        ].map((s) => (
          <div key={s.label} className="card-soft p-4">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card-soft p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-9 h-10 rounded-xl bg-muted/50 border-transparent" />
          </div>
          <Button variant="outline" className="rounded-xl h-10">Priority</Button>
          <Button variant="outline" className="rounded-xl h-10">Status</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3 font-semibold">Task</th>
                <th className="px-3 py-3 font-semibold">Client</th>
                <th className="px-3 py-3 font-semibold">Assigned To</th>
                <th className="px-3 py-3 font-semibold">Priority</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Due Date</th>
                <th className="px-3 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TASKS.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-muted/40 transition-colors">
                  <td className="px-3 py-3 font-medium">{t.title}</td>
                  <td className="px-3 py-3 text-foreground/80">{t.client}</td>
                  <td className="px-3 py-3 text-foreground/80">{t.assignee}</td>
                  <td className="px-3 py-3"><Badge className={`rounded-full border-0 ${PRIORITY_TONE[t.priority]}`}>{t.priority}</Badge></td>
                  <td className="px-3 py-3"><Badge className={`rounded-full border-0 ${STATUS_TONE[t.status]}`}>{t.status}</Badge></td>
                  <td className="px-3 py-3 text-foreground/80">{t.due}</td>
                  <td className="px-3 py-3 text-right">
                    <button className="h-8 w-8 rounded-lg hover:bg-muted grid place-items-center"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
