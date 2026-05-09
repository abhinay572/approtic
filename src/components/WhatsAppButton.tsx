"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919666659359";
const PRE_FILL = encodeURIComponent(
  "Hi Approtic! I'd like to discuss a project with you."
);

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      {open && (
        <div className="bg-surface border border-border rounded-2xl shadow-2xl p-5 w-72 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-text">Approtic Support</p>
              <p className="text-xs text-success">● Online now</p>
            </div>
          </div>
          <p className="text-sm text-muted mb-4">
            Hey! How can we help you today? Chat with us on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_FILL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20b358] text-white rounded-xl py-3 text-sm font-medium transition-colors"
            onClick={() => {
              // GA4 event
              if (typeof window !== "undefined" && "gtag" in window) {
                (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
                  "event",
                  "whatsapp_click",
                  { event_category: "contact" }
                );
              }
            }}
          >
            <MessageCircle size={18} />
            Start Chat
          </a>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
          open
            ? "bg-surface border border-border text-muted hover:text-text"
            : "bg-[#25D366] hover:bg-[#20b358] text-white hover:scale-110"
        )}
      >
        {open ? <X size={22} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
