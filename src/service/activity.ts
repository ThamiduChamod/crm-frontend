import api from "./api";

export const getActivities = async () => {
  const res = await api.get("/activity/get");
  return res.data;
}