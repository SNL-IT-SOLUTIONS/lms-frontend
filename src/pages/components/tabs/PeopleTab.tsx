import type { Class, Student } from '@/mock/MockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, MoreVertical } from 'lucide-react';

interface PeopleTabProps {
    classData: Class;
    students: Student[];
}

export default function PeopleTab({ classData, students }: PeopleTabProps) {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl">Teachers</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" />
                            <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        <span>{classData.teacher}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl">Students</h2>
                        <p className="text-sm text-gray-600">{students.length} students</p>
                    </div>
                    <Button variant="outline" className="text-blue-600 border-blue-600">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite students
                    </Button>
                </div>

                <div className="space-y-3">
                    {students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div>{student.name}</div>
                                    <div className="text-sm text-gray-500">{student.email}</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
