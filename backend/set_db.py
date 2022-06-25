import adapter
import csv
import ast
filename='test.csv'


col=['id','title','article',"tags",'comment','timestamp','source',"parent",'outline']

def set(title,article,comment,timestamp,source,outline,tags,parent):
    id=ad.set_articles(title,article,comment,timestamp,source,outline)
    for tag in tags:
        ad.set_tags(outline,tag,id)
    ad.set_relations(parent,id)

if __name__ == '__main__' :
    ad=adapter.Adapter()
    ad.delete_db()

    with open(filename, encoding='utf8', newline='') as f:
        
        header = next(csv.reader(f))
        csvreader = csv.reader(f)
        for row in csvreader:
            data=dict(zip(col,row))
            if data["title"]=='':
                break
            
            try:
                set(data["title"],data["article"],int(data["comment"]),data["timestamp"],data["source"],data["outline"],ast.literal_eval(data["tags"]),int(data["parent"]))
            except:
                print("不十分なデータ:",data)
                break    