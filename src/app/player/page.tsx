"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

const difficultyMap = {
  easy: 1,
  medium: 3,
  hard: 5,
};

export default function PlayerDashboard() {
  const [difficulty, setDifficulty] = useState<string>("medium");
  const router = useRouter();
  const { token } = useAuth();

  const handleStartGame = () => {
    router.push(
      `/player/questions?difficulty=${
        difficultyMap[difficulty as keyof typeof difficultyMap]
      }`
    );
  };

  const handleStartRandomQuiz = () => {
    router.push("/player/questions?mode=random");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">داشبورد بازیکن</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>پاسخ به سوالات</CardTitle>
            <CardDescription>
              به سوالات موجود پاسخ دهید و امتیاز کسب کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="انتخاب حالت بازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">آسان (سطح ۱)</SelectItem>
                <SelectItem value="medium">متوسط (سطح ۳)</SelectItem>
                <SelectItem value="hard">سخت (سطح ۵)</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" onClick={handleStartGame}>
              شروع بازی
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>کوییز تصادفی</CardTitle>
            <CardDescription>پاسخ به سوالات تصادفی از همه سطوح</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleStartRandomQuiz}>
              شروع کوییز تصادفی
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>جدول امتیازات</CardTitle>
            <CardDescription>مشاهده رتبه‌بندی بازیکنان</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/player/leaderboard">
              <Button className="w-full">مشاهده جدول</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>کاربران</CardTitle>
            <CardDescription>مشاهده و دنبال کردن کاربران دیگر</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/users">
              <Button className="w-full">مشاهده کاربران</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>پروفایل کاربری</CardTitle>
            <CardDescription>مشاهده و مدیریت اطلاعات حساب کاربری</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile">
              <Button className="w-full">مشاهده پروفایل</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
