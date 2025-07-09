import React, { useState, useMemo } from 'react';
import FilterBar  from '@/components/student/course/filterBar';
import  CourseGrid  from '@/components/student/course/CourseGrid';


const allCourses = [
  { id: 1, title: 'React Basics', instructor: { name: 'Jane Doe' }, thumbnailId: 'react.jpg', rating: 4.7, price: 0, category: 'javascript', level: 'beginner' },
  { id: 2, title: 'Node Deep Dive', instructor: { name: 'John Smith' }, thumbnailId: 'node.jpg', rating: 4.2, price: 49.99, category: 'javascript', level: 'intermediate' },
  { id: 3, title: 'UI/UX Fundamentals', instructor: { name: 'Jane Doe' }, thumbnailId: 'design.jpg', rating: 4.5, price: 0, category: 'design', level: 'beginner' },
  // ...more fake courses
];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    return allCourses
      .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
      .filter(c => category === 'all' || c.category === category)
      .filter(c => level === 'all' || c.level === level)
      .sort((a, b) => {
        if (sort === 'alphabetical') return a.title.localeCompare(b.title);
        if (sort === 'popular') return b.rating - a.rating;
        return b.id - a.id;
      });
  }, [search, category, level, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-2xl font-bold px-4 py-2">Browse Course Catalog</h1>

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          level={level}
          onLevelChange={setLevel}
          sort={sort}
          onSortChange={setSort}
          onApply={() => setPage(1)}
        />

        <CourseGrid courses={pageData} />

        <div className="flex justify-center items-center space-x-2 py-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded hover:bg-accent/20 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-accent text-white' : 'hover:bg-accent/20'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded hover:bg-accent/20 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
