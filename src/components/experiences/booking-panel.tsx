"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, formatDate } from "@/lib/utils";

interface BookingPanelProps {
  price: number;
  currency: string;
  maxGroupSize: number;
  startDates: string[];
  hostName: string;
}

export function BookingPanel({
  price,
  currency,
  maxGroupSize,
  startDates,
  hostName,
}: BookingPanelProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(startDates[0] ?? "");
  const [groupSize, setGroupSize] = useState(1);
  const [requested, setRequested] = useState(false);

  function handleBook() {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    // NOTE: no booking/reservation backend yet - this is a placeholder
    // confirmation until a booking flow is built out.
    setRequested(true);
  }

  return (
    <Card className="lg:sticky lg:top-24">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-foreground">
            {formatPrice(price, currency)}
          </span>
          <span className="text-sm text-muted-foreground">/ person</span>
        </div>

        <p className="text-sm text-muted-foreground">
          Hosted by <span className="font-medium text-foreground">{hostName}</span>
        </p>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="startDate">
            Start date
          </label>
          <select
            id="startDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {startDates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="groupSize">
            Group size
          </label>
          <div className="flex items-center gap-2 rounded-md border border-input px-3">
            <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              id="groupSize"
              type="number"
              min={1}
              max={maxGroupSize}
              value={groupSize}
              onChange={(e) =>
                setGroupSize(
                  Math.min(maxGroupSize, Math.max(1, Number(e.target.value) || 1))
                )
              }
              className="h-10 w-full bg-transparent text-sm outline-none"
            />
            <span className="shrink-0 text-xs text-muted-foreground">
              max {maxGroupSize}
            </span>
          </div>
        </div>

        {requested ? (
          <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Request sent — your host will confirm shortly.
          </div>
        ) : (
          <Button className="w-full" size="lg" onClick={handleBook}>
            Request to Book
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
