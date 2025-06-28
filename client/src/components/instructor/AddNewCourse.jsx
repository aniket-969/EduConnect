import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./common/RichTextEditor";

const levels = ["Beginner", "Intermediate", "Expert"];
const categories = ["Web Development", "Data Science", "AI", "Cloud", "Others"];

export default function AddNewCourse() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState(""); // Rich text HTML
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const isPublishDisabled = !title || !level || !category || !price || !description;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 shadow rounded-md">
      <h2 className="text-2xl font-bold">Add New Course</h2>

      <div className="space-y-4">
        <Input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <div>
          <label className="block font-medium mb-1">Course Description</label>
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="flex gap-4">
          {levels.map((lvl) => (
            <label key={lvl} className="flex items-center gap-2">
              <input
                type="radio"
                name="level"
                value={lvl}
                checked={level === lvl}
                onChange={(e) => setLevel(e.target.value)}
              />
              {lvl}
            </label>
          ))}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="Course Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Preview"
              className="w-32 h-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline">Save as Draft</Button>
        <Button disabled={isPublishDisabled}>Publish</Button>
      </div>
    </div>
  );
}
