import { useState } from 'react';
import { Link } from 'react-router';
import { getUser } from '@/utils/storage';
import type { Assignment } from '@/mock/MockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, BookOpen, ClipboardList, Plus, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ClassworkTabProps {
    assignments: Assignment[];
    classId: string;
}

export default function ClassworkTab({ assignments, classId }: ClassworkTabProps) {

    const raw = getUser();
    const role = raw?.role?.role_name || "";

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        description: '',
        points: 100,
        dueDate: '',
        type: 'assignment' as 'assignment' | 'quiz' | 'material'
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'assignment':
                return <FileText className="h-5 w-5" />;
            case 'quiz':
                return <ClipboardList className="h-5 w-5" />;
            case 'material':
                return <BookOpen className="h-5 w-5" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'assignment':
                return 'text-blue-600 bg-blue-50';
            case 'quiz':
                return 'text-purple-600 bg-purple-50';
            case 'material':
                return 'text-green-600 bg-green-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const formatDueDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const isOverdue = date < now;

        return {
            text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            isOverdue
        };
    };

    const handleCreateAssignment = () => {
        // In a real app, this would save to backend
        setShowCreateDialog(false);
        setNewAssignment({
            title: '',
            description: '',
            points: 100,
            dueDate: '',
            type: 'assignment'
        });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">
                    {role === 'teacher' ? 'Class Assignments' : 'Your Work'}
                </h2>
                {role === 'teacher' && (
                    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Create
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create Assignment</DialogTitle>
                                <DialogDescription>Create a new assignment for your class</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        placeholder="Assignment title"
                                        value={newAssignment.title}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Instructions</Label>
                                    <Textarea
                                        placeholder="Describe the assignment..."
                                        value={newAssignment.description}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                                        rows={5}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Points</Label>
                                        <Input
                                            type="number"
                                            value={newAssignment.points}
                                            onChange={(e) => setNewAssignment({ ...newAssignment, points: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Type</Label>
                                        <Select value={newAssignment.type} onValueChange={(value: any) => setNewAssignment({ ...newAssignment, type: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="assignment">Assignment</SelectItem>
                                                <SelectItem value="quiz">Quiz</SelectItem>
                                                <SelectItem value="material">Material</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label>Due Date</Label>
                                    <Input
                                        type="datetime-local"
                                        value={newAssignment.dueDate}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreateAssignment}
                                        disabled={!newAssignment.title || !newAssignment.description}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="space-y-4">
                {assignments.map((assignment) => {
                    const dueDate = formatDueDate(assignment.dueDate);

                    return (
                        <Link key={assignment.id} to={`/class/${classId}/assignment/${assignment.id}`}>
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full ${getTypeColor(assignment.type)}`}>
                                        {getIcon(assignment.type)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium mb-1">{assignment.title}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                    {assignment.description}
                                                </p>
                                                {assignment.points > 0 && (
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span className={dueDate.isOverdue ? 'text-red-600' : 'text-gray-600'}>
                                                            <Calendar className="h-3 w-3 inline mr-1" />
                                                            Due {dueDate.text}
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-600">{assignment.points} points</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                {role === 'student' && assignment.submitted && (
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        Submitted
                                                    </Badge>
                                                )}
                                                {role === 'student' && assignment.grade !== undefined && (
                                                    <span className="text-sm font-medium">
                                                        {assignment.grade}/{assignment.points}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
