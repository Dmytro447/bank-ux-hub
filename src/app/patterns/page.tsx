"use client";
import { useState } from "react";
import { InlineFilterBar } from "@/components/InlineFilterBar";
import { PatternCard } from "@/components/custom/PatternCard";
import { trpc } from "@/utils/trpc";
import { Platform } from "@prisma/client";

type FilterState = {
  q: string;
  categoryId?: string;
  platform?: Platform;
  tagIds: string[];
};

export default function PatternListPage() {
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    categoryId: undefined,
    platform: undefined,
    tagIds: [],
  });

  const { data: tagsRaw = [] } = trpc.tag.list.useQuery();
  const tags = tagsRaw.map((t) => ({ id: t.id, name: t.name }));

  const {
    data: patterns,
    isLoading,
    error,
  } = trpc.pattern.list.useQuery(filters);

  const uniqueCategories = Array.from(
    new Map(
      patterns?.map((p) => [
        p.category.id,
        { id: p.category.id, name: p.category.name },
      ])
    ).values()
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Усі UX-патерни</h1>

      <InlineFilterBar
        categories={uniqueCategories}
        tags={tags}
        filters={filters}
        onChange={setFilters}
      />

      {isLoading ? (
        <p>Завантаження...</p>
      ) : error ? (
        <p className="text-red-500">Помилка: {error.message}</p>
      ) : patterns?.length === 0 ? (
        <p>Нічого не знайдено за фільтрами</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {patterns?.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      )}
    </div>
  );
}
