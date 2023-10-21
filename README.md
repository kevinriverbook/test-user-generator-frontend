# TestUser Generator

## 基本情報

### 概要
『TestUser Generator（テストユーザージェネレーター）』は、ランダムに仮の氏名と生年月日などの情報を生成するWebアプリです。

### URL
https://testusergenerator.vercel.app

## 制作のきっかけ
Web開発のローカル環境でユーザー等を作成する際、実在する人物や有名人の名前を使用してしまうとコンプライアンス上の問題が発生する可能性があります。そこで、テストユーザーを作成する際は仮の名前（例：山田 花子）を考える必要がありますが、たくさんの名前を考えるのは意外と大変な作業になります。この作業を自動化したいと思ったことがきっかけでこのアプリを開発しました。

## 機能
- 名前自動生成
- 生年月日自動生成
- 年齢自動計算

## 使用技術

### フロントエンド
- Next.js
- TypeScript
- MUI

### バックエンド
- Ruby on Rails API-only

### インフラ
- Vercel
- Render

### アーキテクチャ
<img width="70%" alt="testusergenerator" src="https://github.com/kevinriverbook/test-user-generator-frontend/assets/92033434/3558e1b0-9ad1-4f94-a9ce-62c7c8c6ce79">

## 技術的な挑戦

### フロントエンドとバックエンドの分離
- フロントエンドとバックエンドを分離したモダンなアーキテクチャで実装しました

### git-flow
- Gitワークフローにgit-flowを採用しました

### タスク管理
- タスク管理にはTrelloを使用しています


## 今後の予定
- 新機能の追加
- Jestを使用したテストの作成

## バージョン
1.0.0
