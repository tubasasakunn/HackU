import mysql.connector
import random, string
import copy
import datetime
import yaml

db_name='hacku'
tables={'articles':"CREATE TABLE IF NOT EXISTS %s.articles(id INT(11) AUTO_INCREMENT NOT NULL,"\
                    "title VARCHAR(300) NOT NULL, "\
                    "article VARCHAR(3000) NOT NULL,"\
                    "comment BOOLEAN NOT NULL,"\
                    "date DATE NOT NULL,"\
                    "source VARCHAR(30) NOT NULL, "\
                    "outline VARCHAR(30) NOT NULL, "\
                    "PRIMARY KEY (id))"%db_name,\
        'tags':"CREATE TABLE IF NOT EXISTS %s.tags(id INT(11) AUTO_INCREMENT NOT NULL,"\
                    "outline VARCHAR(30) NOT NULL, "\
                    "name VARCHAR(30) NOT NULL, "\
                    "articles_id INT(11) NOT NULL,"\
                    "PRIMARY KEY (id))"%db_name,\
        'relations':"CREATE TABLE IF NOT EXISTS %s.relations(id INT(11) AUTO_INCREMENT NOT NULL,"\
                    "parent_id INT(11) NOT NULL,"\
                    "child_id INT(11) NOT NULL,"\
                    "PRIMARY KEY (id))"%db_name}

with open('config.yml') as file:
    config = yaml.safe_load(file.read())
host=config['MySQL']['host']
user=config['MySQL']['user']
passwd=config['MySQL']['passwd']

def connect():     
    connection =mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,)
    #cursor = connection.cursor()

    return connection

class Adapter: 
    def __init__(self):
        # データベースへの接続とカーソルの生成
        connection =connect()
        cursor=connection.cursor()


        #なければDB作成
        cursor.execute("CREATE DATABASE IF NOT EXISTS %s;"%db_name)

        #なければテーブルの作成
        for command in tables.values():
            cursor.execute(command)

    def set_articles(self,title,article,comment,date,source,outline):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command="insert into hacku.articles values (0,%s,%s,%s,%s,%s,%s);"
        cursor.execute(command,(title,article,comment,date,source,outline))
        connection.commit()
        command="SELECT last_insert_id() FROM hacku.articles;"
        cursor.execute(command)
        return cursor.fetchall()[0][0]

    def set_tags(self,outline,name,articles_id):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command="insert into hacku.tags values (0,%s,%s,%s);"
        cursor.execute(command,(outline,name,articles_id))
        connection.commit()
        command="SELECT last_insert_id() FROM hacku.tags;"
        cursor.execute(command)
        return cursor.fetchall()[0][0]

    def set_relations(self,parent,child):
        if parent==None:
            return None

        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command="insert into hacku.relations values (0,'%d',%d);"%(parent,child)
        cursor.execute(command)
        connection.commit()
        command="SELECT last_insert_id() FROM hacku.relations;"
        cursor.execute(command)
        return cursor.fetchall()[0][0]

    def get_articles(self,id=None,title=None,article=None,comment=None,date=None,source=None,outline=None):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command="SELECT * FROM hacku.articles WHERE "
        if not id==None:
            command=command+"id=%d and "%id
        if not title==None:
            command=command+"title='%s' and "%title
        if not article==None:
            command=command+"article='%s' and "%article
        if not comment==None:
            command=command+"comment=%d and "%comment
        if not date==None:
            command=command+"date='%s' and "%date
        if not source==None:
            command=command+"source='%s' and "%source
        if not outline==None:
            command=command+"outline='%s' and "%outline

        command=command[:-4]+";"

        print(command)
        cursor.execute(command)
        return cursor.fetchall()

    def get_tags(self,outline=None,id=None,name=None,articles_id=None):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command="SELECT * FROM hacku.tags WHERE "
        if not id==None:
            command=command+"id=%d and "%id
        if not outline==None:
            command=command+"outline='%s' and "%outline
        if not name==None:
            command=command+"name='%s' and "%name
        if not articles_id==None:
            command=command+"articles_id=%d and "%articles_id

        command=command[:-4]+";"

        print(command)
        cursor.execute(command)
        return cursor.fetchall()

    def get_relations(self,id=None,parent=None,child=None):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command="SELECT * FROM hacku.relations WHERE "
        if not id==None:
            command=command+"id=%d and "%id
        if not parent==None:
            command=command+"parent_id=%d and "%parent
        if not child==None:
            command=command+"child_id=%d and "%child

        command=command[:-4]+";"
        print(command)
        cursor.execute(command)
        return cursor.fetchall()

    def get_all_tagname(self,outline=None,id=None,name=None,articles_id=None):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command=""

        if not id==None:
            command=command+"id=%d and "%id
        if not outline==None:
            command=command+"outline='%s' and "%outline
        if not name==None:
            command=command+"name='%s' and "%name
        if not articles_id==None:
            command=command+"articles_id=%d and "%articles_id

        if command=="":
            command="SELECT DISTINCT name from hacku.tags;"
        else:
            command="SELECT DISTINCT name from hacku.tags"+" WHERE "+command[:-4]

        print(command)
        cursor.execute(command)
        return cursor.fetchall()

    def get_all_outlinename(self,outline=None,id=None,name=None,articles_id=None):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        command=""

        if not id==None:
            command=command+"id=%d and "%id
        if not outline==None:
            command=command+"outline='%s' and "%outline
        if not name==None:
            command=command+"name='%s' and "%name
        if not articles_id==None:
            command=command+"articles_id=%d and "%articles_id

        if command=="":
            command="SELECT DISTINCT outline from hacku.tags;"
        else:
            command="SELECT DISTINCT outline from hacku.tags"+" WHERE "+command[:-4]

        print(command)
        cursor.execute(command)
        return cursor.fetchall()

    def get_articles_byid(self,ids=None):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        if not ids==None:
            command="SELECT * FROM hacku.articles WHERE "
            for id in ids:
                command=command+"id=%d or "%id
            
            command=command[:-3]+";"
        else:
            command="SELECT * FROM hacku.articles"

        print(command)
        cursor.execute(command)
        return cursor.fetchall()

    def delete_db(self):
        #つなぐ
        connection =connect()
        cursor=connection.cursor()

        cursor.execute('DROP DATABASE IF EXISTS %s;'%db_name)
        self.__init__()
        

#テストのための文字列生成器
def randomname(n):
   randlst = [random.choice(string.ascii_letters + string.digits) for i in range(n)]
   return ''.join(randlst)



if __name__ == '__main__' :
    ad=Adapter()
    ad.delete_db()

    #動作テスト
    num=20
    get_num=10

    for i in range(num):
        random.seed(i)
        title=randomname(random.randint(5, 15))
        article=randomname(random.randint(15, 20))
        tag=randomname(random.randint(3, 7))
        random.seed((random.randint(1, 3)))
        outline=randomname(random.randint(3, 7))
        random.seed(num)
        source=randomname(random.randint(2, 6))
        year=random.randint(2000, 2020)
        month=random.randint(1, 12)
        day=random.randint(1, 30)
        dt = datetime.date(year=year,month=month,day=day)
        comment=random.randint(0, 1)

        
        id=ad.set_articles(title,article,comment,dt.strftime('%Y-%m-%d'),source,outline)
        if id==1:
            parent=None
        else:
            parent=random.randint(1,id-1)
        ad.set_tags(outline,tag,id)
        ad.set_relations(parent,id)

        if random.random()<0.2:
            article_list=[title,article,comment,dt.strftime('%Y-%m-%d'),source,outline]
            tags_list=[outline,tag,id]
            relation_list=[parent,id]

    for i in range(get_num):
        article_list_tmp=copy.deepcopy(article_list)
        for j in range(len(article_list_tmp)):
            if random.random() < 0.5:
                article_list_tmp[j]=None
        s=ad.get_articles(id=None,title=article_list_tmp[0],article=article_list_tmp[1],comment=article_list_tmp[2],date=article_list_tmp[3],source=article_list_tmp[4],outline=article_list_tmp[5])
        print('get_articles',s)

    for i in range(get_num):
        tags_list_tmp=copy.deepcopy(tags_list)
        for j in range(len(tags_list_tmp)):
            if random.random() < 0.5:
                tags_list_tmp[j]=None
        s=ad.get_tags(id=None,outline=tags_list_tmp[0],name=tags_list_tmp[1],articles_id=tags_list_tmp[2])
        print('get_tags',s)

    
    for i in range(get_num):
        relation_list_tmp=copy.deepcopy(relation_list)
        for j in range(len(relation_list_tmp)):
            if random.random() < 0.5:
                relation_list_tmp[j]=None
        s=ad.get_relations(id=None,parent=relation_list_tmp[0],child=relation_list_tmp[1])
        print('get_relation',s)

    print('all_tag',ad.get_all_tagname())
    print('all_articles',ad.get_articles_byid())

    id_list=[]
    for i in range(num):
        id_list.append(random.randint(1,num))

    print('get_byid',ad.get_articles_byid(id_list))
    '''
    ad.set_tags("aaaaa",32)
    x=ad.get_tags(name="aaaaa")
    z=[i[2] for i in x]
    print(z)
    a=ad.get_articles_byid(z)
    print(a)
    import pandas as pd

    import datetime
    index=['id','title','article','comment','date','source']
    x=pd.DataFrame(a,columns=index)
    for i in x.iterrows():
        print(i[1]['id'])
    #x=x[x['date'] == datetime.date(2020, 1, 1)]
    #print(x)
    '''