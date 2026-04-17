# concept-sheet-app

iPhone / iPad / PC で使える Web版コンセプトシートです。
保存はブラウザの localStorage を使います。

## ローカルで起動

```bash
npm install
npm run dev
```

## 本番ビルド

```bash
npm run build
```

ビルド後のファイルは `dist` に出力されます。

## 公開方法

### 1. Vercel（いちばん簡単）
1. GitHub にこのフォルダをアップ
2. Vercel にログイン
3. 「Add New Project」→ GitHub リポジトリを選択
4. Framework Preset は Vite の自動検出でOK
5. Deploy

### 2. Netlify
1. GitHub にこのフォルダをアップ
2. Netlify にログイン
3. 「Add new site」→ Git repository を選択
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

### 3. GitHub Pages
1. GitHub にアップ
2. GitHub Pages を有効化
3. Vite の static deploy ガイドに沿って GitHub Actions で公開

## iPhone / iPad で使う
1. 公開URLを Safari で開く
2. 共有ボタン → 「ホーム画面に追加」
3. アプリっぽく起動できます

## 注意
- 入力データはその端末 / そのブラウザ内に保存されます
- 別の iPhone / iPad / PC とは自動同期しません
- Safari のデータ削除をすると保存内容も消える場合があります
