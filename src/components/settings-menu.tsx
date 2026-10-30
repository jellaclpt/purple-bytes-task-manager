import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { promptInstall, useInstallState } from "@/lib/pwa";
import { CheckCircle, Download, Moon, Settings, Sun } from "lucide-react";

function getManualInstallHint() {
  const isIos =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isIos
    ? "In Safari, tap Share, then Add to Home Screen."
    : "Open your browser menu and choose Install or Add to Home Screen.";
}

export function SettingsMenu() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const installState = useInstallState();

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", isDark);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-settings"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-3 p-4">
        <h2 className="text-sm font-semibold">Settings</h2>

        <div className="flex items-center justify-between gap-3">
          <label htmlFor="switch-dark-mode" className="flex items-center gap-2 text-sm">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            Dark mode
          </label>
          <Switch
            id="switch-dark-mode"
            checked={theme === "dark"}
            onCheckedChange={handleThemeChange}
            className="data-[state=checked]:bg-[#9D43AD]"
            data-testid="switch-dark-mode"
          />
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Download className="h-4 w-4" />
            Install app
          </div>
          {installState === "installed" ? (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground" data-testid="text-app-installed">
              <CheckCircle className="h-3.5 w-3.5" />
              The app is installed on this device.
            </p>
          ) : installState === "available" ? (
            <>
              <p className="text-xs text-muted-foreground">
                Add Task Manager to this device and open it like a regular app.
              </p>
              <Button
                size="sm"
                onClick={promptInstall}
                className="w-full bg-[#9D43AD] text-white [border-color:#9D43AD]"
                data-testid="button-install-app"
              >
                Install
              </Button>
            </>
          ) : (
            <p className="text-xs text-muted-foreground" data-testid="text-install-hint">
              {getManualInstallHint()}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
