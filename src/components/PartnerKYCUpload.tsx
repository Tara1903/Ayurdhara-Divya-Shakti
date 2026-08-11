"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function PartnerKYCUpload({ partnerId, currentKyc }: { partnerId: string, currentKyc: any }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const isVerified = currentKyc?.pan_card_url && currentKyc?.business_proof_url;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, docType: "pan_card" | "business_proof") => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("bucket", "partner-documents");
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const fileUrl = data.urls[0];
      
      // Update partner account with the new URL
      const newKycDetails = {
        ...currentKyc,
        [`${docType}_url`]: fileUrl,
      };

      const { error: updateError } = await supabase
        .from('partner_accounts')
        .update({ kyc_details: newKycDetails })
        .eq('id', partnerId);

      if (updateError) throw updateError;
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // We would ideally trigger a re-fetch of the partner data here or reload
      window.location.reload();
      
    } catch (err: any) {
      setError(err.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 flex items-start gap-4">
        <CheckCircle className="text-green-600 mt-1 shrink-0" />
        <div>
          <h3 className="font-bold text-green-900">KYC Verified</h3>
          <p className="text-sm text-green-700 mt-1">Your documents have been uploaded and verified successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Complete Your KYC</h3>
      <p className="text-sm text-gray-500 mb-6">Upload your business documents to fully activate your account and enable payouts.</p>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* PAN Card */}
        <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">PAN Card</h4>
            {currentKyc?.pan_card_url ? (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold uppercase">Uploaded</span>
            ) : (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold uppercase">Pending</span>
            )}
          </div>
          
          {!currentKyc?.pan_card_url && (
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#4B7B3B] hover:bg-[#4B7B3B]/5 transition-colors">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Click to upload</span>
              </div>
              <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleUpload(e, 'pan_card')} disabled={uploading} />
            </label>
          )}
          {currentKyc?.pan_card_url && (
            <a href={currentKyc.pan_card_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#4B7B3B] hover:underline">
              <FileText size={16} /> View Document
            </a>
          )}
        </div>

        {/* Business Proof */}
        <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">GST / Business Proof</h4>
            {currentKyc?.business_proof_url ? (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold uppercase">Uploaded</span>
            ) : (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold uppercase">Pending</span>
            )}
          </div>
          
          {!currentKyc?.business_proof_url && (
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#4B7B3B] hover:bg-[#4B7B3B]/5 transition-colors">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Click to upload</span>
              </div>
              <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleUpload(e, 'business_proof')} disabled={uploading} />
            </label>
          )}
          {currentKyc?.business_proof_url && (
            <a href={currentKyc.business_proof_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#4B7B3B] hover:underline">
              <FileText size={16} /> View Document
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
