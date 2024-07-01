import axiosInstance from "../network/apiConfig";

export async function login(body) {
  // return {
  //   access:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXNoYW0yOUBnbWFpbC5jb20iLCJzdWIiOiJhY2Nlc3MgdG9rZW4iLCJ1c2VyX2lkIjozLCJuYW1lIjoidGVzaGFtMjlAZ21haWwuY29tIiwic2Vzc2lvbl9pZCI6MjEsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzE5MjM3NDUxLCJpYXQiOjE3MTkyMzAyNTF9.wJlX6Eu6lphY-X68kGfWWVwI18MKb51sZq83YQbmO5o",
  //   refresh:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXNoYW0yOUBnbWFpbC5jb20iLCJzdWIiOiJyZWZyZXNoIHRva2VuIiwidXNlcl9pZCI6MywibmFtZSI6InRlc2hhbTI5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzE5MzE2NjUxLCJpYXQiOjE3MTkyMzAyNTF9.jrvOxerEiL5Pez0yUBBswEIC_lSfXbF5wccuotVcQ44",
  // };
  localStorage.removeItem("ip-tokens-access");
  localStorage.removeItem("ip-tokens-refresh");
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

  localStorage.removeItem("ip-tokens-access");
  localStorage.removeItem("ip-tokens-refresh");
  return data;
}