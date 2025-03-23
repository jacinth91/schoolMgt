import { get } from "../services/api";

export const fetchLinkedBundles = async (usid) => {
  try {
    const res = await get(`/bundles/search/${usid}?type=New`);
    return res.data;
  } catch (error) {
    return error;
  }
};
