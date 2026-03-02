"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "aru365_cookie_consent";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
};

type ContextValue = {
  consent: CookieConsent | null;
  setConsent: (value: CookieConsent) => void;
  openCookiePreferences: () => void;
};

const CookieConsentContext = createContext<ContextValue | null>(null);

function readStored(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && parsed !== null && "essential" in parsed && parsed.essential === true) {
      return {
        essential: true,
        analytics: Boolean((parsed as { analytics?: boolean }).analytics),
      };
    }
  } catch {
    // ignore
  }
  return null;
}

function writeStored(value: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [forceOpen, setForceOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsentState(readStored());
    setMounted(true);
  }, []);

  const setConsent = useCallback((value: CookieConsent) => {
    setConsentState(value);
    writeStored(value);
    setForceOpen(false);
  }, []);

  const openCookiePreferences = useCallback(() => {
    setForceOpen(true);
  }, []);

  const showBanner = mounted && (consent === null || forceOpen);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        setConsent,
        openCookiePreferences,
      }}
    >
      {children}
      {showBanner && (
        <CookieBanner
          onAcceptAll={() => setConsent({ essential: true, analytics: true })}
          onEssentialOnly={() => setConsent({ essential: true, analytics: false })}
          onClose={forceOpen ? () => setForceOpen(false) : undefined}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): ContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

function CookieBanner({
  onAcceptAll,
  onEssentialOnly,
  onClose,
}: {
  onAcceptAll: () => void;
  onEssentialOnly: () => void;
  onClose?: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-700 leading-relaxed">
              We use essential cookies to make the site work. We may use analytics (e.g. Google Search Console and
              similar tools) to understand how the site is used. You can accept all cookies or only essential ones.{" "}
              <Link href="/terms" className="text-aru-cyan hover:underline font-medium">
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            )}
            <button
              type="button"
              onClick={onEssentialOnly}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={onAcceptAll}
              className="px-4 py-2.5 text-sm font-medium text-white bg-aru-cyan hover:bg-aru-cyan-dark rounded-lg transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
