import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  onNewTask?: () => void;
}

export function Header({ onNewTask }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D38EEC] bg-[#E7C3F6] dark:border-[#4A2051] dark:bg-[#4A2051] dark:text-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-6 md:px-8">
        <div className="flex items-center gap-2">
          <img src="/prplbyts.svg" alt="Logo" className="h-12 w-12" />
          <h1 className="text-xl font-semibold tracking-tight">Task Manager</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className={`focus-visible:ring-[#9D43AD] ${location.pathname === "/" ? "bg-[#9D43AD] [border-color:#9D43AD] text-white font-semibold" : "[border-color:#9D43AD] dark:[border-color:rgba(255,255,255,.4)]"}`}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/tasks")}
              className={`focus-visible:ring-[#9D43AD] ${location.pathname === "/tasks" ? "bg-[#9D43AD] [border-color:#9D43AD] text-white font-semibold" : "[border-color:#9D43AD] dark:[border-color:rgba(255,255,255,.4)]"}`}
            >
              Tasks
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
