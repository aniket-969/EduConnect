import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

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
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Choose category
        </label>
        <Select id="category" value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Level Filter */}
      <div>
        <label htmlFor="level" className="block text-sm font-medium mb-1">
          Filter by level
        </label>
        <Select id="level" value={level} onValueChange={onLevelChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="sort" className="block text-sm font-medium mb-1">
          Sort by
        </label>
        <Select id="sort" value={sort} onValueChange={onSortChange}>
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
