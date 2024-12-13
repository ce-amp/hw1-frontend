"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface User {
  _id: string;
  username: string;
  role: "designer" | "player";
}

export default function UsersPage() {
  const { token, user: currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUsers();
      loadFollowing();
    }
  }, [token]);

  const loadUsers = async () => {
    try {
      const response = await apiClient.getAllUsers(token!);
      console.log("Users response:", response);

      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }

      const filteredUsers = response.filter(
        (user: User) => user._id !== currentUser?._id
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error loading users:", error);

      toast({
        title: "خطا",
        description: "خطا در بارگذاری کاربران",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFollowing = async () => {
    try {
      const followingData = await apiClient.getFollowing(token!);
      setFollowing(followingData.map((f: any) => f._id));
    } catch (error) {
      console.error("Error loading following:", error);
    }
  };

  const handleFollowAction = async (
    userId: string,
    role: "designer" | "player",
    isFollowing: boolean
  ) => {
    if (!userId || !token) {
      console.error("Missing user ID or token");
      return;
    }

    try {
      if (isFollowing) {
        if (role === "designer") {
          await apiClient.unfollowDesigner(token, userId);
        } else {
          await apiClient.unfollowPlayer(token, userId);
        }
      } else {
        if (role === "designer") {
          await apiClient.followDesigner(token, userId);
        } else {
          await apiClient.followPlayer(token, userId);
        }
      }

      // Reload following list after action
      const followingData = await apiClient.getFollowing(token);
      setFollowing(followingData.map((f: any) => f._id));

      toast({
        title: "موفق",
        description: isFollowing
          ? "لغو دنبال کردن با موفقیت انجام شد"
          : "کاربر با موفقیت دنبال شد",
      });
    } catch (error: any) {
      console.error("Follow action error:", error);
      toast({
        title: "خطا",
        description:
          error.message ||
          (isFollowing
            ? "خطا در لغو دنبال کردن کاربر"
            : "خطا در دنبال کردن کاربر"),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>لیست کاربران</CardTitle>
          <CardDescription>مشاهده و دنبال کردن کاربران</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>کاربر</TableHead>
                <TableHead>نقش</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    هیچ کاربری یافت نشد
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === "designer" ? "طراح" : "بازیکن"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={
                          following.includes(user._id) ? "outline" : "default"
                        }
                        size="sm"
                        onClick={() =>
                          handleFollowAction(
                            user._id,
                            user.role,
                            following.includes(user._id)
                          )
                        }
                      >
                        {following.includes(user._id)
                          ? "لغو دنبال کردن"
                          : "دنبال کردن"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
