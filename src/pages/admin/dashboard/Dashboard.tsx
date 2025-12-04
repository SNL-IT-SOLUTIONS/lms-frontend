import AdminLayout from "@/pages/layout/AdminLayout";

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p>Only logged-in users can see this.</p>
        </AdminLayout>
    );
}
