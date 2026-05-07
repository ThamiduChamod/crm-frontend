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

type UpdateData = {
  name?: string
  company?: string
  email?: string
  phone?: string
  source?: string
  status?: string
  dealValue?: string
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

export const saveNote = async(content: string, leadId: number) => {
  const res = await  api.post("/note/save", { content, leadId },{
    headers: {
        "Content-Type": "application/json"
      }
  })
  return res.data;
}

export const getNotes = async (leadId: number) => {
  const res = await api.get(`/note/getNotes/${leadId}`);
  return res.data;
}

export const deleteLead = async (id: number) => {
  const res = await api.delete(`/leader/delete/${id}`);
  return res.data;
}

export const updateLead = async (id: number, data: UpdateData) => {
  const res = await api.put(`/leader/update/${id}`, data, {
    headers: {
        "Content-Type": "application/json"
    }
  });
  return res.data;
}