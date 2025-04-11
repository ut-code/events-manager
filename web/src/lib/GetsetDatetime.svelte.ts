function padded(input: number, pad: number): `${number}` {
  return input.toString().padStart(pad, "0") as `${number}`;
}
export class GetsetDatetime {
  #get: () => number | undefined;
  #set: (n: number) => void;
  constructor(get: () => number | undefined, set: (n: number) => void) {
    this.#get = get;
    this.#set = set;
  }
  get datetime() {
    const v = this.#get();
    if (v === undefined) return v;
    return new Date(v * 1000);
  }
  set datetime(v) {
    if (v) this.#set(v.getTime() / 1000);
  }
  get date(): `${number}-${number}-${number}` | undefined {
    if (!this.datetime) return undefined;
    const v =
      `${padded(this.datetime.getFullYear(), 4)}-${padded(this.datetime.getMonth() + 1, 2)}-${padded(this.datetime.getDate(), 2)}` as const;
    return v;
  }
  set date(v) {
    if (!v) return;
    const date = new Date(v);
    if (!this.datetime) this.datetime = date;
    else {
      this.datetime.setDate(date.getDate());
      this.datetime.setMonth(date.getMonth());
      this.datetime.setFullYear(date.getFullYear());
    }
  }
  get time(): `${number}:${number}` | undefined {
    if (!this.datetime) return undefined;
    const date = this.datetime;
    const v =
      `${padded(date.getHours(), 2)}:${padded(date.getMinutes(), 2)}` as const;
    return v;
  }
  set time(v) {
    if (!v) return;
    const [h, m] = v.split(":");
    if (!h || !m) return;
    const newDate = this.datetime ?? new Date();
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    newDate.setHours(Number.parseInt(h));
    newDate.setMinutes(Number.parseInt(m));
    this.datetime = newDate;
  }
}
