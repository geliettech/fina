import { useAuth } from "@/layout/context/authProvider";

export const useGetUserInfo = () => {
  const { user } = useAuth();

  return {
    name: user?.name || user?.displayName || user?.fullName || "",
    profilePic: user?.profilePic || user?.photoURL || "",
    email: user?.email || "",
    userID: user?.userID || user?.uid || "",
    isAuth: Boolean(user),
  };
};
