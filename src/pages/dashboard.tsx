import { useState, useMemo, useEffect } from "react";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { CategoryTag } from "@/components/category-tag";
import { PriorityBadge } from "@/components/priority-badge";
import { useToast } from "@/hooks/use-toast";
import { localStorageService } from "@/lib/localStorage";
import { type Task } from "@shared/schema";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

interface RecentActivity {
  id: string;
  taskId: string;
  taskTitle: string;
  action: "created" | "updated";
  timestamp: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage
  useEffect(() => {
    const loadedTasks = localStorageService.getTasks();
    setTasks(loadedTasks);
  }, []);

  // Load recent activity from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("taskRecentActivity");
    if (stored) {
      try {
        setRecentActivity(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recent activity:", e);
      }
    }
  }, []);

  // Track task changes and update recent activity
  useEffect(() => {
    const activity: RecentActivity[] = [];
    
    tasks.forEach((task) => {
      if (task.createdAt) {
        activity.push({
          id: `${task.id}-${task.createdAt}`,
          taskId: task.id,
          taskTitle: task.title,
          action: "created",
          timestamp: new Date(task.createdAt).getTime(),
        });
      }
    });

    // Sort by timestamp descending and keep only top 5
    activity.sort((a, b) => b.timestamp - a.timestamp);
    const topActivity = activity.slice(0, 5);

    setRecentActivity(topActivity);
    localStorage.setItem("taskRecentActivity", JSON.stringify(topActivity));
  }, [tasks]);

  const taskCounts = useMemo(() => {
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;
    return { todo, inProgress, done, total: tasks.length };
  }, [tasks]);

  return (
    <LayoutWrapper>
      <div className="w-full px-4 md:px-8 py-4 md:py-6">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 md:mb-4" data-testid="text-page-title">
          Dashboard
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
          <Card className="p-3 md:p-6 border-[#D38EEC] dark:border-[#9D43AD]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-muted-foreground text-xs md:text-sm whitespace-nowrap mb-1 md:mb-2">To-Do</p>
              <p className="text-2xl md:text-4xl font-bold text-[#D38EEC]">{taskCounts.todo}</p>
            </div>
          </Card>
          <Card className="p-3 md:p-6 border-[#D38EEC] dark:border-[#9D43AD]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-muted-foreground text-xs md:text-sm whitespace-nowrap mb-1 md:mb-2">In Progress</p>
              <p className="text-2xl md:text-4xl font-bold text-[#D38EEC]">{taskCounts.inProgress}</p>
            </div>
          </Card>
          <Card className="p-3 md:p-6 border-[#D38EEC] dark:border-[#9D43AD]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-muted-foreground text-xs md:text-sm whitespace-nowrap mb-1 md:mb-2">Done</p>
              <p className="text-2xl md:text-4xl font-bold text-[#D38EEC]">{taskCounts.done}</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-2 md:mb-3">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <EmptyState title="No recent activity yet" />
          ) : (
            <div className="flex flex-col gap-2">
              {recentActivity.map((activity) => {
                const task = tasks.find((t) => t.id === activity.taskId);
                return (
                  <Card key={activity.id} className="p-3 border-[#D38EEC] dark:border-[#9D43AD]">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                      <div className="min-w-0 lg:flex-1">
                        <p className="font-medium text-sm break-words">{activity.taskTitle}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created • {format(new Date(activity.timestamp), "MMM d, yyyy h:mm a")}
                        </p>
                      </div>
                      {task && (
                        <>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground lg:w-36 lg:shrink-0 empty:hidden lg:empty:block">
                            {task.dueDate && (
                              <>
                                <CalendarDays className="h-3.5 w-3.5" />
                                <span>Due: {format(task.dueDate, "MMM d, yyyy")}</span>
                              </>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 lg:w-72 lg:shrink-0 lg:justify-end">
                            <StatusBadge status={task.status} />
                            <CategoryTag category={task.category} />
                            <PriorityBadge priority={task.priority || "medium"} />
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
