function padded(input: number, pad: number): `${number}` {
  return input.toString().padStart(pad, "0") as `${number}`;
}
export class GetsetDatetime {
  #datetime = $state<Date | undefined>(undefined);
  #set: (n: number) => void;
  constructor(get: () => number | undefined, set: (n: number) => void) {
    this.#set = set;
    $effect(() => {
      const val = get();
      if (val) {
        this.datetime = new Date(val * 1000);
      }
    });
    $inspect(this.#datetime);
  }
  get datetime() {
    console.log("GET datetime", this.#datetime);
    return this.#datetime;
  }
  set datetime(v) {
    if (v) this.#set(v.getTime() / 1000);
  }
  get date(): `${number}-${number}-${number}` | undefined {
    if (!this.datetime) return undefined;
    const v =
      `${padded(this.datetime.getFullYear(), 4)}-${padded(this.datetime.getMonth() + 1, 2)}-${padded(this.datetime.getDate(), 2)}` as const;
    console.log("GET DATE", v);
    return v;
  }
  set date(v) {
    console.log("SET DATE", v);
    if (!v) return;
    const date = new Date(v);
    if (!this.#datetime) this.#datetime = date;
    else {
      this.#datetime.setDate(date.getDate());
      this.#datetime.setMonth(date.getMonth());
      this.#datetime.setFullYear(date.getFullYear());
    }
  }
  get time(): `${number}:${number}` | undefined {
    if (!this.datetime) return undefined;
    const date = this.datetime;
    const v =
      `${padded(date.getHours(), 2)}:${padded(date.getMinutes(), 2)}` as const;
    console.log("GET TIME", v);
    return v;
  }
  set time(v) {
    console.log("SET TIME", v);
    if (!v) return;
    const [h, m] = v.split(":");
    if (!h || !m) return;
    this.#datetime?.setHours(Number.parseInt(h));
    this.#datetime?.setMinutes(Number.parseInt(m));
  }
}
