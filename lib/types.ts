export interface Student {
    id: string;
    name: string;
    school: string;
    grade: string;
    phone: string;
    parentPhone?: string;
    attendanceDays: number;
    lastVisit: string;
    enrolledDate: string;
    teacherId?: string; // Assigned teacher
    status: 'active' | 'inactive';
    subjects: string[];
}

export interface Teacher {
    id: string;
    name: string;
    role: 'Teacher' | 'Admin';
    subject: string;
    phone: string;
    email: string;
    bio?: string;
    imageUrl?: string;
}

export interface LearningRecord {
    id: string;
    studentId: string;
    title?: string;
    subject?: string;
    topic?: string;
    score?: number;
    feedback?: string;
    type: 'video' | 'material' | 'assignment';
    status: 'completed' | 'in-progress' | 'pending';
    date: string;
    duration?: string;
    fileUrl?: string;
    videoUrl?: string;
}
