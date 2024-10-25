import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DesignerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">داشبورد طراح</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>مدیریت سوالات</CardTitle>
            <CardDescription>ایجاد، ویرایش و حذف سوالات</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/designer/questions">
              <Button className="w-full">ورود به بخش سوالات</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>مدیریت دسته‌بندی‌ها</CardTitle>
            <CardDescription>
              ایجاد و مدیریت دسته‌بندی‌های سوالات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/designer/categories">
              <Button className="w-full">ورود به بخش دسته‌بندی‌ها</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
