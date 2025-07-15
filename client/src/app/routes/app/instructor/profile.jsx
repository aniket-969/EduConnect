import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useCoursesByInstructor } from "@/hooks/useCourse";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Camera, Edit2 } from "lucide-react";

export default function InstructorProfile() {
  // All hooks at the top level
  const { session } = useAuth();
  const userData = session.data;
  const userId = userData?.id;
  const { uploadAvatar, updateName } = useUser(userId);
  
  // Early returns after all hooks
  if (session.isLoading ) {
    return <Spinner />;
  }

  if (session.isError || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive-foreground">
        Something went wrong, please refresh.
      </div>
    );
  }
const { data: courses = [], isLoading: coursesLoading } =
    useCoursesByInstructor(userId);
    if (session.coursesLoading ) {
    return <p>Loading...</p> ;
  }
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef(null);

  const data = userData;

  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleAvatarChange = async (e) => {
    const avatar = e.target.files?.[0];
    if (avatar) {
      setAvatarUrl(URL.createObjectURL(avatar));
      await uploadAvatar.mutateAsync(avatar);
    }
  };

  useEffect(() => {
    setName(data.name);
    setAvatarUrl(data.avatarUrl || "");
  }, [data]);

  // Course counts
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(
    (c) => c.status === "PUBLISHED"
  ).length;
  const draftedCourses = courses.filter((c) => c.status === "DRAFT").length;

  const initials =
    data.name
      ?.split(" ")
      .map((w) => w[0])
      .join("") || "U";

  const handleNameIconClick = () => setIsEditingName(true);
  const handleNameKeyDown = async (e) => {
    if (e.key === "Enter") {
      try {
        await updateName.mutateAsync(name);
        setIsEditingName(false);
      } catch {
        // error handled by toast
      }
    }
    if (e.key === "Escape") {
      setName(data.name);
      setIsEditingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-background sm:p-6 p-4">
      <Card className="max-w-lg mx-auto bg-card text-card-foreground flex flex-col">
        <CardHeader className="text-center w-full">
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 justify-items-center md:grid-cols-[auto_1fr]">
          {/* Avatar */}
          <div className="relative w-32 h-32">
            <Avatar className="w-full h-full border-2 border-border sm:ml-3 ml-0">
              <AvatarImage src={avatarUrl} alt="Avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Camera
              size={20}
              className="absolute bottom-0 right-0 p-1 bg-card rounded-full cursor-pointer text-accent"
              onClick={handleAvatarClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          {/* Details */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  autoFocus
                  className="bg-input text-foreground"
                />
              ) : (
                <>
                  <span className="text-lg">{name}</span>
                  <Edit2
                    size={20}
                    className="cursor-pointer text-accent"
                    onClick={handleNameIconClick}
                  />
                </>
              )}
            </div>
            {/* Static Info */}
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold uppercase">Email:</span>{" "}
                {data.email}
              </div>
              <div>
                <span className="font-semibold uppercase">Role:</span>{" "}
                {data.role}
              </div>
              <div>
                <span className="font-semibold uppercase">Total Courses:</span>{" "}
                {totalCourses}
              </div>
              <div>
                <span className="font-semibold uppercase">
                  Published Courses:
                </span>{" "}
                {publishedCourses}
              </div>
              <div>
                <span className="font-semibold uppercase">
                  Drafted Courses:
                </span>{" "}
                {draftedCourses}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
