import axiosInstance from "../network/apiConfig";

export async function getIpList() {
  // return [
  //   {
  //     id: 1,
  //     ip: "223",
  //     create_time: "2024-06-24T01:07:37.818314",
  //     update_time: "2024-06-24T01:14:21.734781",
  //     label: "test_t",
  //     created_by: "223",
  //   },
  // ];
  const { data } = await axiosInstance.get("/ip");
  return data;
}

export async function editIp(body) {
  const { data } = await axiosInstance.put("/ip", body);
  return data;
}

export async function createIp(body) {
  try {
    const { data } = await axiosInstance.post("/ip", body);
    return data;
  } catch (e) {
    return { error: e.response.data.message };
  }
}
