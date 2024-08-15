from flask import Flask, Response, request
from flask_caching import Cache
import yahoo_backend
import json
from flask_cors import CORS
import pandas as pd
from pprint import pprint
import requests
import yfinance as yf
app = Flask(__name__)
CORS(app)
cache = Cache(app)
# flask --app app:app run --port 5000 --host 0.0.0.0 --debug

def make_key():
   """A function which is called to derive the key for a computed value.
      The key in this case is the concat value of all the json request
      parameters. Other strategy could to use any hashing function.
   :returns: unique string for which the value should be cached.
   """
   key = str(dict(request.args.items()))
#    print("make_key:", key)
   return key


def make_api_request(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0"
    }
    return requests.get(url, headers=headers)

@app.get("/history")
@cache.cached(timeout=6000, make_cache_key=make_key)
def history():
    kwargs = dict(request.args.items())
    df: pd.DataFrame  = yahoo_backend.history(**kwargs)
    col_open = df["Open"].to_list()
    col_date = df.index.map(lambda x:  x.strftime("%Y %m %d %H %M %S")).to_list()

    perc_change = ((col_open[-1] / col_open[0]) - 1) * 100
    value_change = col_open[0] - col_open[-1]
    
    time_delta: pd.Timedelta = df.index[-1] - df.index[0]
    
    assert len(col_open) == len(col_date)
    return Response(json.dumps({
        "perc_change": perc_change,
        "value_change": value_change,
        "start_value": col_open[0],
        "end_value": col_open[-1],
        "open": col_open,
        "date": col_date,
        "time_delta_days": time_delta.days
    }), mimetype="application/json")

@app.get("/revenue")
@cache.cached(timeout=6000, make_cache_key=make_key)
def revenue():
    kwargs = dict(request.args.items())
    df: pd.DataFrame  = yahoo_backend.income_stmt(**kwargs)
    # df.index = "KEY" + df.index
    df.columns =  df.columns.astype(str)
    pprint(df.columns)
    return  Response(df.to_json(), mimetype="application/json")



@app.get("/search_ticker_by_name")
@cache.cached(timeout=6000, make_cache_key=make_key)
def search_ticker_by_name():
    kwargs = dict(request.args.items())
    search = kwargs["search"]
    response = make_api_request(f"https://query1.finance.yahoo.com/v1/finance/search?q={search}&lang=EN-US&region=DE&quotesCount=4&newsCount=0")
    if response.ok:
        data = response.json()
        # TODO: sort and filter result based on metrics/score
        #  - American listed stock has higher score than Mexico
        quotes = data["quotes"]
        quotes = [q for q in quotes if q["quoteType"] == "EQUITY"]
        return Response(json.dumps(quotes), mimetype="application/json") 
    else:
        response.raise_for_status()


@app.get("/company_logo")
@cache.cached(timeout=6000, make_cache_key=make_key)
def company_logo():
    kwargs = dict(request.args.items())
    domain_name = kwargs["domain_name"] 
    response = make_api_request(f"https://logo.clearbit.com/{domain_name}")
    if response.ok:
        return Response(response.content, mimetype=response.headers["Content-Type"])
    else:
        response.raise_for_status()
 

@app.get("/basic_info")
@cache.cached(timeout=6000, make_cache_key=make_key)
def basic_info():
    kwargs = dict(request.args.items())
    ticker = kwargs["ticker"] 
    stock = yf.Ticker(ticker=ticker)
    info = stock.get_info()
    return Response(json.dumps(info), mimetype="application/json") 


@app.get("/")
def hello_world():
    return "YahooFinance Backend is running."