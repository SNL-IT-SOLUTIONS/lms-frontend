import { MoreVertical, Folder } from 'lucide-react';
import { Link } from 'react-router';
import type { Class } from '@/mock/MockData';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ClassCardProps {
    classData: Class;
}

export default function ClassCard({ classData }: ClassCardProps) {
    return (
        <Link to={`/student-dashboard/class/${classData.id}`} className="block group">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${classData.color} h-24 relative`}>
                    <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: `url(${classData.imageUrl})` }}
                    />
                    <div className="relative p-4 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white text-xl line-clamp-2">{classData.name}</h3>
                                <p className="text-white text-sm opacity-90">{classData.section}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Move</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Copy invite link</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Unenroll</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">{classData.subject}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{classData.teacher}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Folder className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
