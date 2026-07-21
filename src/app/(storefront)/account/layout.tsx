import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AccountNavigation from '@/components/account/AccountNavigation';
import Navbar from '@/components/Navbar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="account-layout">
        <Navbar />
        <div className="account-container">
          <aside className="account-sidebar">
            <AccountNavigation />
          </aside>
          <main className="account-content">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
