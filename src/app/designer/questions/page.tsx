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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  options: string[];
  correctAnswer: string;
}

export default function QuestionManagement() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "سوال نمونه 1",
      category: "عمومی",
      difficulty: "آسان",
      options: ["گزینه 1", "گزینه 2", "گزینه 3", "گزینه 4"],
      correctAnswer: "گزینه 1",
    },
    {
      id: 2,
      text: "سوال نمونه 2",
      category: "تخصصی",
      difficulty: "متوسط",
      options: ["گزینه 1", "گزینه 2", "گزینه 3", "گزینه 4"],
      correctAnswer: "گزینه 2",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState<Omit<Question, "id">>({
    text: "",
    category: "",
    difficulty: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...newQuestion, id: questions.length + 1 }]);
    setNewQuestion({
      text: "",
      category: "",
      difficulty: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">مدیریت سوالات</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>افزودن سوال جدید</CardTitle>
          <CardDescription>مشخصات سوال جدید را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question-text">متن سوال</Label>
              <Input
                id="question-text"
                value={newQuestion.text}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, text: e.target.value })
                }
                placeholder="متن سوال را وارد کنید"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select
                  onValueChange={(value) =>
                    setNewQuestion({ ...newQuestion, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عمومی">عمومی</SelectItem>
                    <SelectItem value="تخصصی">تخصصی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">سختی</Label>
                <Select
                  onValueChange={(value) =>
                    setNewQuestion({ ...newQuestion, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب سختی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="آسان">آسان</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="سخت">سخت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>گزینه‌ها</Label>
              <div className="grid grid-cols-2 gap-4">
                {newQuestion.options.map((option, index) => (
                  <Input
                    key={index}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                    placeholder={`گزینه ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="correct-answer">پاسخ صحیح</Label>
              <Select
                onValueChange={(value) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب پاسخ صحیح" />
                </SelectTrigger>
                <SelectContent>
                  {newQuestion.options.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option || `option_${index + 1}`}
                    >
                      {option || `گزینه ${index + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddQuestion}>افزودن سوال</Button>
        </CardFooter>
      </Card>
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
                <TableRow key={question.id}>
                  <TableCell>{question.text}</TableCell>
                  <TableCell>{question.category}</TableCell>
                  <TableCell>{question.difficulty}</TableCell>
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
