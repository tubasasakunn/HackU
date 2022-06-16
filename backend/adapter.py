import mysql.connector
db_name='hacku'
tables={'articles':"CREATE TABLE IF NOT EXISTS %s.articles(id INT(11) AUTO_INCREMENT NOT NULL,"\
                    "title VARCHAR(30) NOT NULL, "\
                    "article VARCHAR(300) NOT NULL,"\
                    "comment BOOLEAN NOT NULL,"\
                    "date DATE NOT NULL,"\
                    "source VARCHAR(30) NOT NULL, "\
                    "PRIMARY KEY (id))"%db_name,\
        'tags':"CREATE TABLE IF NOT EXISTS %s.tags(id INT(11) AUTO_INCREMENT NOT NULL,"\
                    "name VARCHAR(30) NOT NULL, "\
                    "articles_id INT(11) NOT NULL,"\
                    "PRIMARY KEY (id))"%db_name,\
        'relations':"CREATE TABLE IF NOT EXISTS %s.relations(id INT(11) AUTO_INCREMENT NOT NULL,"\
                    "parent_id INT(11) NOT NULL,"\
                    "child_id INT(11) NOT NULL,"\
                    "PRIMARY KEY (id))"%db_name}


# データベースへの接続とカーソルの生成
connection =mysql.connector.connect(
    host='localhost',
    user='hackU',
    passwd='hackU',)
cursor = connection.cursor()
cursor.execute("SHOW DATABASES LIKE '%s';"%db_name)
#なければdb作成
if len(cursor.fetchall())==0:
    cursor.execute("CREATE DATABASE %s;"%db_name)

cursor.execute("USE %s;"%db_name)
for command in tables.values():
    #print(command)
    cursor.execute(command)



cursor.close()
# ここに実行したいコードを入力します