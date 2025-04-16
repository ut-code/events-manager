function padded(input: number, pad: number): `${number}` {
  return input.toString().padStart(pad, "0") as `${number}`;
}

function formatDates(date: Date): `${number}-${number}-${number}` {
  const v =
    `${padded(date.getFullYear(), 4)}-${padded(date.getMonth() + 1, 2)}-${padded(date.getDate(), 2)}` as const;
  return v;
}
function parseDates(s: `${number}-${number}-${number}`) {
  const [y, m, d] = s.split("-");
  if (!y || !m || !d) {
    console.error("parseDates: failed to parse", s);
    return;
  }

  return {
    year: Number.parseInt(y),
    month: Number.parseInt(m),
    date: Number.parseInt(d),
  };
}
function formatTime(date: Date): `${number}:${number}` {
  const v =
    `${padded(date.getHours(), 2)}:${padded(date.getMinutes(), 2)}` as const;
  return v;
}

export class GetsetDatetime {
  #get: () => number | undefined;
  #set: (v: number | undefined) => void;
  constructor(
    get: () => number | undefined,
    set: (n: number | undefined) => void,
  ) {
    this.#get = get;
    this.#set = set;
  }
  get datetime() {
    const v = this.#get();
    if (v) return new Date(v * 1000);
    return undefined;
  }
  set datetime(v) {
    if (v) this.#set(v.getTime() / 1000);
  }
  get date(): `${number}-${number}-${number}` | undefined {
    const d = this.datetime;
    if (!d) return undefined;
    return formatDates(d);
  }
  set date(v) {
    if (!v) return;
    const dates = parseDates(v);
    if (!dates) return;
    const newDate =
      this.datetime ??
      (() => {
        const d = new Date(0);
        d.setHours(0);
        return d;
      })();
    newDate.setFullYear(dates.year);
    newDate.setMonth(dates.month - 1);
    newDate.setDate(dates.date);
    this.datetime = newDate;
  }
  get time(): `${number}:${number}` | undefined {
    return this.datetime && formatTime(this.datetime);
  }
  set time(v) {
    if (!v) return;
    const [h, m] = v.split(":");
    if (!h || !m) return;
    const newDate = this.datetime ?? new Date();
    newDate.setHours(Number.parseInt(h));
    newDate.setMinutes(Number.parseInt(m));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    this.datetime = newDate;
  }
}
