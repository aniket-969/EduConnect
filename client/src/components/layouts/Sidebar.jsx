
import React,{ useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  BookOpen,
  User,
  PlusCircle,
  Users,
  LogOut
} from 'lucide-react';
import { paths } from '@/config/paths';

const linkConfig = {
  student: [
    {
      to: paths.app.studentDashboard.getHref(),
      label: 'Dashboard',
      icon: Home,
    },
    {
      to: '/app/courses',
      label: 'Browse Courses',
      icon: BookOpen,
    },
    {
      to: '/app/profile',
      label: 'Profile',
      icon: User,
    },
  ],
  instructor: [
    {
      to: paths.app.instructorDashboard.getHref(),
      label: 'Dashboard',
      icon: Home,
    },
    {
      to: "/app/courses/new",
      label: "Add Course",
      icon: PlusCircle,
    },
    {
      to: "/app/courses",
      label: "My Courses",
      icon: BookOpen,
    },
    {
      to: "/app/enrolled-students",
      label: "Enrolled Students",
      icon: Users,
    },
    {
      to: "/app/profile",
      label: "Profile",
      icon: User,
    },
  ],
};


const AppSidebar = React.memo(function AppSidebar({ user }) {
  const location = useLocation();
  const items = useMemo(() => linkConfig[user.role] || [], [user.role]);

  return (
    <Sidebar className="w-60 border-r">
      <div className="px-4 py-3 text-xl font-bold">EduConnect</div>
      <SidebarContent className="flex-1 space-y-2 px-2">
        <SidebarMenu>
          {items.map(({ to, label, icon: Icon }) => (
            <SidebarMenuItem key={to}>
              <SidebarMenuButton asChild>
                <Link
                  to={to}
                  className={
                    location.pathname === to
                      ? 'flex items-center space-x-3 p-2 rounded bg-accent'
                      : 'flex items-center space-x-3 p-2 rounded hover:bg-accent/20'
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => {/* logout logic */}}
                  className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-accent/20"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
});

export default AppSidebar;
