import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSetupState } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configured = getAdminSetupState();

  return (
    <section className="page-shell section-space">
      <div className="mx-auto max-w-2xl">
        <AdminLoginForm configured={configured} />
      </div>
    </section>
  );
}
