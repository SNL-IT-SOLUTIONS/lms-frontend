

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

// context
import { useAuthContext } from "@/context/AuthContext";
import { useLoader } from "@/context/LoaderContext";

// api
import { login } from "@/api/AuthApi"

// token storage
import { saveToken } from "@/utils/storage";

export default function Login() {
    const navigate = useNavigate();

    const { showLoader, hideLoader } = useLoader();
    const { setUser } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //username : admin
    // password : admin123
    const handleLogin = async () => {
        showLoader();
        try {

            const res = await login(username, password);
            setUser(res.user);
            await saveToken(res.token);
            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            hideLoader();
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-foreground/10">
            <Card className="space-y-4 p-6 w-80">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="username">Username</Label>
                            <Input onChange={e => setUsername(e.target.value)} id="username" name="username" type="text" required />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input onChange={e => setPassword(e.target.value)} id="password" name="password" type="password" required />
                        </div>

                        <Button onClick={handleLogin} className="hover:cursor-pointer w-full mt-2">
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}









