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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FollowUser {
  id: string;
  username: string;
  role: "designer" | "player";
}

interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  points: number;
  accuracy: number;
}

export default function ProfilePage() {
  const { token, user } = useAuth();
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [following, setFollowing] = useState<FollowUser[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    try {
      const [followersData, followingData, statsData] = await Promise.all([
        apiClient.getFollowers(token!),
        apiClient.getFollowing(token!),
        apiClient.getUserStats(token!),
      ]);
      setFollowers(followersData);
      setFollowing(followingData);
      setUserStats(statsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {user?.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user?.username}</CardTitle>
                <CardDescription>
                  {user?.role === "designer" ? "طراح" : "بازیکن"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          {user?.role === "player" && userStats && (
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">امتیاز کل</TableCell>
                    <TableCell>{userStats.points}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>دنبال‌کنندگان و دنبال‌شوندگان</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="followers">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="followers">
                  دنبال‌کنندگان ({followers.length})
                </TabsTrigger>
                <TabsTrigger value="following">
                  دنبال‌شده‌ها ({following.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="followers">
                <div className="space-y-4">
                  {followers.map((follower) => (
                    <div
                      key={follower.id}
                      className="flex items-center space-x-4 space-x-reverse"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {follower.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{follower.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {follower.role === "designer" ? "طراح" : "بازیکن"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="following">
                <div className="space-y-4">
                  {following.map((follow) => (
                    <div
                      key={follow.id}
                      className="flex items-center space-x-4 space-x-reverse"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {follow.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{follow.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {follow.role === "designer" ? "طراح" : "بازیکن"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
