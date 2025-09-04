export interface Task {
    id: number;
    title: string;
    description: string;
    difficulty: 'low' | 'medium' | 'high';
    completed: boolean;
    xp: number;
}