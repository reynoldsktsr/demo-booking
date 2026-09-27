"use client";

import { useMemo, useState } from "react";

const SERVICES = [
  { id: "blowout", name: "Blowout", minutes: 30, price: 45 },
  { id: "haircut", name: "Haircut & Style", minutes: 45, price: 65 },
  { id: "color", name: "Color & Highlights", minutes: 120, price: 150 },
  { id: "facial", name: "Facial", minutes: 60, price: 85 },
  { id: "massage", name: "Massage", minutes: 60, price: 95 },
];

const DAY_START_MIN = 9 * 60;
const DAY_END_MIN = 17 * 60;
const SLOT_STEP = 30;

// Seeded existing bookings as [startMinute, endMinute) ranges, so new slots
// are computed by checking real overlap against them, not just hidden by name.
const EXISTING_BOOKINGS: Array<[number, number]> = [
  [9 * 60, 9 * 60 + 60],
  [11 * 60, 11 * 60 + 30],
  [13 * 60, 13 * 60 + 90],
  [15 * 60 + 30, 16 * 60 + 30],
];

function toLabel(minutes: number) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 < 12 ? "AM" : "PM";
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

function overlaps(startA: number, endA: number, startB: number, endB: number) {
  return startA < endB && startB < endA;
}

export function BookingWidget() {
  const [serviceId, setServiceId] = useState(SERVICES[1].id);
  const [selectedStart, setSelectedStart] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<{ start: number; end: number; code: string } | null>(null);

  const service = SERVICES.find((s) => s.id === serviceId)!;

  const slots = useMemo(() => {
    const options: Array<{ start: number; end: number; available: boolean }> = [];
    for (let start = DAY_START_MIN; start + service.minutes <= DAY_END_MIN; start += SLOT_STEP) {
      const end = start + service.minutes;
      const available = !EXISTING_BOOKINGS.some(([bStart, bEnd]) => overlaps(start, end, bStart, bEnd));
      options.push({ start, end, available });
    }
    return options;
  }, [service.minutes]);

  function confirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedStart == null) return;
    setConfirmed({
      start: selectedStart,
      end: selectedStart + service.minutes,
      code: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-rose-800/20 bg-rose-50 p-8 text-center">
        <p className="font-serif text-2xl text-stone-900">Appointment {confirmed.code} confirmed</p>
        <p className="mt-2 text-stone-600">
          {service.name}, {toLabel(confirmed.start)}–{toLabel(confirmed.end)}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={confirm}
      className="mx-auto flex max-w-lg flex-col gap-5 rounded-2xl border border-stone-200 bg-white p-6"
    >
      <label className="flex flex-col gap-1 text-sm text-stone-700">
        Service
        <select
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value);
            setSelectedStart(null);
          }}
          className="rounded-lg border border-stone-300 px-3 py-2"
        >
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.minutes} min, ${s.price}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="mb-2 text-sm text-stone-700">
          Today&apos;s open slots for a {service.minutes}-minute {service.name.toLowerCase()}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.start}
              type="button"
              disabled={!slot.available}
              onClick={() => setSelectedStart(slot.start)}
              className={`rounded-lg border px-2 py-2 text-xs ${
                !slot.available
                  ? "cursor-not-allowed border-stone-200 text-stone-300 line-through"
                  : selectedStart === slot.start
                    ? "border-rose-800 bg-rose-800 text-white"
                    : "border-stone-300 text-stone-700 hover:border-rose-800"
              }`}
            >
              {toLabel(slot.start)}
            </button>
          ))}
        </div>
      </div>

      <input required placeholder="Name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      <input required type="email" placeholder="Email" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />

      <button
        disabled={selectedStart == null}
        className="rounded-full bg-rose-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirm appointment
      </button>
    </form>
  );
}
