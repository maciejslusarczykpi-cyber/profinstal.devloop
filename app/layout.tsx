import React from "react";
import ToggleChat from "../components/ToggleChat";
export const metadata = { title: "PROF INSTAL  dev loop" };
export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (<html lang="pl"><body>{children}<ToggleChat /></body></html>);
}
