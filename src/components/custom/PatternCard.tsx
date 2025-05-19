import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Platform } from "@prisma/client";

interface PatternCardProps {
  pattern: {
    id: string;
    name?: string;
    screenshots: string[];
    category: {
      id: string;
      name: string;
      description?: string;
      iconUrl?: string;
    };
    platform: Platform;
    tags: { tag: { id: string; name: string } }[];
  };
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const title = pattern.name ?? pattern.category.name;

  const colorMap: Record<Platform, string> = {
    WEB: "bg-blue-100 text-blue-800",
    ANDROID: "bg-green-100 text-green-800",
    IOS: "bg-pink-100 text-pink-800",
  };

  const firstScreenshot = pattern.screenshots?.[0];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl shadow-lg hover:shadow-2xl bg-white overflow-hidden">
      <Card className="border-0 rounded-none shadow-none">
        {/* Зображення або іконка категорії */}
        {firstScreenshot || pattern.category.iconUrl ? (
          <div className="h-32 w-full overflow-hidden bg-gray-100">
            <img
              src={firstScreenshot ?? pattern.category.iconUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <CardContent className="p-6 space-y-4">
          {/* Заголовок патерну */}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

          {/* Категорія та платформа */}
          <div className="flex items-center gap-2">
            <Badge className="uppercase text-xs font-medium bg-gray-100 text-gray-700">
              {pattern.category.name}
            </Badge>
            <Badge
              className={`${
                colorMap[pattern.platform]
              } uppercase text-xs font-medium`}>
              {pattern.platform}
            </Badge>
          </div>

          {/* Опис */}
          {pattern.category.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {pattern.category.description}
            </p>
          )}

          {/* Теги */}
          <div className="flex flex-wrap gap-2">
            {pattern.tags.map(({ tag }) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="cursor-default text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 p-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              window.location.href = `/patterns/${pattern.id}`;
            }}>
            Деталі
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
