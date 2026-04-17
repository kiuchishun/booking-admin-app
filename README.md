# booking-admin-app

## 公開URL

- https://booking-admin-app.vercel.app/
- 管理画面: https://booking-admin-app.vercel.app/admin

予約フォームと管理画面をひとつにまとめた、React + Vite + TypeScript ベースのフロントエンドアプリです。

利用者は予約ページから希望日時を選んで申込みでき、管理者は `/admin` でログインして予約状況の確認や削除を行えます。データ保存にはバックエンドではなく、ブラウザの `localStorage` を利用しています。

## 概要

このアプリには次の 2 つの画面があります。

- 予約ページ `/`
- 管理画面 `/admin`

予約ページでは日時の選択と利用者情報の入力を行います。管理画面では保存済みの予約を一覧表示し、個別削除や全件クリアができます。

## 主な機能

- 予約日時の選択
- 氏名、電話番号、メールアドレスの入力
- 予約内容の `localStorage` 保存
- 管理画面への簡易ログイン
- 予約一覧の確認
- 予約の個別削除
- 予約の全件クリア
- `storage` イベントと `focus` を使ったデータ再同期
- TypeScript による props・ストレージデータ・イベント型の明示

## 動作環境

- Node.js 20 以上推奨
- npm

## セットアップ

依存パッケージをインストールします。

```bash
npm install
```

## 環境変数

管理画面のログインには `VITE_ADMIN_PASSWORD` が必要です。

プロジェクト直下に `.env.development.local` を作成し、以下のように設定してください。

```env
VITE_ADMIN_PASSWORD=your-password
```

この値が未設定の場合、`/admin` 画面ではログインできません。

## 開発サーバー起動

```bash
npm run dev
```

起動後、ブラウザで以下の URL にアクセスします。

- `http://localhost:5173/`
- `http://localhost:5173/admin`

## ビルド

TypeScript の型チェックを行ったうえで本番用ビルドを作成します。

```bash
npm run build
```

## プレビュー

ビルド結果をローカルで確認します。

```bash
npm run preview
```

## 利用できるスクリプト

- `npm run dev`: 開発サーバーを起動
- `npm run build`: TypeScript 型チェック + 本番用ビルド
- `npm run preview`: ビルド結果をローカル確認
- `npm run lint`: ESLint を実行

## データ保存について

このアプリは API やデータベースを利用していません。
予約データはブラウザの `localStorage` に保存され、管理画面のログイン状態は `sessionStorage` に保存されます。

保存キーは以下のとおりです。

- 予約データ: `admin-people-schedule`
- 管理ログイン状態: `admin-authenticated`

ブラウザストレージを削除すると、予約データとログイン状態も消えます。

## ディレクトリ構成

```text
src/
  components/
    admin/
  data/
  lib/
  pages/
  types.ts
  App.tsx
  App.css
  main.tsx
  vite-env.d.ts
public/
tsconfig.json
vite.config.ts
```

主なファイルの役割:

- `src/pages/BookingPage.tsx`: 予約入力画面
- `src/pages/AdminPage.tsx`: 管理画面と認証制御
- `src/lib/adminStorage.ts`: `localStorage` の読み書き
- `src/data/bookingSchedule.ts`: 予約候補日時の定義
- `src/data/adminData.ts`: 初期表示用データの定義
- `src/types.ts`: 共通の TypeScript 型定義
