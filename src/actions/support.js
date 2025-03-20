import { post } from "../services/api";

export const submitSupportQuery = async (formData, user) => {
  try {
    const postBody = {
      parentId: user.id,
      title: formData.queryType,
      content: formData.description,
      studentId: formData.studentId,
    };
    const res = await post("/feedback", postBody);
    return res.data;
  } catch (error) {
    return error;
  }
};
