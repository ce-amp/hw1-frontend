"use client";

import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Category {
  id: number;
  name: string;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "عمومی" },
    { id: 2, name: "تخصصی" },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: categories.length + 1, name: newCategory },
      ]);
      setNewCategory("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        مدیریت دسته‌بندی‌ها
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>افزودن دسته‌بندی جدید</CardTitle>
          <CardDescription>نام دسته‌بندی جدید را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-grow space-y-2">
              <Label htmlFor="new-category">نام دسته‌بندی</Label>
              <Input
                id="new-category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="نام دسته‌بندی را وارد کنید"
              />
            </div>
            <Button onClick={handleAddCategory}>افزودن</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>لیست دسته‌بندی‌ها</CardTitle>
          <CardDescription>مدیریت دسته‌بندی‌های موجود</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام دسته‌بندی</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      ویرایش
                    </Button>
                    <Button variant="destructive" size="sm">
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
