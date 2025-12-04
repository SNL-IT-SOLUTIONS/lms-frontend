import { useState } from 'react';
import { getUser } from '@/utils/storage';
import { discussions } from '@/mock/MockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Send } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface DiscussionsTabProps {
    classId: string;
}

const raw = getUser();
const userName = raw ? `${raw.first_name} ${raw.last_name || ""}` : "";

export default function DiscussionsTab({ classId }: DiscussionsTabProps) {

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
    const [replyContent, setReplyContent] = useState<Record<string, string>>({});

    const classDiscussions = discussions.filter(d => d.classId === classId);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const handleCreateDiscussion = () => {
        // In real app, save to backend
        setShowCreateDialog(false);
        setNewDiscussion({ title: '', content: '' });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl mb-1">Discussions</h2>
                    <p className="text-gray-600">Ask questions and collaborate with your classmates</p>
                </div>
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            New Discussion
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Start a Discussion</DialogTitle>
                            <DialogDescription>Ask a question or start a conversation</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <Input
                                    placeholder="What's your question or topic?"
                                    value={newDiscussion.title}
                                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <Textarea
                                    placeholder="Provide more details..."
                                    value={newDiscussion.content}
                                    onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                                    rows={6}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateDiscussion}
                                    disabled={!newDiscussion.title || !newDiscussion.content}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {classDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <Avatar>
                                <AvatarImage src={discussion.authorAvatar} />
                                <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">{discussion.author}</span>
                                    {discussion.authorRole === 'teacher' && (
                                        <Badge variant="outline" className="text-xs">Teacher</Badge>
                                    )}
                                    <span className="text-sm text-gray-500">{formatDate(discussion.timestamp)}</span>
                                </div>
                                <h3 className="text-lg font-medium mb-2">{discussion.title}</h3>
                                <p className="text-gray-700">{discussion.content}</p>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-sm">{discussion.replies.length}</span>
                            </div>
                        </div>

                        {discussion.replies.length > 0 && (
                            <div className="border-t pt-4 mt-4 space-y-4">
                                {discussion.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start gap-3 ml-8">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={reply.authorAvatar} />
                                            <AvatarFallback>{reply.author[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-sm">{reply.author}</span>
                                                {reply.authorRole === 'teacher' && (
                                                    <Badge variant="outline" className="text-xs">Teacher</Badge>
                                                )}
                                                <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{reply.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                                    <AvatarFallback>{userName[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 flex gap-2">
                                    <Input
                                        placeholder="Write a reply..."
                                        value={replyContent[discussion.id] || ''}
                                        onChange={(e) => setReplyContent({ ...replyContent, [discussion.id]: e.target.value })}
                                    />
                                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                {classDiscussions.length === 0 && (
                    <Card className="p-12 text-center">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500 mb-4">No discussions yet</p>
                        <p className="text-sm text-gray-400">Start a conversation with your class</p>
                    </Card>
                )}
            </div>
        </div>
    );
}
