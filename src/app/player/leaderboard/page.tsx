"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { apiClient } from "@/lib/api-client";
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
  username: string;
  points: number;
  rank?: number;
}

const LeaderboardPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");
        const leaderboardData = await apiClient.getLeaderboard(token!);
        // Add rank to each player based on their position in the array
        const rankedPlayers = leaderboardData.map(
          (player: any, index: any) => ({
            ...player,
            rank: index + 1,
          })
        );
        setPlayers(rankedPlayers);
      } catch (err) {
        setError("خطا در دریافت جدول امتیازات");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLeaderboard();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

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
                <TableRow key={player.username}>
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {player.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {player.username}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{player.points}</TableCell>
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
