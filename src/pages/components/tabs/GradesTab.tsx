import type { Student, Assignment } from '@/mock/MockData';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface GradesTabProps {
    students: Student[];
    assignments: Assignment[];
}

export default function GradesTab({ students, assignments }: GradesTabProps) {
    // Mock grade data - in real app would come from backend
    const getGrade = (studentId: string, assignmentId: string) => {
        const random = Math.random();
        if (random > 0.3) {
            return Math.floor(Math.random() * 20) + 80; // 80-100
        }
        return null; // Not submitted
    };

    const calculateAverage = (studentId: string) => {
        let total = 0;
        let count = 0;
        assignments.forEach(assignment => {
            const grade = getGrade(studentId, assignment.id);
            if (grade !== null && assignment.points > 0) {
                total += (grade / assignment.points) * 100;
                count++;
            }
        });
        return count > 0 ? Math.round(total / count) : null;
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Student</TableHead>
                                {assignments.filter(a => a.points > 0).map(assignment => (
                                    <TableHead key={assignment.id} className="text-center min-w-[120px]">
                                        <div className="truncate">{assignment.title}</div>
                                        <div className="text-xs text-gray-500">{assignment.points} pts</div>
                                    </TableHead>
                                ))}
                                <TableHead className="text-center font-medium">Average</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => {
                                const average = calculateAverage(student.id);
                                return (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={student.avatar} />
                                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-sm text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        {assignments.filter(a => a.points > 0).map(assignment => {
                                            const grade = getGrade(student.id, assignment.id);
                                            return (
                                                <TableCell key={assignment.id} className="text-center">
                                                    {grade !== null ? (
                                                        <span className={grade >= 90 ? 'text-green-600' : grade >= 70 ? 'text-blue-600' : 'text-orange-600'}>
                                                            {grade}/{assignment.points}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell className="text-center font-medium">
                                            {average !== null ? (
                                                <span className={average >= 90 ? 'text-green-600' : average >= 70 ? 'text-blue-600' : 'text-orange-600'}>
                                                    {average}%
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
