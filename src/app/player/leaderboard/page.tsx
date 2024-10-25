"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Player {
  id: number;
  name: string;
  score: number;
  rank: number;
  avatar: string;
}

const LeaderboardPage = () => {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "علی محمدی",
      score: 1200,
      rank: 1,
      avatar: "/avatars/ali.jpg",
    },
    {
      id: 2,
      name: "مریم احمدی",
      score: 1150,
      rank: 2,
      avatar: "/avatars/maryam.jpg",
    },
    {
      id: 3,
      name: "رضا کریمی",
      score: 1100,
      rank: 3,
      avatar: "/avatars/reza.jpg",
    },
    {
      id: 4,
      name: "زهرا حسینی",
      score: 1050,
      rank: 4,
      avatar: "/avatars/zahra.jpg",
    },
    {
      id: 5,
      name: "محمد رضایی",
      score: 1000,
      rank: 5,
      avatar: "/avatars/mohammad.jpg",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            جدول امتیازات
          </CardTitle>
          <CardDescription className="text-center">
            رتبه‌بندی بازیکنان بر اساس امتیاز
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">رتبه</TableHead>
                <TableHead>بازیکن</TableHead>
                <TableHead className="text-right">امتیاز</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={player.avatar} alt={player.name} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {player.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
