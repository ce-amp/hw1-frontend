"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();
  const type = searchParams.get("type") || "player";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(loginData.username, loginData.password);
      router.push(`/${type}`);
    } catch (err) {
      setError("ورود ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    try {
      await register(
        registerData.username,
        registerData.password,
        type as "designer" | "player"
      );
      await login(registerData.username, registerData.password);
      router.push(`/${type}`);
    } catch (err) {
      setError("ثبت نام ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            سوال‌پیچ
          </CardTitle>
          <CardDescription className="text-center">
            به عنوان {type === "designer" ? "طراح" : "بازیکن"} وارد شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">ورود</TabsTrigger>
              <TabsTrigger value="register">ثبت نام</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">نام کاربری</Label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">رمز عبور</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  ورود
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">نام کاربری</Label>
                  <Input
                    id="register-username"
                    type="text"
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">رمز عبور</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">
                    تکرار رمز عبور
                  </Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  ثبت نام
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
