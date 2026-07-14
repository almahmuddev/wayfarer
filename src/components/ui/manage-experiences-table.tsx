"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatPrice, formatDate } from "@/lib/utils";
import type { ManageExperienceItem } from "@/types/experience";

interface ManageExperiencesTableProps {
  initialItems: ManageExperienceItem[];
  isAdmin: boolean;
}

export function ManageExperiencesTable({
  initialItems,
  isAdmin,
}: ManageExperiencesTableProps) {
  const [items, setItems] = useState(initialItems);
  const [pendingDelete, setPendingDelete] = useState<ManageExperienceItem | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/experiences/${pendingDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message || "Could not delete this experience.");
        setIsDeleting(false);
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
        <PackageOpen className="h-10 w-10 text-muted-foreground" />
        <p className="font-medium text-foreground">
          {isAdmin
            ? "No experiences on the platform yet"
            : "You haven't listed any experiences yet"}
        </p>
        <Button asChild size="sm">
          <Link href="/items/add">Add Your First Experience</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Experience</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              {isAdmin && <th className="px-4 py-3 font-medium">Host</th>}
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <span className="line-clamp-2 font-medium text-foreground">
                      {item.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.category}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatPrice(item.price, item.currency)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={item.isPublished ? "default" : "outline"}>
                    {item.isPublished ? "Published" : "Draft"}
                  </Badge>
                </td>
                {isAdmin && (
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.hostName}
                  </td>
                )}
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="icon">
                      <Link href={`/experiences/${item.slug}`} aria-label="View">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => setPendingDelete(item)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex gap-3 p-4">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-medium text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.category} &middot; {formatPrice(item.price, item.currency)}
                </p>
                {isAdmin && (
                  <p className="text-xs text-muted-foreground">
                    Host: {item.hostName}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={item.isPublished ? "default" : "outline"}>
                    {item.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/experiences/${item.slug}`}>
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingDelete(item)}
                  >
                    <Trash2 className="mr-1.5 h-3.5 w-3.5 text-destructive" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this experience?"
        description={`"${pendingDelete?.title}" will be permanently removed, along with its reviews. This can't be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
