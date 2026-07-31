import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import type { Metadata } from 'next';
import { verifyAdminRole } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ayurdhara Divya Shakti - Admin Control Center',
  description: 'Operating System and CMS for Ayurdhara Divya Shakti',
};

export default async function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized } = await verifyAdminRole();
  if (!authorized) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <AdminTopbar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
