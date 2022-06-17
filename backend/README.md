# 概要
API部分

# 準備

## APIの作成
必要なライブラリのインストール
```` 
pip install fastapi "uvicorn[standard]" mysql-connector-python pandas
````
APIの実行
````uvicorn run:app````

## MySQLの設定
MySQLをインストールし，host,user,passwdをconfig.ymlに記述する．
```` python adapter.py````
で動作確認できる．
（DBを削除し，20個のランダムなデータを作成し，ランダムにデータを取り出す）

# 各API
## タグの追加
````POST http://127.0.0.1:8000/tag/````でリクエストボディに{"name":タグ名}で追加可能.

使用例

````
curl -X POST -H "Content-Type: application/json" -d '{"name":"ロシア"}' http://127.0.0.1:8000/tags/
````

成功していれば````uvicorn run:app````した方のコンソール画面に````name='ロシア'````と出ます

## 記事の追加

````POST http://127.0.0.1:8000/articles/````でリクエストボディに{"title":タイトル,"article":記事本文,"tags":タグのリスト,"comment":コメントかどうかのフラグ,"timestamp":日付(yyyy-mm-dd),"source":ソース名,"parent":親の記事id}で追加可能.

使用例

````
curl -X POST -H "Content-Type: application/json" -d '{"title":"russia vs ukuraina","article":"戦っている","tags":["ロシア","ウクライナ","戦争"],"comment":"False","timestamp":"2022-06-12","source":"TV","parent":12}' http://127.0.0.1:8000/articles/
````

成功していれば````uvicorn run:app````した方のコンソール画面に

````title='russia vs ukuraina' article='戦っている' tags=['ロシア', 'ウクライナ', '戦争'] comment=False timestamp=datetime.date(2022, 6, 12) source='TV' parent=12````

と出ます

## 記事の取り出し
````GET http://127.0.0.1:8000/articles/````でクエリパラメータに{タグ名，コメントかどうかのフラグ，年，月，日}で該当記事を取り出せます(必ずしも全ての指定をする必要性はありません)

使用例

````curl 'http://127.0.0.1:8000/articles/?tag=russia&comment=False&year=2022&month=8&day=12'````

成功していれば````uvicorn run:app````した方のコンソール画面に

````
[2022, 8, 12]
タグ名 russia
コメントかどうか False
日付 2022-08-12
````
が出てきて，GETの返り値が
````
[{"id":"テストid","title":"テストタイトル","article":"テスト記事の中身","comment":"True","date":"2022-08-12","tags":["タグテスト1","タグテスト2","タグテスト3"],"source":"テストソース"}]
````

のような該当する記事のリストの返り値が出てきます．記事のパラメータは以下のようなものになります．
- id        :記事の主キー
- title     :記事のタイトル
- article   :記事の中身
- comment   :コメントかどうかのbool
- date      :記事の日時（yyyy-mm-dd）
- tags      :記事のタグのリスト[tag1,tag2,...]
- source    :記事のソース

## タグの取り出し
````GET http://127.0.0.1:8000/tags/````でタグ一覧を取り出せます．

使用例

````curl 'http://127.0.0.1:8000/tags/' ````

成功していればGETの返り値に

````{"tags":["タグテスト1","タグテスト2","タグテスト3"]}````

のようなタグのリストが出てきます．

## 記事の親子関係の取り出し
````GET http://127.0.0.1:8000/articles/relations/````でクエリパラメータに記事のid(主キー)を加え，その記事の親子関係を取り出せます．

使用例

````curl 'http://127.0.0.1:8000/articles/relations/?id=1' ````

成功していれば````uvicorn run:app````した方のコンソール画面に````id 1````のように指定したidが出てきてGETの返り値には

````{"parent":[34],"child":[4,5,6,7,8,3]}% ````

のように親と子の記事のidが出てきます（親記事は１つで良さそう？）
