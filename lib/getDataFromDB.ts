import User, { IUser } from "@/models/UserModel";

export const getDataFormDB = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const { role } = user; // Destructure role
  if (!["admin", "user"].includes(role)) {
    throw new Error("Insufficient permissions");
  }

  return user; // return user
};
