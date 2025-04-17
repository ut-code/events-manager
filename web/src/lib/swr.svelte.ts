import { browser } from "$app/environment";
import * as devalue from "devalue";
import { assert, type BaseIssue, type BaseSchema } from "valibot";

const APP_ID = "events-manager";
const FEAT_ID = "swr-cache";

type ValibotSchema<T> = BaseSchema<T, unknown, BaseIssue<unknown>>;

export class SWR<T> {
  private readonly storageKey: string;
  current: Promise<T> = $state(new Promise(() => {}));
  constructor(
    cacheKey: string,
    getPromise: () => Promise<T>,
    private readonly schema: ValibotSchema<T>,
  ) {
    this.storageKey = `${APP_ID}:${FEAT_ID}:${cacheKey}`;
    this.current = getPromise();
    if (!browser) return;

    const cache = this.read();
    if (cache != null) {
      this.current = Promise.resolve(cache);
    }

    $effect(() => {
      console.log("refreshing cache");
      getPromise().then((v) => {
        this.update(v);
      });
    });
  }

  read() {
    const cache = localStorage.getItem(this.storageKey);
    if (cache === null) return null;
    try {
      const val = devalue.parse(cache);
      assert(this.schema, val);
      return val;
    } catch (err) {
      console.warn(
        "[swr] failed to parse localStorage value. ignoring it. error:",
        err,
      );
      return null;
    }
  }
  update(v: T) {
    try {
      assert(this.schema, v);
      console.log("update cache");
      localStorage.setItem(this.storageKey, devalue.stringify(v));
      this.current = Promise.resolve(v);
    } catch (err) {
      console.warn(
        "[swr] failed to parse incoming value, ignoring it. error:",
        err,
      );
    }
  }
}
