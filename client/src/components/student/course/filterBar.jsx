import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
  sort,
  onSortChange,
  onApply,
  categories = [],
  levels = [],
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-card rounded">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="search" className="block text-sm font-medium mb-1">
          Search
        </label>
        <Input
          id="search"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1 ">
          Choose category
        </label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Level Filter */}
      <div>
        <label htmlFor="level" className="block text-sm font-medium mb-1">
          Filter by level
        </label>
        <Select value={level} onValueChange={onLevelChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {["beginner", "intermediate", "advanced"].map((lvl) => (
              <SelectItem key={lvl} value={lvl}>
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="sort" className="block text-sm font-medium mb-1">
          Sort by
        </label>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="alphabetical">A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply Button */}
      {/* <div className="self-end">
        <Button onClick={onApply}>Go</Button>
      </div> */}
    </div>
  );
}
