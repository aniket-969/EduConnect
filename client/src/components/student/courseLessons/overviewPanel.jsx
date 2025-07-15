import React, { useState } from 'react';
import { Star, User, Clock, Calendar } from 'lucide-react';

const OverviewPanel = ({
  rating,
  studentsCount,
  totalDuration,
  lastUpdated,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Teaser logic for long descriptions
  const teaserLength = 200;
  const isLong = description.length > teaserLength;
  const teaserText = isLong ? description.slice(0, teaserLength) + '...' : description;

  return (
    <div className="space-y-4 text-gray-200">
      {/* Metadata row */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5" />
          <span className="font-semibold">{rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-5 h-5" />
          <span>{studentsCount} students</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-5 h-5" />
          <span>{totalDuration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-5 h-5" />
          <span>Last updated {lastUpdated}</span>
        </div>
      </div>

      {/* Description content */}
      <div>
        {expanded ? description : teaserText}
      </div>

      {/* Expand/collapse button */}
      {isLong && (
        <button
          className="text-blue-400 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default OverviewPanel;
