// файл: app/patterns/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PatternDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: pattern,
    isLoading,
    error,
  } = trpc.pattern.byId.useQuery({ id });
  const { data: flows } = trpc.flow.getAll.useQuery();

  if (isLoading) return <div>Завантаження…</div>;
  if (error || !pattern) return <div>Сталася помилка: {error?.message}</div>;

  const relatedFlows = flows?.filter((f) =>
    f.steps.some((s) => s.title.includes(pattern.title))
  );

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-4">
      <Button asChild variant="ghost">
        <Link href="/patterns">← Назад до списку</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{pattern.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="screens" className="w-full">
            <TabsList>
              <TabsTrigger value="screens">Екрани</TabsTrigger>
              <TabsTrigger value="components">Компоненти</TabsTrigger>
              <TabsTrigger value="flows">Flows</TabsTrigger>
            </TabsList>

            {/* Screens Tab */}
            <TabsContent value="screens" className="space-y-4">
              {pattern.screenshots.length > 0 ? (
                pattern.screenshots.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`${pattern.title} скріншот ${i + 1}`}
                    className="w-full rounded-md object-cover"
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">Немає скріншотів</p>
              )}
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="components" className="space-y-6">
              {/* Опис */}
              {pattern.description ? (
                <p>{pattern.description}</p>
              ) : (
                <p className="text-sm text-gray-500">Немає опису</p>
              )}

              {/* Категорія та теги */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{pattern.category.name}</Badge>
                {pattern.tags.map((t) => (
                  <Badge key={t.tag.id}>{t.tag.name}</Badge>
                ))}
              </div>

              {/* Рекомендації */}
              <div>
                <h4 className="text-lg font-semibold">Рекомендації</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Перевіряйте валідацію полів до відправки форми.</li>
                  <li>Забезпечуйте клавіатурну навігацію (tab-index).</li>
                  <li>Відображайте чіткі повідомлення про помилки.</li>
                </ul>
              </div>

              {/* Приклад коду */}
              <div>
                <h4 className="text-lg font-semibold">Приклад реалізації</h4>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                  <code>{`<Form onSubmit={handleSubmit}>
  <Input name="username" placeholder="Логін" />
  <Input type="password" name="password" placeholder="Пароль" />
  <Button type="submit">Увійти</Button>
</Form>`}</code>
                </pre>
              </div>
            </TabsContent>

            {/* Flows Tab */}
            <TabsContent value="flows" className="space-y-2">
              {relatedFlows && relatedFlows.length > 0 ? (
                relatedFlows.map((f) => (
                  <Button key={f.id} asChild variant="link" className="px-0">
                    <Link href={`/flows/${f.id}`}>{f.title}</Link>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Пов’язаних flows не знайдено
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
