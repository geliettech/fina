
export const useGetUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("auth") || "null");

  return {
    name: userInfo?.name || "",
    profilePic: userInfo?.profilePic || "",
    email: userInfo?.email || "",
    userID: userInfo?.userID || "",
    isAuth: userInfo?.isAuth || false,
  };
};