import { useRoutes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import StudentDashboard from "@/pages/client/dashboard/Dashboard";
import AdminDashboard from "@/pages/admin/dashboard/Dashboard";
import TeacherDashboard from "@/pages/teacher/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ClassView from "@/pages/components/ClassView";
import Index from "@/pages/Index";

export function AppRoutes() {
    const routes = useRoutes([

        // NO LOGIN ROUTES HERE
        { path: "/", element: <Index /> },
        { path: "/login", element: <Login /> },



        // NEED LOGIN ROUTES HERE
        {
            path: "/student-dashboard",
            element: (
                <ProtectedRoute>
                    <StudentDashboard />
                </ProtectedRoute>
            )
        }
        ,
        {
            path: `/student-dashboard/class/:classId`,
            element: (
                <ProtectedRoute>
                    <ClassView />
                </ProtectedRoute>
            )
        }
        ,
        {
            path: "/admin-dashboard",
            element: (
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
            )
        }
        ,
        {
            path: "/teacher-dashboard",
            element: (
                <ProtectedRoute>
                    <TeacherDashboard />
                </ProtectedRoute>
            )
        }
    ]);

    return routes;
}

export default AppRoutes;