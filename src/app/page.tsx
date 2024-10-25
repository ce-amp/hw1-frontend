import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            سوال‌پیچ
          </CardTitle>
          <CardDescription className="text-center">
            به پلتفرم طراحی و پاسخ به سوالات خوش آمدید
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">لطفاً نوع کاربری خود را انتخاب کنید:</p>
          <div className="flex justify-center space-x-4">
            <Link href="/login?type=designer">
              <Button variant="outline">طراح</Button>
            </Link>
            <Link href="/login?type=player">
              <Button variant="outline">بازیکن</Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            برای شروع، نوع کاربری خود را انتخاب کنید
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
