"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useAuth } from "@/components/auth-provider";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

interface Question {
  _id: string;
  text: string;
  options: string[];
  category: {
    _id: string;
    name: string;
  } | null;
  difficulty: number;
  creator?: string;
  relatedQuestions?: string[];
  createdAt?: string;
}

export default function QuestionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionsContent />
    </Suspense>
  );
}

function QuestionsContent() {
  const { token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const difficulty = searchParams.get("difficulty");
  const mode = searchParams.get("mode");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (mode === "random") {
        const randomQuestions = await apiClient.getRandomQuestions(token!);
        setQuestions(randomQuestions);
      } else if (difficulty) {
        const filteredQuestions = await apiClient.getFilteredQuestions(token!, {
          difficulty: parseInt(difficulty),
        });
        if (filteredQuestions && filteredQuestions.length > 0) {
          setQuestions(filteredQuestions.slice(0, 10));
        } else {
          setError("سوالی با این درجه سختی یافت نشد.");
          return;
        }
      } else {
        setError("حالت بازی نامعتبر است.");
        return;
      }
    } catch (err) {
      setError("خطا در دریافت سوالات. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }, [token, mode, difficulty]);

  useEffect(() => {
    if (token && (mode === "random" || difficulty)) {
      loadQuestions();
    }
  }, [token, mode, difficulty, loadQuestions]);

  const handleSubmitAnswer = async () => {
    if (!questions[currentQuestionIndex] || selectedAnswer === -1) return;

    try {
      const result = await apiClient.submitAnswer(
        token!,
        questions[currentQuestionIndex]._id,
        selectedAnswer
      );

      if (result.correct) {
        setScore((prev) => prev + result.pointsEarned);
      }

      // Move to next question or end quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(-1);
      } else {
        router.push("/player/leaderboard");
      }
    } catch (err) {
      setError("خطا در ثبت پاسخ. لطفا دوباره تلاش کنید.");
    }
  };

  const handleEndQuiz = () => {
    router.push("/player/leaderboard");
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">{error}</p>
            <Button onClick={loadQuestions} className="w-full mt-4">
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            سوال {currentQuestionIndex + 1} از 10
          </CardTitle>
          <CardDescription>
            {currentQuestion?.category ? (
              <>
                دسته‌بندی: {currentQuestion.category.name} | درجه سختی:{" "}
                {currentQuestion.difficulty}
              </>
            ) : (
              <>درجه سختی: {currentQuestion?.difficulty}</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl mb-4">{currentQuestion?.text}</h2>
          <RadioGroup
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            value={selectedAnswer.toString()}
          >
            {currentQuestion?.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === -1}
            >
              ثبت پاسخ
            </Button>
            <Button variant="outline" onClick={handleEndQuiz}>
              پایان کویز
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">امتیاز: {score}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
