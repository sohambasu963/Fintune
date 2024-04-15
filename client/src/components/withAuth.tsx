"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/context/AuthContext";
import { ComponentType } from "react";

const withAuth = (WrappedComponent: ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const { user, loading } = UserAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [loading, user, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
