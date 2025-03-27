import { toast } from "react-toastify";
import { get, put, patch } from "../services/api";

export const loadStudentDetail = async (stuId) => {
  try {
    const res = await get(`/students/usid/${stuId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchALLStudent = async () => {
  try {
    const res = await get("/students");
    return res.data;
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
    return error;
  }
};

export const linkStudentToParent = async ({ stuId, parentId }) => {
  try {
    const res = await put(`/parents/${parentId}/add-student/${stuId}`, {});
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateStudentDetail = async (data, id) => {
  try {
    const res = await patch(`/students/${id}`, data);
    return res.data;
  } catch (error) {
    toast.error(error.message, { position: "top-right" });
    return error;
  }
};
