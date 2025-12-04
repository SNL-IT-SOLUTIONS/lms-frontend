import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield, User, Lock, Sparkles, ArrowRight } from "lucide-react";

// context
import { useAuthContext } from "@/context/AuthContext";
import { useLoader } from "@/context/LoaderContext";

// api
import { login } from "@/api/AuthApi"

// token storage
import { saveToken } from "@/utils/storage";
import { saveUser } from "@/utils/storage";

export default function Login() {
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const { setUser } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        showLoader();
        try {
            const res = await login(email, password);
            setUser(res.data.user);
            await saveToken(res.data.token);
            await saveUser(JSON.stringify(res.data.user));

            toast.success("Welcome back! Login successful", {
                description: `Redirecting to your dashboard...`,
                duration: 2000,
            });

            // Add a slight delay for better UX
            setTimeout(() => {
                switch (res.data.user.role.role_name) {
                    case "admin":
                        navigate("/admin-dashboard");
                        break;
                    case "teacher":
                        navigate("/teacher-dashboard");
                        break;
                    default:
                        navigate("/student-dashboard");
                }
            }, 500);

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login failed";
            toast.error("Authentication Error", {
                description: errorMessage,
                action: {
                    label: "Retry",
                    onClick: () => handleLogin(e),
                },
            });
        } finally {
            hideLoader();
        }
    }

    const demoLogin = (role: string) => {
        const demoCredentials = {
            admin: { email: "admin@admin.com", password: "admin123" },
            teacher: { email: "teacher@teacher", password: "teacher123" },
            student: { email: "student@student", password: "student123" }
        };

        const creds = demoCredentials[role as keyof typeof demoCredentials];
        if (creds) {
            setEmail(creds.email);
            setPassword(creds.password);
            toast.info(`Demo ${role} credentials loaded`, {
                description: "Click login to continue",
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                                LearnFlow
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">Modern Learning Platform</p>
                        </div>
                    </div>
                    <p className="text-gray-600">Sign in to access your learning dashboard</p>
                </div>

                <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/90 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <LogIn className="h-5 w-5 text-blue-600" />
                                    Welcome Back
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    Enter your credentials to continue
                                </CardDescription>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Sparkles className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all rounded-xl"
                                        required
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                                        <Lock className="h-4 w-4" />
                                        Password
                                    </Label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                                    >
                                        {showPassword ? (
                                            <>
                                                <EyeOff className="h-4 w-4" />
                                                Hide
                                            </>
                                        ) : (
                                            <>
                                                <Eye className="h-4 w-4" />
                                                Show
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all rounded-xl"
                                        required
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => toast.info("Please contact your administrator")}
                                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Sign In
                                    <ArrowRight className={`h-4 w-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                                </span>
                            </Button>
                        </form>

                        {/* Demo Access Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-center text-sm text-gray-500 mb-4">Quick Demo Access</p>
                            <div className="grid grid-cols-3 gap-2">
                                {["admin", "teacher", "student"].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => demoLogin(role)}
                                        className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all capitalize"
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 bg-white text-gray-500">New to LearnFlow?</span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 group"
                            >
                                Create an account
                                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our
                        <button className="text-blue-600 hover:text-blue-700 mx-1">Terms</button>
                        and
                        <button className="text-blue-600 hover:text-blue-700 mx-1">Privacy Policy</button>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        © 2024 LearnFlow LMS. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}