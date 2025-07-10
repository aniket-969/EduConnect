import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';


export default function ProfileHeader({ user }) {
 
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div className="flex items-center justify-between w-full">
      {/* Avatar + Welcome */}
      <div className="flex items-center space-x-4"> 
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatarUrl}  alt={(user.name).toUpperCase()} />
          <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-semibold leading-tight">
          Welcome back,&nbsp;
          <span className=" max-w-xs truncate">
            {user.name}
          </span>
        </h1>
      </div>

    </div>
  );
}
