"use client"
import Navbar from "@/core/components/organisms/Navbar";
import Sidebar from "@/core/components/organisms/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
     router.push('/login')
  }, []);

  return (
    <main className={""}>
       
    </main>
  );
}
