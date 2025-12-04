export interface Class {
    id: string;
    name: string;
    section: string;
    subject: string;
    room: string;
    teacher: string;
    color: string;
    imageUrl: string;
}

export interface Assignment {
    id: string;
    classId: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    type: 'assignment' | 'material' | 'quiz';
    attachments?: string[];
    submitted?: boolean;
    grade?: number;
}

export interface Quiz {
    id: string;
    classId: string;
    title: string;
    description: string;
    dueDate: string;
    duration: number; // in minutes
    points: number;
    questions: QuizQuestion[];
    attempts: number;
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | number;
    points: number;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    studentId: string;
    answers: Record<string, string | number>;
    score: number;
    completedAt: string;
}

export interface Discussion {
    id: string;
    classId: string;
    title: string;
    content: string;
    author: string;
    authorAvatar: string;
    authorRole: 'teacher' | 'student';
    timestamp: string;
    replies: DiscussionReply[];
}

export interface DiscussionReply {
    id: string;
    author: string;
    authorAvatar: string;
    authorRole: 'teacher' | 'student';
    content: string;
    timestamp: string;
}

export interface Resource {
    id: string;
    classId: string;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'document';
    url: string;
    uploadedBy: string;
    uploadedAt: string;
    category: string;
}

export interface Announcement {
    id: string;
    classId: string;
    author: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
    attachments?: string[];
}

export interface Student {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface Submission {
    id: string;
    assignmentId: string;
    studentId: string;
    studentName: string;
    studentAvatar: string;
    submittedAt: string;
    content: string;
    grade?: number;
    feedback?: string;
}

export interface Attendance {
    id: string;
    classId: string;
    studentId: string;
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
}

export interface Progress {
    studentId: string;
    classId: string;
    completedAssignments: number;
    totalAssignments: number;
    averageGrade: number;
    attendance: number;
    lastActive: string;
}

export const classes: Class[] = [
    {
        id: '1',
        name: 'Mathematics',
        section: 'Section A',
        subject: 'Advanced Calculus',
        room: 'Room 101',
        teacher: 'Dr. Sarah Johnson',
        color: 'bg-blue-600',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80'
    },
    {
        id: '2',
        name: 'Computer Science',
        section: 'Section B',
        subject: 'Data Structures',
        room: 'Room 203',
        teacher: 'Prof. Michael Chen',
        color: 'bg-green-600',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'
    },
    {
        id: '3',
        name: 'Physics',
        section: 'Section C',
        subject: 'Quantum Mechanics',
        room: 'Lab 105',
        teacher: 'Dr. Emily Watson',
        color: 'bg-purple-600',
        imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80'
    },
    {
        id: '4',
        name: 'English Literature',
        section: 'Section A',
        subject: 'Modern Poetry',
        room: 'Room 301',
        teacher: 'Prof. David Miller',
        color: 'bg-red-600',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'
    },
    {
        id: '5',
        name: 'Chemistry',
        section: 'Section D',
        subject: 'Organic Chemistry',
        room: 'Lab 202',
        teacher: 'Dr. Lisa Anderson',
        color: 'bg-orange-600',
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&q=80'
    },
    {
        id: '6',
        name: 'History',
        section: 'Section B',
        subject: 'World History',
        room: 'Room 405',
        teacher: 'Prof. Robert Taylor',
        color: 'bg-teal-600',
        imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&q=80'
    }
];

export const assignments: Assignment[] = [
    {
        id: '1',
        classId: '1',
        title: 'Calculus Problem Set 5',
        description: 'Complete problems 1-20 from Chapter 5. Show all your work and explain your reasoning for each problem.',
        dueDate: '2025-12-10T23:59:00',
        points: 100,
        type: 'assignment',
        submitted: false
    },
    {
        id: '2',
        classId: '1',
        title: 'Integration Techniques Quiz',
        description: 'Online quiz covering integration by parts, substitution, and partial fractions.',
        dueDate: '2025-12-08T23:59:00',
        points: 50,
        type: 'quiz',
        submitted: true,
        grade: 45
    },
    {
        id: '3',
        classId: '2',
        title: 'Binary Search Tree Implementation',
        description: 'Implement a binary search tree with insert, delete, and search operations. Include unit tests.',
        dueDate: '2025-12-15T23:59:00',
        points: 100,
        type: 'assignment',
        submitted: false
    },
    {
        id: '4',
        classId: '2',
        title: 'Algorithm Complexity Reading',
        description: 'Read Chapter 3 on Big O notation and time complexity analysis.',
        dueDate: '2025-12-05T23:59:00',
        points: 0,
        type: 'material',
        submitted: true
    },
    {
        id: '5',
        classId: '3',
        title: 'Quantum States Lab Report',
        description: 'Write a detailed lab report on the quantum states experiment conducted last week.',
        dueDate: '2025-12-12T23:59:00',
        points: 100,
        type: 'assignment',
        submitted: false
    }
];

export const quizzes: Quiz[] = [
    {
        id: '1',
        classId: '1',
        title: 'Calculus Fundamentals',
        description: 'Test your understanding of limits, derivatives, and integration',
        dueDate: '2025-12-15T23:59:00',
        duration: 45,
        points: 100,
        attempts: 2,
        questions: [
            {
                id: 'q1',
                question: 'What is the derivative of x²?',
                type: 'multiple-choice',
                options: ['x', '2x', 'x³', '2x²'],
                correctAnswer: 1,
                points: 10
            },
            {
                id: 'q2',
                question: 'The integral of 1/x is ln(x)',
                type: 'true-false',
                options: ['True', 'False'],
                correctAnswer: 0,
                points: 10
            }
        ]
    },
    {
        id: '2',
        classId: '2',
        title: 'Data Structures Basics',
        description: 'Quiz on arrays, linked lists, and trees',
        dueDate: '2025-12-20T23:59:00',
        duration: 60,
        points: 100,
        attempts: 1,
        questions: [
            {
                id: 'q1',
                question: 'What is the time complexity of binary search?',
                type: 'multiple-choice',
                options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                correctAnswer: 1,
                points: 20
            }
        ]
    }
];

export const discussions: Discussion[] = [
    {
        id: '1',
        classId: '1',
        title: 'Question about Problem Set 5',
        content: 'I\'m having trouble understanding problem 15. Can someone explain the chain rule application?',
        author: 'John Doe',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        authorRole: 'student',
        timestamp: '2025-12-02T14:30:00',
        replies: [
            {
                id: 'r1',
                author: 'Dr. Sarah Johnson',
                authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                authorRole: 'teacher',
                content: 'Great question! The chain rule states that if you have a composite function f(g(x)), the derivative is f\'(g(x)) * g\'(x). In problem 15, you have sin(x²), so...',
                timestamp: '2025-12-02T15:00:00'
            },
            {
                id: 'r2',
                author: 'Jane Smith',
                authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
                authorRole: 'student',
                content: 'I had the same question! This explanation really helped, thanks!',
                timestamp: '2025-12-02T16:00:00'
            }
        ]
    },
    {
        id: '2',
        classId: '2',
        title: 'Study Group for Final Exam',
        content: 'Anyone interested in forming a study group for the final exam? I was thinking we could meet on weekends.',
        author: 'Mike Johnson',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        authorRole: 'student',
        timestamp: '2025-12-01T10:00:00',
        replies: []
    }
];

export const resources: Resource[] = [
    {
        id: '1',
        classId: '1',
        title: 'Calculus Reference Guide',
        type: 'pdf',
        url: '#',
        uploadedBy: 'Dr. Sarah Johnson',
        uploadedAt: '2025-11-15T10:00:00',
        category: 'Study Materials'
    },
    {
        id: '2',
        classId: '1',
        title: 'Integration Techniques Video Tutorial',
        type: 'video',
        url: '#',
        uploadedBy: 'Dr. Sarah Johnson',
        uploadedAt: '2025-11-20T14:00:00',
        category: 'Video Lectures'
    },
    {
        id: '3',
        classId: '2',
        title: 'Big O Notation Cheat Sheet',
        type: 'pdf',
        url: '#',
        uploadedBy: 'Prof. Michael Chen',
        uploadedAt: '2025-11-18T09:00:00',
        category: 'Study Materials'
    },
    {
        id: '4',
        classId: '2',
        title: 'Khan Academy - Data Structures',
        type: 'link',
        url: 'https://www.khanacademy.org',
        uploadedBy: 'Prof. Michael Chen',
        uploadedAt: '2025-11-10T11:00:00',
        category: 'External Resources'
    }
];

export const announcements: Announcement[] = [
    {
        id: '1',
        classId: '1',
        author: 'Dr. Sarah Johnson',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        content: 'Welcome to Advanced Calculus! Please review the syllabus and let me know if you have any questions.',
        timestamp: '2025-12-01T10:00:00'
    },
    {
        id: '2',
        classId: '1',
        author: 'Dr. Sarah Johnson',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        content: 'Reminder: Office hours are Tuesday and Thursday 2-4 PM. Feel free to drop by with questions!',
        timestamp: '2025-12-02T14:00:00'
    },
    {
        id: '3',
        classId: '2',
        author: 'Prof. Michael Chen',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        content: 'Great job on the last assignment! Average score was 87%. Keep up the good work!',
        timestamp: '2025-12-01T16:30:00'
    }
];

export const students: Student[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@school.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@school.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@school.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@school.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    {
        id: '5',
        name: 'Alex Brown',
        email: 'alex.brown@school.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    }
];

export const submissions: Submission[] = [
    {
        id: '1',
        assignmentId: '1',
        studentId: '1',
        studentName: 'John Doe',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        submittedAt: '2025-12-03T15:30:00',
        content: 'I have completed all 20 problems. Please find my work attached.',
        grade: 95,
        feedback: 'Excellent work! Your explanations were clear and thorough.'
    },
    {
        id: '2',
        assignmentId: '1',
        studentId: '2',
        studentName: 'Jane Smith',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        submittedAt: '2025-12-03T18:45:00',
        content: 'Completed the problem set. Had some difficulty with problem 15.',
    },
    {
        id: '3',
        assignmentId: '1',
        studentId: '3',
        studentName: 'Mike Johnson',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        submittedAt: '2025-12-03T20:15:00',
        content: 'All problems completed with detailed solutions.',
        grade: 88,
        feedback: 'Good work overall. Review the chain rule application in problem 12.'
    }
];

export const attendance: Attendance[] = [
    { id: '1', classId: '1', studentId: '1', date: '2025-12-01', status: 'present' },
    { id: '2', classId: '1', studentId: '2', date: '2025-12-01', status: 'present' },
    { id: '3', classId: '1', studentId: '3', date: '2025-12-01', status: 'late' },
    { id: '4', classId: '1', studentId: '1', date: '2025-12-02', status: 'present' },
    { id: '5', classId: '1', studentId: '2', date: '2025-12-02', status: 'absent' },
];

export const progress: Progress[] = [
    {
        studentId: '1',
        classId: '1',
        completedAssignments: 8,
        totalAssignments: 10,
        averageGrade: 92,
        attendance: 95,
        lastActive: '2025-12-03T15:30:00'
    },
    {
        studentId: '2',
        classId: '1',
        completedAssignments: 7,
        totalAssignments: 10,
        averageGrade: 85,
        attendance: 88,
        lastActive: '2025-12-03T14:20:00'
    }
];
