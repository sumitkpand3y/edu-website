import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const router = useRouter();
console.log(
    "ssdsds"
);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token
    ) {
      router.replace("/");
    }
  }, [router]);
};
