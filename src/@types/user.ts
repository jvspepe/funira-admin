type TUser = {
  uid: string;
  displayName: string;
  email: string;
  role: "admin" | "consumer";
};

export default TUser;
