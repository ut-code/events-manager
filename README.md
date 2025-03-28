# SvelteKit fullstack template

- Svelte
- SvelteKit
- TailwindCSS
- DaisyUI
- Hono
- Cloudflare Pages + Functions

## Features

- Simple

  - フロントエンドとバックエンドが同じドメインで動きます

- Extensible

  - 拡張が簡単です

- Swappable

  - 必要ないライブラリは他のライブラリに置き換えたり、完全にアンインストールすることができます

- Full-stack Type Safety

  - `hono/client` で RPC 風の型安全性を持ちます

## 環境構築

(インストール)

- Bun >= v1.2

(実行)

```sh
bun install --frozen-lockfile
```

## 動作確認

```sh
bun dev
```

Vite サーバーが :3000 で起動します。

### API の動作確認

```sh
curl localhost:3000/api/hello # -> {"message": "You've hello'ed 0 time(s)", "count": 0}
curl -X POST localhost:3000/api/hello # -> {"message": "That's your first hello", "count": 1}
curl -X POST localhost:3000/api/hello # -> {"message": "That's your second hello", "count": 2}
curl localhost:3000/api/hello # -> {"message": "You've hello'ed 2 time(s)", "count": 2}
```

### Web の動作確認

Access <http://localhost:3000>

### プレビューの動作確認

1. `bun run build`
2. `bun run preview`

## デプロイ

### Cloudflare にデプロイする

1. アカウントに入る
2. サイドバー中間らへんにある Workers & Pages を開く
3. Create を選択し、Pages のタブに切り替える
4. Connect to Git -> GitHub -> リポジトリを選択する
5. 環境変数に `BUN_VERSION` を設定する (これがないと cloudflare が勝手に `npm install` を実行しようとする)
6. ビルドコマンドは `bun install:production && bun run build` にする
7. デプロイディレクトリは `web/.svelte-kit/cloudflare` に設定する
8. ビルドを待つ
9. アクセスする

### Cloudflare 以外にデプロイする

Cloudflare 用に設定していますが、 SvelteKit のアダプタが用意されていて Hono が動く環境ならどこでもデプロイ可能です。
Cloudflare 以外にデプロイする場合は `web/svelte.config.js` を変更してください。

## 注意点

- Cloudflare Worker / Pages Function 上では `process` APIにアクセスできないので、 Hono の Env ヘルパーを使いましょう。
