"use client";
import React from "react";
import { Bolt, ClipboardClock, Cpu, Disc2, LayoutDashboard, Webhook, Workflow } from 'lucide-react';
import { Divider } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    { href: "/", icon: <LayoutDashboard />, label: "Overview" },
    { href: "/playground", icon: <Webhook />, label: "API Playground" },
    { href: "/workflows", icon: <Workflow />, label: "Workflows" },
    { href: "/monitoring", icon: <Cpu />, label: "Server Monitor" },
    { href: "/logs", icon: <ClipboardClock />, label: "Automation Logs" },
    { href: "/settings", icon: <Bolt />, label: "Settings" },
  ];

  return (
    <div className="sidebar max-w-[300px] w-full h-screen border-r py-4 px-2 bg-zinc-800 dark:bg-zinc-900 text-white">
      <div className="logo mb-4 flex items-center gap-2 text-2xl font-bold">
        <Disc2 />
        <h2>Haerulr2</h2>
      </div>
      <Divider />
      <ul className="mt-4 space-y-2">
        {menuItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          const linkClass =
            "flex items-center gap-2 p-2 rounded-md hover:bg-zinc-600" +
            (isActive ? " bg-zinc-700" : "");
          return (
            <li key={label}>
              <Link href={href} className={linkClass}>
                {icon} {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
