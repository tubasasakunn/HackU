from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware 

import pandas as pd
import adapter
import datetime
app = FastAPI()
ad = adapter.Adapter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   
    allow_methods=["*"],      
    allow_headers=["*"]       
)

col=['id','title','article','comment','date','source']

class Tag(BaseModel):
    name: str


class Article(BaseModel):
    title: str
    article: str
    tags: list
    comment: bool
    timestamp: datetime.date
    source: str
    parent: int


@app.post("/tags/")
async def create_item(tag: Tag):
    ad.set_tags(tag.name,0)
    print(tag)
    return tag

@app.post("/articles/")
async def create_item(article: Article):
    id=ad.set_articles(article.title,article.article,article.comment,article.timestamp,article.source)
    for tag in article.tags:
        ad.set_tags(tag,id)
    ad.set_relations(article.parent,id)

    print(article)
    return article

#curl 'http://127.0.0.1:8000/dbs/?tag=%E3%83%AD%E3%82%B7%E3%82%A2&comment=False&year=2022&month=8&day=12'
@app.get("/articles/")
async def read_item(tag: str=None,comment: bool=None, year: int = None,month: int = None, day: int = None):
    print([year,month,day])
    if not None in [year,month,day]:
        dt = datetime.date(year=year,month=month,day=day)
    else:
        dt=None

    print('タグ名',tag)
    print('コメントかどうか',comment)
    print('日付',dt)
    
    if not tag==None:
        tags=ad.get_tags(name=tag)
        ids=[i[2] for i in tags]
    else:
        ids=None

    articles=pd.DataFrame(ad.get_articles_byid(ids),columns=col)

    if not comment==None:
        articles=articles[articles['comment']==comment]
    if not dt ==None:
        articles=articles[articles['date']==dt]

    res=[]
    for article in articles.iterrows():
        res_i={}
        for c in col:
            if c=='date':
                res_i[c]=article[1][c].strftime('%Y-%m-%d')
            else:
                res_i[c]=article[1][c]
        tags=ad.get_tags(articles_id=article[1]['id'])
        tags=[i[1] for i in tags]
        res_i['tags']=tags
        res.append(res_i)
    return res

@app.get("/tags/")
async def read_item():
    tags=ad.get_all_tagname()
    tags=[i[0] for i in tags]
    res={}
    res['tags']=tags
    return res


@app.get("/articles/relations/")
async def read_item(id: int=2):
    print('id',id)

    parents=ad.get_relations(child=id)
    parents=[i[1] for i in parents]
    childs=ad.get_relations(parent=id)
    childs=[i[2] for i in childs]

    res={}
    res['parent']=parents
    res['child']=childs
    return res
