"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, CheckCircle2, Loader2 } from "lucide-react";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewsletterPopup({ isOpen, onClose, onSuccess }: NewsletterPopupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        // Mark as seen so they don't get it again
        sessionStorage.setItem("hasSeenNewsletterPopup", "true");
        localStorage.setItem("hasSubscribed", "true");
        
        setTimeout(() => {
          onSuccess(); // Close and trigger next step
        }, 2000);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("hasSeenNewsletterPopup", "true");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        role="dialog"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 shadow-sm hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="bg-[#2D5A27] p-8 text-center relative overflow-hidden">
          {/* Subtle background pattern could go here */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <p className="text-[#E88B23] font-bold tracking-widest uppercase text-xs mb-2">Join Our Family</p>
            <h2 className="text-3xl font-bold text-white mb-2 font-serif">Unlock 10% Off</h2>
            <p className="text-green-50 text-sm opacity-90">
              Subscribe to get your Daily Wellness Guide and an exclusive discount on your first order.
            </p>
          </div>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in">
              <CheckCircle2 className="text-[#4B7B3B] w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">You're on the list!</h3>
              <p className="text-gray-600">Check your inbox for your welcome gift.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B7B3B] focus:border-transparent outline-none transition-all text-gray-700"
                    disabled={status === "loading"}
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full bg-[#E88B23] hover:bg-[#D9381E] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#E88B23]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Subscribing...
                  </>
                ) : (
                  "Get My Discount"
                )}
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
