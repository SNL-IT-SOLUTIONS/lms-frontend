import { useParams, Link } from 'react-router';
import { Folder, ArrowLeft } from 'lucide-react';
import Header from './Header';
import { classes, assignments, announcements, } from '@/mock/MockData';
import { useEffect, useState } from 'react';
import RotatingText from '@/components/RotatingText';
import { getUser } from "@/utils/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StreamTab from './tabs/StreamTab';
import ClassworkTab from './tabs/ClassWorkTab';
import QuizzesTab from './tabs/QuizzesTab';
import DiscussionsTab from './tabs/DiscussionsTab';
import PeopleTab from './tabs/PeopleTab';
import ResourcesTab from './tabs/ResourcesTab';
import GradesTab from './tabs/GradesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import { students } from '@/mock/MockData';

export default function ClassView() {
    const { classId } = useParams();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // parse the JSON string
            } catch (err) {
                console.error("Failed to parse user from localStorage", err);
            }
        }
    }, []);

    const role = user?.role?.role_name || "";

    const classData = classes.find(c => c.id === classId);

    if (!classData) return <div>Class not found</div>;

    const classAssignments = assignments.filter(a => a.classId === classId);
    const classAnnouncements = announcements.filter(a => a.classId === classId);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className={`${classData.color} relative`}>
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${classData.imageUrl})` }}
                />
                <div className="relative max-w-7xl mx-auto px-4 py-8">
                    <Link to="/student-dashboard" className="inline-flex items-center gap-2 text-white mb-4 hover:underline">
                        <ArrowLeft className="h-4 w-4" />
                        Back to classes
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <RotatingText
                                texts={[classData.name, classData.name]}
                                mainClassName="text-white text-4xl mb-2 font-bold"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}

                            ></RotatingText>
                            <p className="text-white text-lg opacity-90">{classData.section}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <Tabs defaultValue="stream" className="mt-4">
                    <TabsList className="bg-white border-b border-gray-200 w-full justify-start rounded-none h-auto p-0">
                        <TabsTrigger
                            value="stream"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Stream
                        </TabsTrigger>
                        <TabsTrigger
                            value="classwork"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Classwork
                        </TabsTrigger>
                        <TabsTrigger
                            value="quizzes"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Quizzes
                        </TabsTrigger>
                        <TabsTrigger
                            value="discussions"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Discussions
                        </TabsTrigger>
                        <TabsTrigger
                            value="resources"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Resources
                        </TabsTrigger>
                        <TabsTrigger
                            value="people"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            People
                        </TabsTrigger>
                        {role === 'teacher' && (
                            <>
                                <TabsTrigger
                                    value="grades"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                                >
                                    Grades
                                </TabsTrigger>
                                <TabsTrigger
                                    value="analytics"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                                >
                                    Analytics
                                </TabsTrigger>
                            </>
                        )}
                    </TabsList>

                    <div className="py-6">
                        <TabsContent value="stream" className="mt-0">
                            <StreamTab classData={classData} announcements={classAnnouncements} />
                        </TabsContent>

                        <TabsContent value="classwork" className="mt-0">
                            <ClassworkTab assignments={classAssignments} classId={classId!} />
                        </TabsContent>

                        <TabsContent value="quizzes" className="mt-0">
                            <QuizzesTab classId={classId!} />
                        </TabsContent>

                        <TabsContent value="discussions" className="mt-0">
                            <DiscussionsTab classId={classId!} />
                        </TabsContent>

                        <TabsContent value="resources" className="mt-0">
                            <ResourcesTab classId={classId!} />
                        </TabsContent>

                        <TabsContent value="people" className="mt-0">
                            <PeopleTab classData={classData} students={students} />
                        </TabsContent>

                        {role === 'teacher' && (
                            <>
                                <TabsContent value="grades" className="mt-0">
                                    <GradesTab students={students} assignments={classAssignments} />
                                </TabsContent>
                                <TabsContent value="analytics" className="mt-0">
                                    <AnalyticsTab />
                                </TabsContent>
                            </>
                        )}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}