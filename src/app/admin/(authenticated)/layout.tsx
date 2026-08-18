import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch the role to confirm they are an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const adminRoles = ['super_admin', 'store_manager', 'catalog_manager', 'content_manager', 'marketing_manager', 'order_manager', 'support'];
  if (!adminRoles.includes(profile?.role || '')) {
    // If they aren't an admin, redirect them to login with error
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen w-full md:ml-64 transition-all duration-300 overflow-x-hidden">
        <AdminTopbar />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
