import type { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = { title: "Admin | Ephorsys" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
