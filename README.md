# Events Manager

## About

ut.code(); のイベント (作業会・ミーティングなど) を一元管理します。

### Features

- イベントを登録できます。

## 開発

### 環境構築

(インストール)

- Bun >= v1.2

(実行)

```sh
bun install --frozen-lockfile
bun db push --force
```

### サーバー起動

```sh
bun dev
```

Vite サーバーが :3000 で起動します。

### プレビューの動作確認

1. `bun run build`
2. `bun run preview`

### package.json の `dependencies` と `devDependencies` の運用

- `dependencies`: ビルドに必要なパッケージ
- `devDependencies`: 開発時にのみ必要なパッケージ

## 運用

### デプロイ

Cloudflare Pages に自動デプロイされる予定です。

## 注意点

- Cloudflare Worker / Pages Function 上では `process` APIにアクセスできないので、 Hono の Env ヘルパーを使いましょう。
