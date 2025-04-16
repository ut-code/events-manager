import { browser } from "$app/environment";
import * as devalue from "devalue";
import { assert, type BaseIssue, type BaseSchema } from "valibot";

const APP_ID = "events-manager";
const FEAT_ID = "swr-cache";

type ValibotSchema<T> = BaseSchema<T, unknown, BaseIssue<unknown>>;

export default function swr<T>(
  cacheKey: string,
  promise: Promise<T>,
  schema: ValibotSchema<T>,
) {
  const storageKey = `${APP_ID}:${FEAT_ID}:${cacheKey}`;

  const state = $state<{ current: Promise<T> }>({
    current: promise,
  });
  if (!browser) return state;

  const cache = localStorage.getItem(storageKey);
  if (cache != null) {
    try {
      const val = devalue.parse(cache);
      assert(schema, val);
      state.current = Promise.resolve(val);
    } catch (err) {
      console.warn(
        "[swr] failed to parse localStorage value. ignoring it. error:",
        err,
      );
    }
  }

  promise.then((v) => {
    try {
      assert(schema, v);
      localStorage.setItem(storageKey, devalue.stringify(v));
    } catch (err) {
      console.warn(
        "[swr] failed to parse incoming value, ignoring it. error:",
        err,
      );
    }
  });

  return state;
}
