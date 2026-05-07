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

export const getAllLeaders =async ()=>{
  const res = await api.get("/leader/all");
  return res.data;
}

export const getDetails = async (id: number) => {
   const res = await api.get(`/leader/details/${id}`);
  return res.data;
}