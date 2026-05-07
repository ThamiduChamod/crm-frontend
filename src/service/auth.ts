import api from "./api"

type RegisterData = {
  name: string
  email: string
  password: string
}

export const getMyDetails = async () => {
  const res = await api.get("/auth/me")
  return res.data
}
export const refreshTokens = async (refreshToken: string) => {
    const res = await api.post("/auth/refresh", {token: refreshToken})
    return res.data
}

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password })
  return res.data
}

export const register = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data)
  return res.data
}