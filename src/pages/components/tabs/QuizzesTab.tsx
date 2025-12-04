import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getUser } from '@/utils/storage';
import { quizzes, type QuizQuestion } from '@/mock/MockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Clock, Plus, TrendingUp, Trash2, X } from 'lucide-react';
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

interface QuizzesTabProps {
    classId: string;
}


const raw = getUser();
const role = raw?.role?.role_name || "";
console.log("User role in QuizzesTab:", role);

export default function QuizzesTab({ classId }: QuizzesTabProps) {
    const navigate = useNavigate();
    const classQuizzes = quizzes.filter(q => q.classId === classId);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newQuiz, setNewQuiz] = useState({
        title: '',
        description: '',
        duration: 30,
        points: 100,
        attempts: 1,
        dueDate: ''
    });
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizQuestion>>({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 10
    });

    const formatDueDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const isOverdue = date < now;

        return {
            text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
            isOverdue
        };
    };

    const handleAddQuestion = () => {
        if (!currentQuestion.question) return;

        const newQuestion: QuizQuestion = {
            id: `q${questions.length + 1}`,
            question: currentQuestion.question,
            type: currentQuestion.type as 'multiple-choice' | 'true-false' | 'short-answer',
            options: currentQuestion.type === 'short-answer' ? undefined : currentQuestion.options,
            correctAnswer: currentQuestion.correctAnswer!,
            points: currentQuestion.points || 10
        };

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion({
            question: '',
            type: 'multiple-choice',
            options: ['', '', '', ''],
            correctAnswer: 0,
            points: 10
        });
    };

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionTypeChange = (type: string) => {
        if (type === 'true-false') {
            setCurrentQuestion({
                ...currentQuestion,
                type: type as any,
                options: ['True', 'False'],
                correctAnswer: 0
            });
        } else if (type === 'short-answer') {
            setCurrentQuestion({
                ...currentQuestion,
                type: type as any,
                options: undefined,
                correctAnswer: ''
            });
        } else {
            setCurrentQuestion({
                ...currentQuestion,
                type: type as any,
                options: ['', '', '', ''],
                correctAnswer: 0
            });
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...(currentQuestion.options || [])];
        newOptions[index] = value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const handleCreateQuiz = () => {
        // In real app, save to backend
        console.log('Creating quiz:', { ...newQuiz, questions });
        setShowCreateDialog(false);
        setNewQuiz({
            title: '',
            description: '',
            duration: 30,
            points: 100,
            attempts: 1,
            dueDate: ''
        });
        setQuestions([]);
    };

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl mb-1">Quizzes</h2>
                    <p className="text-gray-600">Test your knowledge with interactive quizzes</p>
                </div>
                {role === 'teacher' && (
                    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Quiz
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create New Quiz</DialogTitle>
                                <DialogDescription>Set up quiz details and add questions</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Quiz Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="font-medium">Quiz Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <Label>Quiz Title</Label>
                                            <Input
                                                placeholder="e.g., Chapter 5 Quiz"
                                                value={newQuiz.title}
                                                onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                placeholder="Brief description of the quiz..."
                                                value={newQuiz.description}
                                                onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label>Duration (minutes)</Label>
                                            <Input
                                                type="number"
                                                value={newQuiz.duration}
                                                onChange={(e) => setNewQuiz({ ...newQuiz, duration: Number(e.target.value) })}
                                            />
                                        </div>
                                        <div>
                                            <Label>Attempts Allowed</Label>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={newQuiz.attempts}
                                                onChange={(e) => setNewQuiz({ ...newQuiz, attempts: Number(e.target.value) })}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Label>Due Date</Label>
                                            <Input
                                                type="datetime-local"
                                                value={newQuiz.dueDate}
                                                onChange={(e) => setNewQuiz({ ...newQuiz, dueDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Added Questions */}
                                {questions.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">Questions ({questions.length})</h3>
                                            <Badge variant="outline">Total: {totalPoints} points</Badge>
                                        </div>
                                        <div className="space-y-2 max-h-60 overflow-y-auto">
                                            {questions.map((q, index) => (
                                                <div key={q.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-1">
                                                            <span className="font-medium text-sm">Q{index + 1}: {q.question}</span>
                                                            <Badge variant="outline" className="text-xs">{q.points} pts</Badge>
                                                        </div>
                                                        <div className="text-xs text-gray-600 capitalize">{q.type}</div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600"
                                                        onClick={() => handleRemoveQuestion(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add Question Form */}
                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="font-medium">Add Question</h3>

                                    <div>
                                        <Label>Question Type</Label>
                                        <Select
                                            value={currentQuestion.type}
                                            onValueChange={handleQuestionTypeChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                                <SelectItem value="true-false">True/False</SelectItem>
                                                <SelectItem value="short-answer">Short Answer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Question</Label>
                                        <Textarea
                                            placeholder="Enter your question..."
                                            value={currentQuestion.question}
                                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                                            rows={2}
                                        />
                                    </div>

                                    {currentQuestion.type === 'multiple-choice' && (
                                        <div className="space-y-3">
                                            <Label>Answer Options</Label>
                                            {currentQuestion.options?.map((option, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="correct-answer"
                                                        checked={currentQuestion.correctAnswer === index}
                                                        onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                                                        className="h-4 w-4"
                                                    />
                                                    <Input
                                                        placeholder={`Option ${index + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                            <p className="text-xs text-gray-500">Select the radio button for the correct answer</p>
                                        </div>
                                    )}

                                    {currentQuestion.type === 'true-false' && (
                                        <div className="space-y-2">
                                            <Label>Correct Answer</Label>
                                            <Select
                                                value={currentQuestion.correctAnswer?.toString()}
                                                onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: parseInt(value) })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">True</SelectItem>
                                                    <SelectItem value="1">False</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {currentQuestion.type === 'short-answer' && (
                                        <div>
                                            <Label>Correct Answer</Label>
                                            <Input
                                                placeholder="Enter the correct answer..."
                                                value={currentQuestion.correctAnswer as string || ''}
                                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Student answers will need to be graded manually</p>
                                        </div>
                                    )}

                                    <div className="w-32">
                                        <Label>Points</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={currentQuestion.points}
                                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
                                        />
                                    </div>

                                    <Button
                                        onClick={handleAddQuestion}
                                        variant="outline"
                                        disabled={!currentQuestion.question}
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Question
                                    </Button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 border-t pt-4">
                                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreateQuiz}
                                        disabled={!newQuiz.title || !newQuiz.description || questions.length === 0}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Create Quiz
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="grid gap-4">
                {classQuizzes.map((quiz) => {
                    const dueDate = formatDueDate(quiz.dueDate);
                    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

                    return (
                        <Card key={quiz.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4 flex-1">
                                    <div className="p-3 rounded-full bg-purple-50 text-purple-600 h-fit">
                                        <ClipboardList className="h-6 w-6" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium mb-2">{quiz.title}</h3>
                                        <p className="text-gray-600 mb-4">{quiz.description}</p>

                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Clock className="h-4 w-4" />
                                                <span>{quiz.duration} minutes</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>{totalPoints} points</span>
                                            </div>
                                            <div className="text-gray-600">
                                                <span>{quiz.questions.length} questions</span>
                                            </div>
                                            <div className="text-gray-600">
                                                <span>{quiz.attempts} {quiz.attempts === 1 ? 'attempt' : 'attempts'} allowed</span>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <span className={`text-sm ${dueDate.isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                                                Due: {dueDate.text}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    {role === 'student' && (
                                        <Button
                                            onClick={() => navigate(`/class/${classId}/quiz/${quiz.id}/take`)}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Start Quiz
                                        </Button>
                                    )}
                                    {role === 'teacher' && (
                                        <>
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                15/25 completed
                                            </Badge>
                                            <Button variant="outline" size="sm">
                                                View Results
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}

                {classQuizzes.length === 0 && (
                    <Card className="p-12 text-center">
                        <ClipboardList className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500">No quizzes available yet</p>
                    </Card>
                )}
            </div>
        </div>
    );
}