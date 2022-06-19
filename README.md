# 概要

チームメンバー向けの本アプリケーションの環境設定  
M1 Mac(Monterey 12.4), Windows10で動作確認済み

# 前提

docker、npmの設定は済んでいるものとする

# 前準備(Windowsのみ)

* db/my.cnfを読み取り専用にする
  * フォルダから対象ファイルを右クリック→プロパティ→属性を読み取り専用
* docker-compose.ymlの以下の分を削除 or コメントアウト
  * `platform: linux/x86_64 # M1チップ対応のため追記`

# 導入方法

```
git clone https://github.com/tubasasakunn/HackU.git
cd HackU
```

## Backend

```
docker-compose up -d --build 
```

## Frontend

```
cd frontend
pip install 
npm start # https://localhost:3000で起動
```
