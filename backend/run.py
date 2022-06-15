from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware 

import datetime
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   
    allow_methods=["*"],      
    allow_headers=["*"]       
)

class Tag(BaseModel):
    name: str


class Article(BaseModel):
    title: str
    article: str
    tags: list
    comment: bool
    timestamp: datetime.date


@app.post("/tags/")
async def create_item(tag: Tag):
    print(tag)
    return tag

@app.post("/articles/")
async def create_item(article: Article):
    print(article)
    return article

#curl 'http://127.0.0.1:8000/dbs/?tag=%E3%83%AD%E3%82%B7%E3%82%A2&comment=False&year=2022&month=8&day=12'
@app.get("/articles/")
async def read_item(tag: str=None,comment: bool=None, year: int = None,month: int = None, day: int = None):
    print([year,month,day])
    if not None in [year,month,day]:
        dt = datetime.date(year=year,month=month,day=day)
    else:
        dt=datetime.date(year=2000,month=1,day=1)
    print('タグ名',tag)
    print('コメントかどうか',comment)
    print('日付',dt)
    res_i={}
    res_i['id']='テストid'
    res_i['tiele']='テストタイトル'
    res_i['article']='テスト記事の中身'
    res_i['comment']='True'
    res_i['date']=dt.strftime('%Y-%m-%d')
    res_i['tags']=['タグテスト1','タグテスト2','タグテスト3']
    res_i['source']='テストソース'
    res=[]
    res.append(res_i)
    return res

@app.get("/tags/")
async def read_item():
    res={}
    res['tags']=['タグテスト1','タグテスト2','タグテスト3']
    return res


@app.get("/articles/relations/")
async def read_item(id: int=2):
    print('id',id)
    res={}
    res['parent']=[34]
    res['child']=[4,5,6,7,8,3]
    return res
