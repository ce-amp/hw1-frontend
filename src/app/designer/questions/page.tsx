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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  _id: string;
  text: string;
  category: {
    _id: string;
    name: string;
  } | null;
  difficulty: number;
  options: string[];
  correctAnswer: number;
}

const emptyQuestion: Omit<Question, "_id"> = {
  text: "",
  category: null,
  difficulty: 1,
  options: ["", "", "", ""],
  correctAnswer: 0,
};

// Type for the form data that can be either a new question or existing question
type QuestionFormData = Omit<Question, "_id"> | Question;

export default function QuestionManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] =
    useState<Omit<Question, "_id">>(emptyQuestion);

  // Load questions and categories
  useEffect(() => {
    if (token) {
      loadQuestions();
      loadCategories();
    }
  }, [token]);

  const loadQuestions = async () => {
    try {
      const data = await apiClient.getQuestions(token!);
      setQuestions(data);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری سوالات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await apiClient.getCategories(token!);
      setCategories(data);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری دست��‌بندی‌ها",
        variant: "destructive",
      });
    }
  };

  const handleAddQuestion = async (formData: Omit<Question, "_id">) => {
    try {
      const questionData = {
        text: formData.text.trim(),
        options: formData.options,
        correctAnswer: formData.correctAnswer,
        categoryId: formData.category?._id,
        difficulty: formData.difficulty,
      };

      await apiClient.createQuestion(token!, questionData);
      toast({
        title: "موفق",
        description: "سوال با موفقیت اضافه شد",
      });

      await loadQuestions();
      setNewQuestion(emptyQuestion);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ایجاد سوال",
        variant: "destructive",
      });
    }
  };

  const handleEditQuestion = async (formData: Question) => {
    try {
      const questionData = {
        text: formData.text.trim(),
        options: formData.options,
        correctAnswer: formData.correctAnswer,
        categoryId: formData.category?._id,
        difficulty: formData.difficulty,
      };

      await apiClient.updateQuestion(token!, formData._id, questionData);
      toast({
        title: "موفق",
        description: "سوال با موفقیت بروزرسانی ��د",
      });

      await loadQuestions();
      setEditingQuestion(null);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی سوال",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await apiClient.deleteQuestion(token!, id);
      toast({
        title: "موفق",
        description: "سوال با موفقیت حذف شد",
      });
      loadQuestions();
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف سوال",
        variant: "destructive",
      });
    }
  };

  const startEditing = (question: Question) => {
    setEditingQuestion(question);
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
  };

  const QuestionForm = ({
    question,
    onSubmit,
    onCancel = undefined,
    submitLabel = "افزودن سوال",
  }: {
    question: QuestionFormData;
    onSubmit: (formData: QuestionFormData) => Promise<void>;
    onCancel?: () => void;
    submitLabel?: string;
  }) => {
    const [formValues, setFormValues] = useState<QuestionFormData>(question);

    useEffect(() => {
      setFormValues(question);
    }, [question]);

    const handleSubmit = async () => {
      if (!formValues.text.trim()) {
        toast({
          title: "خطا",
          description: "متن سوال نمی‌تواند خالی باشد",
          variant: "destructive",
        });
        return;
      }

      const validOptions = formValues.options.filter(
        (option) => option.trim() !== ""
      );
      if (validOptions.length < 2) {
        toast({
          title: "خطا",
          description: "حداقل دو گزینه باید وارد شود",
          variant: "destructive",
        });
        return;
      }

      await onSubmit({
        ...formValues,
        options: validOptions,
      });
    };

    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{onCancel ? "ویرایش سوال" : "افزودن سوال جدید"}</CardTitle>
          <CardDescription>مشخصات سوال را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question-text">متن سوال</Label>
              <Input
                id="question-text"
                value={formValues.text}
                onChange={(e) =>
                  setFormValues({ ...formValues, text: e.target.value })
                }
                placeholder="متن سوال را وارد کنید"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select
                  value={formValues.category?._id}
                  onValueChange={(value) => {
                    const category = categories.find((c) => c._id === value);
                    setFormValues({
                      ...formValues,
                      category: category || null,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">سختی</Label>
                <Select
                  value={String(formValues.difficulty)}
                  onValueChange={(value) =>
                    setFormValues({ ...formValues, difficulty: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب سختی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">آسان</SelectItem>
                    <SelectItem value="3">متوسط</SelectItem>
                    <SelectItem value="5">سخت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>گزینه‌ها</Label>
              <div className="grid grid-cols-2 gap-4">
                {formValues.options.map((option, index) => (
                  <Input
                    key={index}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formValues.options];
                      newOptions[index] = e.target.value;
                      setFormValues({ ...formValues, options: newOptions });
                    }}
                    placeholder={`گزینه ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="correct-answer">پاسخ صحیح</Label>
              <Select
                value={String(formValues.correctAnswer)}
                onValueChange={(value) =>
                  setFormValues({ ...formValues, correctAnswer: Number(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب پاسخ صحیح" />
                </SelectTrigger>
                <SelectContent>
                  {formValues.options.map((option, index) => (
                    <SelectItem key={index} value={String(index)}>
                      {option || `گزینه ${index + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>{submitLabel}</Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              انصراف
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">مدیریت سوالات</h1>

      {editingQuestion ? (
        <QuestionForm
          question={editingQuestion}
          onSubmit={
            handleEditQuestion as (formData: QuestionFormData) => Promise<void>
          }
          onCancel={() => setEditingQuestion(null)}
          submitLabel="بروزرسانی سوال"
        />
      ) : (
        <QuestionForm
          question={newQuestion}
          onSubmit={
            handleAddQuestion as (formData: QuestionFormData) => Promise<void>
          }
          submitLabel="افزودن سوال"
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>لیست سوالات</CardTitle>
          <CardDescription>مدیریت سوالات موجود</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>متن سوال</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>سختی</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question._id}>
                  <TableCell>{question.text}</TableCell>
                  <TableCell>
                    {question.category?.name || "بدون دسته‌بندی"}
                  </TableCell>
                  <TableCell>
                    {question.difficulty === 1
                      ? "آسان"
                      : question.difficulty === 3
                      ? "متوسط"
                      : "سخت"}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => startEditing(question)}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
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
