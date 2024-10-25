"use client";

import { useState } from "react";
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

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "پایتخت ایران کدام شهر است؟",
    options: ["تهران", "اصفهان", "شیراز", "تبریز"],
    correctAnswer: "تهران",
  },
  {
    id: 2,
    text: "کدام گزینه از عناصر اصلی زبان HTML نیست؟",
    options: ["<div>", "<span>", "<section>", "<style>"],
    correctAnswer: "<style>",
  },
  // Add more questions as needed
];

export default function PlayerQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              نتیجه آزمون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-xl mb-4">
              شما {score} سوال از {questions.length} سوال را درست پاسخ دادید.
            </p>
            <p className="text-center text-lg">
              امتیاز شما: {((score / questions.length) * 100).toFixed(2)}%
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={resetQuiz}>شروع مجدد</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            سوال {currentQuestion + 1} از {questions.length}
          </CardTitle>
          <CardDescription>لطفاً به سوال زیر پاسخ دهید</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl mb-4">{questions[currentQuestion].text}</h2>
          <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer}>
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleAnswer} disabled={!selectedAnswer}>
            {currentQuestion + 1 === questions.length
              ? "پایان آزمون"
              : "سوال بعدی"}
          </Button>
          <p className="text-sm text-muted-foreground">امتیاز: {score}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
