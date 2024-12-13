export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message || "An error occurred");
  }
  return response.json();
}

// Types
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

interface Category {
  _id: string;
  name: string;
  creator: string;
  createdAt: string;
}

interface User {
  username: string;
  role: "designer" | "player";
  points?: number;
}

export const apiClient = {
  // Auth Endpoints
  async login(username: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  async register(
    username: string,
    password: string,
    role: "designer" | "player"
  ) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    return handleResponse(response);
  },

  // Designer Endpoints
  async getQuestions(token: string) {
    const response = await fetch("/api/designer/questions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async createQuestion(
    token: string,
    data: {
      text: string;
      options: string[];
      correctAnswer: number;
      categoryId?: string;
      difficulty: number;
      relatedQuestions?: string[];
    }
  ) {
    const response = await fetch("/api/designer/questions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async updateQuestion(
    token: string,
    questionId: string,
    data: Partial<{
      text: string;
      options: string[];
      correctAnswer: number;
      categoryId: string;
      difficulty: number;
    }>
  ) {
    const response = await fetch(`/api/designer/questions/${questionId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async deleteQuestion(token: string, questionId: string) {
    const response = await fetch(`/api/designer/questions/${questionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  // Category Endpoints
  async getCategories(token: string) {
    const response = await fetch("/api/designer/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async createCategory(token: string, name: string) {
    const response = await fetch("/api/designer/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  },

  async updateCategory(token: string, categoryId: string, name: string) {
    const response = await fetch(`/api/designer/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  },

  async deleteCategory(token: string, categoryId: string) {
    const response = await fetch(`/api/designer/categories/${categoryId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  // Player Endpoints
  async getFilteredQuestions(
    token: string,
    filters?: {
      category?: string;
      difficulty?: number;
    }
  ): Promise<Question[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.difficulty)
      params.append("difficulty", filters.difficulty.toString());

    const response = await fetch(`/api/player/questions?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async getRandomQuestion(token: string): Promise<Question> {
    const response = await fetch("/api/player/questions/random", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async submitAnswer(token: string, questionId: string, answer: number) {
    const response = await fetch(`/api/player/questions/${questionId}/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
    return handleResponse(response);
  },

  async getLeaderboard(token: string) {
    const response = await fetch("/api/player/leaderboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  // User Profile Endpoints
  async getUserProfile(token: string) {
    const response = await fetch("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async updateUserProfile(token: string, username: string) {
    const response = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    return handleResponse(response);
  },

  async getUserById(token: string, userId: string) {
    const response = await fetch(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  // Following/Followers Endpoints
  async followDesigner(token: string, designerId: string) {
    const response = await fetch(`/api/player/follow/designer/${designerId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async followPlayer(token: string, playerId: string) {
    const response = await fetch(`/api/player/follow/player/${playerId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async getFollowing(token: string) {
    const response = await fetch("/api/users/following", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async getFollowers(token: string) {
    const response = await fetch("/api/users/followers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  async getRandomQuestions(token: string): Promise<Question[]> {
    const response = await fetch("/api/player/questions/random", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },
};
