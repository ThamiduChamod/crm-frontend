import api from "./api"

type RegisterData = {
  username: string
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