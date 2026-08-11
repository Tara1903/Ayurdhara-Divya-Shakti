"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Award, ChevronRight, Gift, Star, ArrowRight } from "lucide-react";

// Mocking fetch logic for demo purposes. 
// In production, this would fetch from /api/rewards which queries `customer_rewards`
async function fetchRewards(userId: string) {
  // Simulating network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data for the demo
  return {
    points_balance: 1250,
    lifetime_points: 3450,
    tier: "Silver"
  };
}

export default function RewardsPage() {
  const { user } = useAuthStore();
  const [rewards, setRewards] = useState<{points_balance: number, lifetime_points: number, tier: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchRewards(user.id).then(data => {
        setRewards(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="account-main">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="btn-spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
        </div>
      </div>
    );
  }

  if (!user || !rewards) {
    return (
      <div className="account-main text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Divya Shakti Rewards</h2>
        <p className="text-gray-500 mb-6">Sign in to view your loyalty points and exclusive offers.</p>
        <Link href="/login" className="bg-[#4B7B3B] text-white px-6 py-2 rounded-lg font-medium">Sign In</Link>
      </div>
    );
  }

  // Calculate tier progress
  const tiers = [
    { name: "Bronze", min: 0, max: 2000, color: "from-amber-600 to-amber-700" },
    { name: "Silver", min: 2000, max: 5000, color: "from-gray-400 to-gray-500" },
    { name: "Gold", min: 5000, max: Infinity, color: "from-yellow-400 to-yellow-600" }
  ];

  const currentTier = tiers.find(t => rewards.lifetime_points >= t.min && rewards.lifetime_points < t.max) || tiers[2];
  const nextTier = tiers.find(t => t.min > rewards.lifetime_points);
  
  let progress = 100;
  let pointsNeeded = 0;
  
  if (nextTier) {
    const range = nextTier.min - currentTier.min;
    const pointsInTier = rewards.lifetime_points - currentTier.min;
    progress = (pointsInTier / range) * 100;
    pointsNeeded = nextTier.min - rewards.lifetime_points;
  }

  return (
    <div className="account-main">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#4B7B3B]/10 rounded-full flex items-center justify-center text-[#4B7B3B]">
          <Award size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Divya Shakti Rewards</h1>
          <p className="text-sm text-gray-500">Earn points on every purchase.</p>
        </div>
      </div>

      {/* Tier Card */}
      <div className={`rounded-2xl p-6 sm:p-8 mb-8 text-white bg-gradient-to-br ${currentTier.color} shadow-lg relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 right-10 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">Current Tier</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">{currentTier.name} Member</h2>
          </div>
          
          <div className="text-left sm:text-right">
            <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">Available Points</p>
            <div className="text-4xl sm:text-5xl font-bold tracking-tight flex items-center sm:justify-end gap-2">
              <Star size={32} fill="currentColor" className="opacity-90" />
              {rewards.points_balance}
            </div>
            <p className="text-sm text-white/90 mt-1">Value: ₹{(rewards.points_balance / 10).toFixed(2)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {nextTier && (
          <div className="mt-8 relative z-10">
            <div className="flex justify-between text-sm font-medium text-white/90 mb-2">
              <span>{pointsNeeded} points away from {nextTier.name}</span>
              <span>{nextTier.name}</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Ways to Earn / Redeem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <Gift size={24} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Redeem Points</h3>
          <p className="text-sm text-gray-600 mb-4">
            Use your points at checkout. Every 10 points equals ₹1 off your order. 
          </p>
          <Link href="/" className="text-[#4B7B3B] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#4B7B3B]/10 text-[#4B7B3B] rounded-full flex items-center justify-center mb-4">
            <Star size={24} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Earn Points</h3>
          <p className="text-sm text-gray-600 mb-4">
            Earn 1 point for every ₹10 spent on the store. Points are credited once your order is delivered.
          </p>
          <Link href="/journal" className="text-[#4B7B3B] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      
      {/* Transaction History (Mock) */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { id: 1, action: "Points Earned", order: "AYD-2026-948122", date: "Aug 10, 2026", points: "+150", color: "text-green-600" },
            { id: 2, action: "Points Redeemed", order: "AYD-2026-821943", date: "Jul 22, 2026", points: "-500", color: "text-red-600" },
            { id: 3, action: "Welcome Bonus", order: "Signup", date: "Jul 01, 2026", points: "+200", color: "text-green-600" },
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.date} • {item.order}</p>
              </div>
              <span className={`font-bold ${item.color}`}>{item.points}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
