import { useState } from 'react';
import { resources } from '@/mock/MockData';
import { getUser } from '@/utils/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Link as LinkIcon, File, Plus, Download, Upload } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ResourcesTabProps {
    classId: string;
}
const raw = getUser();
const role = raw?.role?.role_name || "";


export default function ResourcesTab({ classId }: ResourcesTabProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const classResources = resources.filter(r => r.classId === classId);
    const categories = ['all', ...new Set(classResources.map(r => r.category))];

    const filteredResources = selectedCategory === 'all'
        ? classResources
        : classResources.filter(r => r.category === selectedCategory);

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <FileText className="h-5 w-5" />;
            case 'video':
                return <Video className="h-5 w-5" />;
            case 'link':
                return <LinkIcon className="h-5 w-5" />;
            default:
                return <File className="h-5 w-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'pdf':
                return 'bg-red-50 text-red-600';
            case 'video':
                return 'bg-purple-50 text-purple-600';
            case 'link':
                return 'bg-blue-50 text-blue-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl mb-1">Resources</h2>
                    <p className="text-gray-600">Study materials, videos, and reference links</p>
                </div>
                {role === 'teacher' && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Resource
                    </Button>
                )}
            </div>

            <div className="mb-6">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-64">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat} className="capitalize">
                                {cat === 'all' ? 'All Categories' : cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                    <Card key={resource.id} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                                {getIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium mb-1 line-clamp-2">{resource.title}</h3>
                                <Badge variant="outline" className="text-xs capitalize">
                                    {resource.type}
                                </Badge>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                            <div>Uploaded by {resource.uploadedBy}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(resource.uploadedAt).toLocaleDateString()}
                            </div>
                        </div>

                        <Button variant="outline" className="w-full" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            {resource.type === 'link' ? 'Open Link' : 'Download'}
                        </Button>
                    </Card>
                ))}

                {filteredResources.length === 0 && (
                    <div className="col-span-full">
                        <Card className="p-12 text-center">
                            <File className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500">No resources found</p>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
