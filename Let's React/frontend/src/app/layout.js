'use client'
//import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <div> 
      <main>{children}</main>
    </div>
  );
}
