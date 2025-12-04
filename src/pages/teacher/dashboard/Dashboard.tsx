import Header from "@/pages/components/Header";
import ClassCard from "@/pages/components/ClassCard";
import { useAuthContext } from "@/context/AuthContext";
import { classes } from "@/mock/MockData";
export default function TeacherDashboard() {

    const { user } = useAuthContext();

    return (
        <>

            <div className="min-h-screen bg-gray-50">

                <Header />

                <main className="max-w-7xl mx-auto px-4 py-8">
                    <div className="mb-6">
                        <h1 className="text-2xl mb-2">
                            {user?.role?.role_name === 'teacher' ? 'Your Classes' : 'Enrolled Classes'}
                        </h1>
                        <p className="text-gray-600">
                            {user?.role?.role_name === 'teacher'
                                ? 'Manage your classes, assignments, and students'
                                : 'View your classes and upcoming assignments'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((classData) => (
                            <ClassCard key={classData.id} classData={classData} />
                        ))}
                    </div>
                </main>
            </div>
        </>

    );
}
