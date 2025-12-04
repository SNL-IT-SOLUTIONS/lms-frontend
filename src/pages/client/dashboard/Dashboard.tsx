import ClientLayout from "@/pages/layout/ClientLayout";

export default function ClientDashboard() {
    return (
        <ClientLayout>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p>Only logged-in users can see this.</p>
        </ClientLayout>
    );
}
