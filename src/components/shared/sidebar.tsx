import React from "react";
import { Bolt, ClipboardClock, Cpu, Disc2, LayoutDashboard, Shell, Webhook, Workflow } from 'lucide-react';
import Divider from "../ui/divider";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <div className="sidebar max-w-[300px] w-full h-screen border-r py-4 px-2 bg-zinc-800 dark:bg-zinc-900 text-white">
      <div className="logo mb-4 flex items-center gap-2 text-2xl font-bold">
        <Disc2 />
        <h2>Haerulr2</h2>
      </div>
      <Divider />
      <ul className="mt-4 space-y-2">
        <li><Button variant="ghost" className="hover:bg-zinc-500 hover:text-white w-full justify-start"><LayoutDashboard /> Overview</Button></li>
        <li><Button variant="ghost" className="hover:bg-zinc-500 hover:text-white w-full justify-start"><Webhook /> API Playground</Button></li>
        <li><Button variant="ghost" className="hover:bg-zinc-500 hover:text-white w-full justify-start"><Workflow /> Workflows</Button></li>
        <li><Button variant="ghost" className="hover:bg-zinc-500 hover:text-white w-full justify-start"><Cpu /> Server Monitor</Button></li>
        <li><Button variant="ghost" className="hover:bg-zinc-500 hover:text-white w-full justify-start"><ClipboardClock /> Automation Logs</Button></li>
        <li><Button variant="ghost" className="hover:bg-zinc-500 hover:text-white w-full justify-start"><Bolt /> Settings</Button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
