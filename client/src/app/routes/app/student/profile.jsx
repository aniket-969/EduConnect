import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Camera, Edit2 } from "lucide-react"

export default function Profile() {
  const { session } = useAuth()

  if (session.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-card-foreground">
        <Spinner />
      </div>
    )
  }

  if (session.isError || !session.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive-foreground">
        Something went wrong, please refresh.
      </div>
    )
  }

  const data = session.data
  const [name, setName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isEditingName, setIsEditingName] = useState(false)
  const fileInputRef = useRef(null)

  // initialize from session data
  useEffect(() => {
    setName(data.name)
    setAvatarUrl(data.avatarUrl)
  }, [data])

  // derive counts & values
  const enrolledCount = data.enrolledCourses.length
  const completedCount = 10  
  const avgProgress = enrolledCount
    ? Math.round(
        data.enrolledCourses.reduce((sum, c) => sum + c.progress, 0) /
          enrolledCount *
          100
      )
    : 0
  const lastLogin = new Date(data.lastLogin).toLocaleString()
  const initials =
    data.name.split(" ").map((w) => w[0]).join("") || "U"

  const handleNameIconClick = () => setIsEditingName(true)
  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("New name:", name)
      setIsEditingName(false)
    }
    if (e.key === "Escape") {
      setName(data.name)
      setIsEditingName(false)
    }
  }
  const handleAvatarClick = () => fileInputRef.current?.click()
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarUrl(URL.createObjectURL(file))
      console.log("Selected avatar file:", file)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-lg mx-auto bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-[auto_1fr]">
          {/* Avatar */}
          <div className="relative w-32 h-32">
            <Avatar className="w-full h-full border-2 border-border">
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
                <span className="font-semibold uppercase">Email:</span> {data.email}
              </div>
              <div>
                <span className="font-semibold uppercase">Role:</span> {data.role}
              </div>
              <div>
                <span className="font-semibold uppercase">
                  Enrolled Courses:
                </span>{" "}
                {enrolledCount}
              </div>
              <div>
                <span className="font-semibold uppercase">
                  Completed Lessons:
                </span>{" "}
                {completedCount}
              </div>
              <div>
                <span className="font-semibold uppercase">Last Login:</span>{" "}
                {lastLogin}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-1">
              <div className="text-sm uppercase text-muted-foreground">
                Progress
              </div>
              <Progress value={avgProgress} className="h-3 rounded-full bg-input" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
