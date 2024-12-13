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

export const apiClient = {
  async login(username: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });
    return handleResponse(response);
  },

  async getUserProfile(token: string) {
    const response = await fetch("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};
