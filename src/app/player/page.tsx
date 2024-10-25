import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PlayerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">داشبورد بازیکن</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>پاسخ به سوالات</CardTitle>
            <CardDescription>
              به سوالات موجود پاسخ دهید و امتیاز کسب کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="medium">
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="انتخاب حالت بازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">آسان</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="hard">سخت</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/player/questions">
              <Button className="w-full">شروع بازی</Button>
            </Link>
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
      </div>
    </div>
  );
}
