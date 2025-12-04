import { useState } from 'react';
import { getUser } from '@/utils/storage';
import type { Class, Announcement } from '@/mock/MockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';


interface StreamTabProps {
    classData: Class;
    announcements: Announcement[];
}

export default function StreamTab({ classData, announcements }: StreamTabProps) {

    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const handlePostAnnouncement = () => {
        setNewAnnouncement('');
        setShowAnnouncementDialog(false);
    };

    const raw = getUser();
    const role = raw?.role?.role_name || "";
    const userName = raw ? `${raw.first_name} ${raw.last_name || ""}` : "";



    return (
        <div className="max-w-3xl mx-auto">
            <Card className="mb-6 overflow-hidden">
                <div className={`${classData.color} h-32 relative`}>
                    <div
                        className="absolute inset-0 opacity-30 bg-cover bg-center"
                        style={{ backgroundImage: `url(${classData.imageUrl})` }}
                    />
                </div>
                <div className="p-6">
                    <h2 className="text-2xl mb-2">{classData.name}</h2>
                    <p className="text-gray-600">{classData.section} • {classData.room}</p>
                </div>
            </Card>

            {role === 'teacher' ? (
                <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
                    <DialogTrigger asChild>
                        <Card className="mb-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                                    <AvatarFallback>{userName[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="text-gray-600">Announce something to your class...</span>
                            </div>
                        </Card>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create announcement</DialogTitle>
                            <DialogDescription>Share an announcement with your class</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <Textarea
                                placeholder="Share something with your class..."
                                value={newAnnouncement}
                                onChange={(e) => setNewAnnouncement(e.target.value)}
                                rows={6}
                            />

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handlePostAnnouncement}
                                    disabled={!newAnnouncement.trim()}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Post
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ) : (
                <Card className="mb-4 p-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                            <AvatarFallback>{userName[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <input
                            type="text"
                            placeholder="Share something with your class..."
                            className="flex-1 bg-transparent outline-none text-gray-600"
                            readOnly
                        />
                    </div>
                </Card>
            )}

            <div className="space-y-4">
                {announcements.map((announcement) => (
                    <Card key={announcement.id} className="p-6">
                        <div className="flex items-start gap-3">
                            <Avatar>
                                <AvatarImage src={announcement.authorAvatar} />
                                <AvatarFallback>{announcement.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">{announcement.author}</span>
                                    <span className="text-sm text-gray-500">{formatDate(announcement.timestamp)}</span>
                                </div>
                                <p className="text-gray-700 mb-4">{announcement.content}</p>
                                <div className="flex items-center gap-4 pt-2 border-t">
                                    <Button variant="ghost" size="sm" className="text-gray-600">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Add class comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
