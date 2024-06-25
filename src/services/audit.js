import axiosInstance from "../network/apiConfig";

export async function getAuditList() {
  const { data } = await axiosInstance.get("/audit");
  return data;
}
