"use client";

import { useState } from "react";
import { ChevronRight, ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

// Define the quiz configuration statically for Phase 1
const QUIZ_CONFIG = {
  title: "Find Your Personalized Ayurvedic Routine",
  description: "Answer a few questions to discover the products perfectly tailored to your dosha and lifestyle.",
  questions: [
    {
      id: "q1",
      question: "What is your primary health goal right now?",
      options: [
        { value: "stress_sleep", label: "Reducing stress and improving sleep" },
        { value: "hair_growth", label: "Hair growth and scalp health" },
        { value: "digestion_weight", label: "Digestion and weight management" },
        { value: "kids_health", label: "Immunity and focus for my child" },
        { value: "men_wellness", label: "Men's strength and vitality" }
      ]
    },
    {
      id: "q2",
      question: "How would you describe your daily energy levels?",
      options: [
        { value: "high", label: "Consistently high, but I sometimes burn out" },
        { value: "fluctuating", label: "Up and down throughout the day" },
        { value: "low", label: "Often sluggish or fatigued" }
      ]
    },
    {
      id: "q3",
      question: "Which best describes your current routine?",
      options: [
        { value: "busy", label: "Very busy, need quick and easy solutions" },
        { value: "balanced", label: "I have some time to dedicate to wellness" },
        { value: "dedicated", label: "I have a strict wellness routine already" }
      ]
    }
  ]
};

// Simple logic to map answers to product recommendations
function getRecommendations(answers: Record<string, string>) {
  const goal = answers["q1"];
  
  if (goal === "kids_health") {
    return [
      { slug: "kids-smart-oil-blend", name: "Kids Smart Oil Blend", price: 199, image: "/images/products/kids-smart-oil-blend-10-ml.jpg" },
      { slug: "kids-growth-oil-blend", name: "Kids Growth Oil Blend", price: 199, image: "/images/products/kids-growth-oil-blend-10-ml.jpg" }
    ];
  } else if (goal === "men_wellness") {
    return [
      { slug: "men-strength-oil-blend", name: "Men Strength Oil Blend", price: 199, image: "/images/products/men-strength-oil-blend-10-ml.jpg" },
      { slug: "men-active-oil-blend", name: "Men Active Oil Blend", price: 199, image: "/images/products/men-active-oil-blend-10-ml.jpg" }
    ];
  } else if (goal === "hair_growth") {
    return [
      { slug: "hair-wellness-oil", name: "Hair Wellness Oil", price: 299, image: "/images/placeholder.jpg" } // Adjust to actual products if they exist
    ];
  }
  
  // Default recommendation
  return [
    { slug: "kids-daily-care-oil-blend", name: "Daily Care Oil Blend", price: 199, image: "/images/products/kids-daily-care-oil-blend-10-ml.jpg" }
  ];
}

export default function WellnessQuiz() {
  const [step, setStep] = useState(-1); // -1 = Welcome, 0+ = Questions, 99 = Results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { user } = useAuthStore();
  const cartStore = useCartStore();
  const router = useRouter();

  const handleStart = () => setStep(0);

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Automatically go to next step
    setTimeout(() => {
      if (step < QUIZ_CONFIG.questions.length - 1) {
        setStep(step + 1);
      } else {
        finishQuiz({ ...answers, [questionId]: value });
      }
    }, 400);
  };

  const finishQuiz = async (finalAnswers: Record<string, string>) => {
    setSubmitting(true);
    setStep(99); // Loading results view
    
    const recs = getRecommendations(finalAnswers);
    setRecommendations(recs);

    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id || null,
          answers: finalAnswers,
          recommended_products: recs
        })
      });
    } catch (e) {
      console.error("Failed to save quiz results", e);
    }
    
    setSubmitting(false);
  };

  const handleAddAllToCart = () => {
    recommendations.forEach(product => {
      cartStore.addItem({
        productId: product.slug,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        size: "Standard",
        originalPrice: product.price + 100 // Dummy original price for demo
      });
    });
    router.push("/cart");
  };

  // Welcome Screen
  if (step === -1) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f9f9f9] py-12 px-4">
        <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-100">
          <div className="w-20 h-20 bg-[#4B7B3B]/10 text-[#4B7B3B] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sans">{QUIZ_CONFIG.title}</h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">{QUIZ_CONFIG.description}</p>
          <button 
            onClick={handleStart}
            className="bg-[#E88B23] hover:bg-[#D67A18] text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Start Quiz <ChevronRight />
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (step === 99) {
    if (submitting) {
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f9f9f9]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4B7B3B] mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800">Analyzing your answers...</h2>
          <p className="text-gray-500 mt-2">Crafting your personalized routine.</p>
        </div>
      );
    }

    const bundlePrice = recommendations.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="bg-[#f9f9f9] py-16 px-4 min-h-[80vh]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">Your Results</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4 font-sans">Your Personalized Ayurvedic Routine</h1>
            <p className="text-gray-600 text-lg">Based on your answers, we recommend this perfectly balanced bundle.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended For You</h2>
            <div className="space-y-6 mb-8">
              {recommendations.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-xl border border-gray-100 hover:border-[#4B7B3B]/30 hover:bg-[#4B7B3B]/5 transition-colors">
                  <div className="w-24 h-24 relative bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-[#4B7B3B] font-bold mt-1">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gray-500 mb-1">Bundle Total</p>
                <p className="text-3xl font-bold text-gray-900">₹{bundlePrice}</p>
              </div>
              <button 
                onClick={handleAddAllToCart}
                className="w-full sm:w-auto bg-[#4B7B3B] hover:bg-[#3A602D] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
              >
                <ShoppingBag size={20} /> Add Bundle to Cart
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <button onClick={() => { setStep(0); setAnswers({}); }} className="text-gray-500 hover:text-gray-900 font-medium underline">Retake Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  // Question Screens
  const currentQ = QUIZ_CONFIG.questions[step];
  const progress = ((step) / QUIZ_CONFIG.questions.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-12 px-4 bg-[#f9f9f9]">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={() => step > 0 ? setStep(step - 1) : setStep(-1)}
              className="text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium text-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Step {step + 1} of {QUIZ_CONFIG.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#4B7B3B] h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-sans leading-tight">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(currentQ.id, opt.value)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between group
                    ${isSelected 
                      ? 'border-[#4B7B3B] bg-[#4B7B3B]/5' 
                      : 'border-gray-200 hover:border-[#4B7B3B]/40 hover:bg-gray-50'
                    }`}
                >
                  <span className={`text-lg font-medium ${isSelected ? 'text-[#4B7B3B]' : 'text-gray-700 group-hover:text-gray-900'}`}>
                    {opt.label}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-[#4B7B3B] bg-[#4B7B3B]' : 'border-gray-300'}
                  `}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
