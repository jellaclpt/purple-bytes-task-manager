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
      <div className="w-full flex h-16 items-center justify-between gap-2 md:gap-4 px-4 md:px-8">
        <div className="flex items-center gap-1 md:gap-2 min-w-0">
          <img src="/prplbyts.svg" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 shrink-0" />
          <h1 className="hidden min-[360px]:block text-sm md:text-xl font-semibold tracking-tight whitespace-nowrap">Task Manager</h1>
        </div>
        <div className="flex items-center gap-1 md:gap-6 shrink-0">
          <nav className="flex items-center gap-1 md:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className={`px-2 md:px-3 focus-visible:ring-[#9D43AD] ${location.pathname === "/" ? "bg-[#9D43AD] [border-color:#9D43AD] text-white font-semibold" : "[border-color:transparent] shadow-none"}`}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/tasks")}
              className={`px-2 md:px-3 focus-visible:ring-[#9D43AD] ${location.pathname === "/tasks" ? "bg-[#9D43AD] [border-color:#9D43AD] text-white font-semibold" : "[border-color:transparent] shadow-none"}`}
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
