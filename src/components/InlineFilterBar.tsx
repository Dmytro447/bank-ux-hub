// Оновлена версія з використанням Shadcn UI
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full p-4 mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Фільтрація патернів</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-4">
        <Input
          type="text"
          placeholder="🔍 Пошук..."
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          className="min-w-[200px] flex-grow"
        />

        <Select
          value={filters.categoryId ?? "all"}
          onValueChange={(value) =>
            onChange({
              ...filters,
              categoryId: value === "all" ? undefined : value,
            })
          }>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Усі категорії" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Усі категорії</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.platform ?? "all"}
          onValueChange={(value) =>
            onChange({
              ...filters,
              platform: value === "all" ? undefined : (value as Platform),
            })
          }>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Усі платформи" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Усі платформи</SelectItem>
            {Object.values(Platform).map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
      </CardContent>
    </Card>
  );
}
