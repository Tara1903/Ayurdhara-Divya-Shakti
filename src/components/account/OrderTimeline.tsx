"use client";

import { CheckCircle2, Clock, Truck, Package, XCircle } from "lucide-react";
import { OrderStatus } from "@/types/order";

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery?: string;
}

export default function OrderTimeline({ status, createdAt, estimatedDelivery }: OrderTimelineProps) {
  // Define the stages
  const stages = [
    { id: "placed", label: "Order Placed", icon: Clock },
    { id: "processing", label: "Processing", icon: Package },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle2 }
  ];

  // Determine current step index based on status
  let currentStepIndex = 0;
  let isFailed = false;

  switch (status) {
    case "pending":
    case "payment_pending":
    case "confirmed":
    case "paid":
      currentStepIndex = 0;
      break;
    case "processing":
      currentStepIndex = 1;
      break;
    case "shipped":
      currentStepIndex = 2;
      break;
    case "delivered":
      currentStepIndex = 3;
      break;
    case "cancelled":
    case "refunded":
    case "payment_failed":
      isFailed = true;
      currentStepIndex = 0;
      break;
    default:
      currentStepIndex = 0;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Order Status</h3>
        {estimatedDelivery && status !== "delivered" && !isFailed && (
          <span className="text-sm font-medium text-[#4B7B3B] bg-[#4B7B3B]/10 px-3 py-1 rounded-full">
            Est. Delivery: {estimatedDelivery}
          </span>
        )}
      </div>

      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden sm:block"></div>
        
        {/* Active Progress Bar */}
        {!isFailed && (
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#4B7B3B] -translate-y-1/2 rounded-full hidden sm:block transition-all duration-500 ease-out" 
            style={{ width: `${(currentStepIndex / (stages.length - 1)) * 100}%` }}
          ></div>
        )}

        <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-6 sm:gap-0">
          {stages.map((stage, idx) => {
            const Icon = isFailed && idx === 0 ? XCircle : stage.icon;
            
            const isCompleted = isFailed ? false : idx <= currentStepIndex;
            const isCurrent = isFailed ? false : idx === currentStepIndex;
            
            let colorClass = "text-gray-400 bg-white border-gray-200";
            if (isFailed && idx === 0) {
              colorClass = "text-red-500 bg-red-50 border-red-500";
            } else if (isCompleted) {
              colorClass = "text-white bg-[#4B7B3B] border-[#4B7B3B]";
            }
            
            return (
              <div key={stage.id} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${colorClass}`}>
                  <Icon size={18} className={isCompleted && !isFailed ? "text-white" : ""} />
                </div>
                <div>
                  <p className={`font-medium text-sm ${isCurrent ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                    {isFailed && idx === 0 ? "Cancelled / Failed" : stage.label}
                  </p>
                  {idx === 0 && (
                    <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                      {new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
