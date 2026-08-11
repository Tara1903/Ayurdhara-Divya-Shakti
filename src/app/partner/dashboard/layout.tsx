import PartnerSidebar from '@/components/partner/PartnerSidebar';
import PartnerTopbar from '@/components/partner/PartnerTopbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Dashboard - Ayurdhara Divya Shakti',
  description: 'Manage your Ayurdhara partner account.',
};

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <PartnerSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <PartnerTopbar />
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
