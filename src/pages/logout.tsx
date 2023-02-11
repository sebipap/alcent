import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    void signOut();
    // redirect to index
  }, []);

  return <>logging out</>;
};

export default Logout;
