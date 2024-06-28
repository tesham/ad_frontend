import axiosInstance from "../network/apiConfig";

export async function login(body) {
  try {
    const { data } = await axiosInstance.post("/auth/token", body);
    return data;
  } catch (e) {
    return { error: e.response.data.message };
  }
}

export async function refreshAccessToken() {
  const tokens = localStorage.getItem("ip-tokens-refresh");
  const { data } = await axiosInstance.post("/auth/token/refresh", {
    refresh: tokens,
  });

  return data;
}

export async function logout() {
  const refresh = localStorage.getItem("ip-tokens-refresh");
  const { data } = await axiosInstance.post("/auth/logout", { refresh });
  return data;
}