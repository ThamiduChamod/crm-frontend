import api from "./api";

type RegisterData = {
  name: string
  company: string
  email: string
  phone: string
  source: string
  status: string
  dealValue: string
}

export const addLeader = async (data: RegisterData) => {
  const res = await api.post("/leader/save", data,{
     headers: {
            "Content-Type": "application/json"
        }
  })
  return res.data
}