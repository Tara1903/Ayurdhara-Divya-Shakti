"use client";

import { useState, useEffect } from "react";
import NewsletterPopup from "./NewsletterPopup";
import WellnessPopup from "./WellnessPopup";

export default function PopupManager() {
  const [activePopup, setActivePopup] = useState<"none" | "newsletter" | "wellness">("none");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check local storage / session storage
    const hasSubscribed = localStorage.getItem("hasSubscribed");
    const hasSeenNewsletter = sessionStorage.getItem("hasSeenNewsletterPopup");
    const hasSeenWellness = sessionStorage.getItem("hasSeenWellnessPopup");

    // Sequence logic
    const timer = setTimeout(() => {
      if (!hasSubscribed && !hasSeenNewsletter) {
        // Show newsletter first
        setActivePopup("newsletter");
      } else if (!hasSeenWellness) {
        // If they already subscribed or saw the newsletter, just show wellness
        setActivePopup("wellness");
      }
    }, 2500); // 2.5s delay on initial page load
    
    return () => clearTimeout(timer);
  }, []);

  const handleNewsletterCloseOrSuccess = () => {
    setActivePopup("none");
    
    // Wait for the Newsletter popup to animate out, then show Wellness popup
    setTimeout(() => {
      const hasSeenWellness = sessionStorage.getItem("hasSeenWellnessPopup");
      if (!hasSeenWellness) {
        setActivePopup("wellness");
      }
    }, 500);
  };

  const handleWellnessClose = () => {
    sessionStorage.setItem("hasSeenWellnessPopup", "true");
    setActivePopup("none");
  };

  if (!mounted) return null;

  return (
    <>
      <NewsletterPopup 
        isOpen={activePopup === "newsletter"} 
        onClose={handleNewsletterCloseOrSuccess} 
        onSuccess={handleNewsletterCloseOrSuccess}
      />
      <WellnessPopup 
        isOpen={activePopup === "wellness"} 
        onClose={handleWellnessClose}
      />
    </>
  );
}
