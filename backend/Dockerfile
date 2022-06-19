FROM python:3.8

WORKDIR /usr/src/server
ADD requirements.txt .
RUN pip install -r requirements.txt
# waitライブラリの追加
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
# ライブラリの権限変更
RUN chmod +x /wait

# CMD ["/wait", "&&", "uvicorn", "run:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
CMD /wait && uvicorn run:app --reload --host 0.0.0.0 --port 8000
