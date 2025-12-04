import { Menu, Plus, Grid3x3, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/api/AuthApi';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getUser, removeUser, removeToken } from '@/utils/storage';

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            try {
                setUser(storedUser);
            } catch (err) {
                console.error('Failed to parse stored user', err);
            }
        }
    }, []);


    const handleLogout = async () => {
        await logout();
        removeUser();
        removeToken();
        navigate('/login');


    };

    if (!user) return null;


    const role = user.role?.role_name || '';
    const userName = `${user.first_name} ${user.last_name}`;

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/${role}-dashboard`)}>
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                            </svg>
                        </div>
                        <span className="text-xl text-gray-700">Classroom</span>
                    </div>
                    {role && (
                        <Badge variant="outline" className="capitalize">
                            {role}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {role === 'teacher' && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>Create class</DropdownMenuItem>
                                <DropdownMenuItem>Create assignment</DropdownMenuItem>
                                <DropdownMenuItem>Create announcement</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {role === 'student' && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>Join class</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <Button variant="ghost" size="icon">
                        <Grid3x3 className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage
                                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                                />
                                <AvatarFallback>{userName[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-2 py-3 border-b">
                                <p className="font-medium">{userName}</p>
                                <p className="text-sm text-gray-500 capitalize">{role}</p>
                            </div>
                            <DropdownMenuItem>
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
