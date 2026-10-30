import { useSyncExternalStore } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export type InstallState = "available" | "installed" | "unavailable";

let installPrompt: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function getInstallState(): InstallState {
  if (installed || window.matchMedia("(display-mode: standalone)").matches) return "installed";
  return installPrompt ? "available" : "unavailable";
}

// Called before React renders because the browser can fire the install event right away
export function initPwa() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event as BeforeInstallPromptEvent;
    notify();
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    installed = true;
    notify();
  });

  if (import.meta.env.PROD && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Failed to register service worker:", error);
      });
    });
  }
}

export async function promptInstall() {
  if (!installPrompt) return;
  const prompt = installPrompt;
  await prompt.prompt();
  await prompt.userChoice;
  // The browser only allows each install event to be used once
  installPrompt = null;
  notify();
}

export function useInstallState() {
  return useSyncExternalStore((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, getInstallState);
}
