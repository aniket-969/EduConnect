// src/components/student/course/Courses.jsx
import React, { useState } from 'react'
import FilterBar from '@/components/student/course/filterBar'
import CourseGrid from '@/components/student/course/CourseGrid'
import { useCourseCatalog } from '@/hooks/useCourse'

export default function Courses() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel]       = useState('All')
  const [sort, setSort]         = useState('newest')
  const [page, setPage]         = useState(1)
  const pageSize                = 12

  // use API hook instead of local filtering
  const {
    data,
    isLoading,
    isError,
    error
  } = useCourseCatalog({
    search,
    category,
    level,
    sortBy: sort,
    page,
    size: pageSize,
  })

  // // old local data & filtering — commented out
  // const allCourses = [ … ]
  // const filtered = useMemo(() => { … }, [search, category, level, sort])
  // const totalPages = Math.ceil(filtered.length / pageSize)
  // const pageData = useMemo(
  //   () => filtered.slice((page - 1) * pageSize, page * pageSize),
  //   [filtered, page]
  // )

  if (isLoading) return <p className="text-center py-8">Loading courses…</p>
  if (isError)   return <p className="text-center py-8 text-destructive">Error: {error.message}</p>

  const courses    = data?.items || []
  const total      = data?.total || 0
  const totalPages = Math.ceil(total / pageSize)

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

        <CourseGrid courses={courses} />

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
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? 'bg-accent text-white'
                  : 'hover:bg-accent/20'
              }`}
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
  )
}
