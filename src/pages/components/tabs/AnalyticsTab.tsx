import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export default function AnalyticsTab() {
    const stats = [
        { label: 'Total Students', value: '25', icon: Users, color: 'bg-blue-50 text-blue-600' },
        { label: 'Avg. Attendance', value: '92%', icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
        { label: 'Assignments Posted', value: '15', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
        { label: 'Class Average', value: '87%', icon: Award, color: 'bg-orange-50 text-orange-600' },
    ];

    const assignmentStats = [
        { name: 'Calculus Problem Set 5', submitted: 22, total: 25, avgGrade: 88 },
        { name: 'Integration Quiz', submitted: 25, total: 25, avgGrade: 85 },
        { name: 'Derivatives Homework', submitted: 20, total: 25, avgGrade: 91 },
    ];

    const studentPerformance = [
        { name: 'John Doe', grade: 95, attendance: 98, assignments: '10/10' },
        { name: 'Jane Smith', grade: 88, attendance: 92, assignments: '9/10' },
        { name: 'Mike Johnson', grade: 85, attendance: 88, assignments: '8/10' },
        { name: 'Emily Davis', grade: 92, attendance: 95, assignments: '10/10' },
        { name: 'Alex Brown', grade: 78, attendance: 85, assignments: '7/10' },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl mb-1">Analytics Dashboard</h2>
                <p className="text-gray-600">Track class performance and engagement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{stat.label}</span>
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-3xl">{stat.value}</div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">Assignment Submission Rates</h3>
                    <div className="space-y-4">
                        {assignmentStats.map((assignment, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">{assignment.name}</span>
                                    <span className="text-sm text-gray-600">
                                        {assignment.submitted}/{assignment.total} ({Math.round((assignment.submitted / assignment.total) * 100)}%)
                                    </span>
                                </div>
                                <Progress value={(assignment.submitted / assignment.total) * 100} className="mb-1" />
                                <div className="text-xs text-gray-500">Avg Grade: {assignment.avgGrade}%</div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">Grade Distribution</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">A (90-100%)</span>
                            <div className="flex items-center gap-2 flex-1 ml-4">
                                <Progress value={45} className="flex-1" />
                                <span className="text-sm text-gray-600 w-12 text-right">45%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">B (80-89%)</span>
                            <div className="flex items-center gap-2 flex-1 ml-4">
                                <Progress value={35} className="flex-1" />
                                <span className="text-sm text-gray-600 w-12 text-right">35%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">C (70-79%)</span>
                            <div className="flex items-center gap-2 flex-1 ml-4">
                                <Progress value={15} className="flex-1" />
                                <span className="text-sm text-gray-600 w-12 text-right">15%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">D (60-69%)</span>
                            <div className="flex items-center gap-2 flex-1 ml-4">
                                <Progress value={5} className="flex-1" />
                                <span className="text-sm text-gray-600 w-12 text-right">5%</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Top Performing Students</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Student</th>
                                <th className="text-center py-3 px-4">Avg. Grade</th>
                                <th className="text-center py-3 px-4">Attendance</th>
                                <th className="text-center py-3 px-4">Assignments</th>
                                <th className="text-center py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentPerformance.map((student, index) => (
                                <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-3 px-4">{student.name}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`font-medium ${student.grade >= 90 ? 'text-green-600' : student.grade >= 80 ? 'text-blue-600' : 'text-orange-600'}`}>
                                            {student.grade}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">{student.attendance}%</td>
                                    <td className="py-3 px-4 text-center">{student.assignments}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full ${student.grade >= 90 ? 'bg-green-50 text-green-700' :
                                                student.grade >= 80 ? 'bg-blue-50 text-blue-700' :
                                                    'bg-orange-50 text-orange-700'
                                            }`}>
                                            <TrendingUp className="h-3 w-3" />
                                            {student.grade >= 90 ? 'Excellent' : student.grade >= 80 ? 'Good' : 'Needs Support'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
