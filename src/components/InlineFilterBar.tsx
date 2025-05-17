// "use client";
// import React from "react";
// import { Platform } from "@prisma/client";

// export function InlineFilterBar({
//   categories,
//   tags,
//   filters,
//   onChange,
// }: {
//   categories: { id: string; name: string }[];
//   tags: { id: string; name: string }[];
//   filters: {
//     q: string;
//     categoryId?: string;
//     platform?: Platform;
//     tagIds: string[];
//   };
//   onChange: (newFilters: typeof filters) => void;
// }) {
//   return (
//     <div className="w-full flex flex-wrap items-center gap-4 mb-6">
//       {/* Search */}
//       <input
//         type="text"
//         placeholder="🔍 Пошук..."
//         value={filters.q}
//         onChange={(e) => onChange({ ...filters, q: e.target.value })}
//         className="border px-3 py-1 rounded-md min-w-[200px] flex-grow"
//       />

//       {/* Category */}
//       <select
//         value={filters.categoryId ?? ""}
//         onChange={(e) =>
//           onChange({ ...filters, categoryId: e.target.value || undefined })
//         }
//         className="border px-3 py-1 rounded-md">
//         <option value="">Усі категорії</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {/* Platform */}
//       <select
//         value={filters.platform ?? ""}
//         onChange={(e) =>
//           onChange({
//             ...filters,
//             platform: (e.target.value as Platform) || undefined,
//           })
//         }
//         className="border px-3 py-1 rounded-md">
//         <option value="">Усі платформи</option>
//         {Object.values(Platform).map((p) => (
//           <option key={p} value={p}>
//             {p}
//           </option>
//         ))}
//       </select>

//       {/* Tags */}
//       <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[90px] pr-2">
//         {tags.map((tag) => {
//           const selected = filters.tagIds.includes(tag.id);
//           return (
//             <button
//               key={tag.id}
//               onClick={() =>
//                 onChange({
//                   ...filters,
//                   tagIds: selected
//                     ? filters.tagIds.filter((id) => id !== tag.id)
//                     : [...filters.tagIds, tag.id],
//                 })
//               }
//               className={`px-2 py-1 rounded text-sm border transition ${
//                 selected
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-100"
//               }`}>
//               {tag.name}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// Оновлена версія з використанням Shadcn UI
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Platform } from "@prisma/client";

export function InlineFilterBar({
  categories,
  tags,
  filters,
  onChange,
}: {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  filters: {
    q: string;
    categoryId?: string;
    platform?: Platform;
    tagIds: string[];
  };
  onChange: (newFilters: typeof filters) => void;
}) {
  return (
    <div className="w-full flex flex-wrap items-center gap-4 mb-6">
      {/* Search */}
      <Input
        type="text"
        placeholder="🔍 Пошук..."
        value={filters.q}
        onChange={(e) => onChange({ ...filters, q: e.target.value })}
        className="min-w-[200px] flex-grow"
      />

      {/* Category */}
      <Select
        value={filters.categoryId ?? ""}
        onValueChange={(value) =>
          onChange({ ...filters, categoryId: value || undefined })
        }>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Усі категорії" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Усі категорії</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Platform */}
      <Select
        value={filters.platform ?? ""}
        onValueChange={(value) =>
          onChange({
            ...filters,
            platform: (value as Platform) || undefined,
          })
        }>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Усі платформи" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Усі платформи</SelectItem>
          {Object.values(Platform).map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[90px] pr-2">
        {tags.map((tag) => {
          const selected = filters.tagIds.includes(tag.id);
          return (
            <Badge
              key={tag.id}
              onClick={() =>
                onChange({
                  ...filters,
                  tagIds: selected
                    ? filters.tagIds.filter((id) => id !== tag.id)
                    : [...filters.tagIds, tag.id],
                })
              }
              variant={selected ? "default" : "outline"}
              className="cursor-pointer">
              {tag.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
