export const saveAuth = (data: { token: string; user: any }) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userInfo", JSON.stringify(data.user));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  window.location.href = "/login";
};

export const getAdminStatus = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  return user.isAdmin || false;
};
