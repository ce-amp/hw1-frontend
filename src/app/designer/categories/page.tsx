"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
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
  _id: string;
  name: string;
}

export default function CategoryManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (token) {
      loadCategories();
    }
  }, [token]);

  const loadCategories = async () => {
    try {
      const data = await apiClient.getCategories(token!);
      setCategories(data);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری دسته‌بندی‌ها",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "خطا",
        description: "نام دسته‌بندی نمی‌تواند خالی باشد",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiClient.createCategory(token!, { name: newCategory.trim() });
      toast({
        title: "موفق",
        description: "دسته‌بندی با موفقیت اضافه شد",
      });
      await loadCategories();
      setNewCategory("");
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ایجاد دسته‌بندی",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    try {
      await apiClient.updateCategory(token!, category._id, { name: category.name });
      toast({
        title: "موفق",
        description: "دسته‌بندی با موفقیت بروزرسانی شد",
      });
      await loadCategories();
      setEditingCategory(null);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی دسته‌بندی",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await apiClient.deleteCategory(token!, id);
      toast({
        title: "موفق",
        description: "دسته‌بندی با موفقیت حذف شد",
      });
      await loadCategories();
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف دسته‌بندی",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

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
                <TableRow key={category._id}>
                  <TableCell>
                    {editingCategory?._id === category._id ? (
                      <Input
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory?._id === category._id ? (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleUpdateCategory(editingCategory)}
                        >
                          ذخیره
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCategory(null)}
                        >
                          انصراف
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mr-2"
                          onClick={() => setEditingCategory(category)}
                        >
                          ویرایش
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          حذف
                        </Button>
                      </>
                    )}
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
