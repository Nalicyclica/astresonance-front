### 知らない音楽を聴いた時、風景や思い出が心に浮かんだことはありませんか？

![Astresonance](https://user-images.githubusercontent.com/77972881/132290990-71ae17ad-6a7a-49d8-983e-927cf47fc3af.gif "Astresonance")
　　ー Astresonanceは、音楽のイメージをタイトルとして表現できる音楽SNSです 
<h1 align="center">Astresonance</h1>

# ♬ 開発環境
- Create React App
- Typescript
- Ruby on Rails（サーバーサイド）
- AWS(S3)（サーバーサイド）
- VSCode (Visual Studio Code)

# ♬ アプリの機能
- 音楽を聴いて心に浮かんだイメージをタイトルとして表現することで、音楽について感じたことを広く共有することを目的としたアプリです。
### 音楽に対してタイトルをつける機能
投稿された音楽を聴いて思いついたイメージを、タイトルとして表現することができます

![](https://user-images.githubusercontent.com/77972881/132294085-c4aed692-c2ce-48a0-9ca0-bf30b42d6ca5.png)
### タイトルに対してコメントをつける機能
音楽につけられたタイトルの一覧から、気になったタイトルにコメントを投稿することができます

![](https://user-images.githubusercontent.com/77972881/132294149-1ab59447-674a-4658-861c-c4764b7565a4.png)
### ユーザー投稿情報一覧機能
ユーザーが投稿した音楽・タイトル・コメントの一覧を見ることができます
### ユーザーフォロー機能
気に入ったユーザーをフォローでき、フォローリストからマイページへ移動することができます

![](https://user-images.githubusercontent.com/77972881/135052960-ac01c14a-ae60-45da-b11f-28949ccddfb1.png)

### 投稿音楽一覧機能
ジャンルや曲/歌を指定して、投稿された音楽をリスト表示することができます

![](https://user-images.githubusercontent.com/77972881/132294125-ff6cea04-8eab-42ee-a703-3bf7d4458a66.png)

### 音楽投稿機能
音楽ファイルをドラッグ＆ドロップで投稿することができます

![](https://user-images.githubusercontent.com/77972881/132294220-6df6900c-cfcf-44a7-9744-150da1cdc7d3.png)


# ♬ アプリケーションの構成
フロントエンドとサーバーサイドがそれぞれ別々のAPIとして作成されています。
相互にJSONで通信することで、１つのアプリケーションとして機能しています
![](https://user-images.githubusercontent.com/77972881/132297142-c2b8c1a4-967c-4cbf-95b8-429072a822c5.png)

# ♬ データベース設計
## ER図
![](https://user-images.githubusercontent.com/77972881/135051908-0d77135e-c37d-4bda-9444-937f0ede3e16.png)

## Userテーブル

| Column             | Type   | Options                   |
| ------------------ | ------ | ------------------------- |
| nickname           | string | null: false               |
| email              | string | null: false, unique: true |
| encrypted_password | string | null: false               |
| icon_color         | string | null: false               |
| introduce          | text   | default: "よろしくお願いします" |

### Association

- has_many :musics
- has_many :titles
- has_many :comments
- has_many :follows
- has_many :followings, through: :follows, source: :following
- has_many :reverse_of_follows, class_name: 'Follow', foreign_key: 'following_id'
- has_many :followers, through: :reverse_of_follows, source: :user

## Musicテーブル

| Column              | Type       | Options                        |
| ------------------- | ---------- | ------------------------------ |
| category_id         | integer    | null: false                    |
| genre_id            | integer    | null: false                    |
| user                | references | null: false, foreign_key: true |

### Association

- belongs_to :user
- has_many :titles
- has_one_attached :music

## Titleテーブル

| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| title              | string     | null: false                    |
| color              | string     | null: false                    |
| user               | references | null: false, foreign_key: true |
| music              | references | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :music
- has_many :comments
- 空のタイトル＝視聴履歴？

## Commentテーブル

| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| text               | string     | null: false                    |
| user               | references | null: false, foreign_key: true |
| title              | references | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :title

## followテーブル

| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| user               | references | null: false, foreign_key: true |
| following          | references | null: false, foreign_key: true, to_table: :user |
[user_id, following_id], unique: true

### Association

- belongs_to :user
- belongs_to :following, class_name: 'User'

# ♬ Site URL
### https://astresonance-front.herokuapp.com
※アクセスにはBasic認証が必要です

## サーバーサイドリポジトリのURL
### https://github.com/Nalicyclica/astresonance-server

# ♬ 実装予定の機能
## 音楽・タイトルのお気に入り機能
気に入った音楽・タイトルをお気に入り登録でき、それぞれの投稿へのリンクを表示する機能を実装
## 音楽・タイトルのソート機能
音楽やタイトルの一覧を、付けられたタイトル・コメント数やお気に入り数でソートする機能を実装