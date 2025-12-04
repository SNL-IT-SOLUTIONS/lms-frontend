import { useRoutes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import ClientDashboard from "@/pages/client/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Index from "@/pages/Index";

export function AppRoutes() {
    const routes = useRoutes([

        // NO LOGIN ROUTES HERE
        { path: "/", element: <Index /> },
        { path: "/login", element: <Login /> },



        // NEED LOGIN ROUTES HERE
        {
            path: "/dashboard",
            element: (
                <ProtectedRoute>
                    <ClientDashboard />
                </ProtectedRoute>
            )
        }
    ]);

    return routes;
}

export default AppRoutes;