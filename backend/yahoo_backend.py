import yfinance as yf
import pandas as pd
from pprint import pprint



def history(ticker, **kwargs):
    stock = yf.Ticker(ticker=ticker)

    print("stock.basic_info......")
    # pprint(stock.history_metadata.items())
    # print("info............")
    pprint(stock.get_info())


    kwargs = {k: kwargs[k] for k in kwargs if k in ["period", "interval", "start", "end"]} 
    
    period = kwargs["period"] # '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max'
    interval = {
        "1d": "15m",
        "5d": "90m",
        "1mo": "1d",
        "3mo": "1d",
        "6mo": "1d",
        "1y": "1d",
        "2y": "1d",
        "5y": "5d",
        "10y": "1wk",
        "ytd": "1d",
        "max": "1mo",
    }[period]

    df = stock.history(interval=interval, **kwargs)
 
    info = stock.get_info()

    current_price = info["currentPrice"]

    if current_price != df["Close"].iloc[-1]:
        # print("current_price",current_price, type(current_price))
       
        df_today = pd.DataFrame(
            data={"Open": [current_price], "Close": [current_price]},
            index=[pd.Timestamp.now(tz=df.index[-1].tz)]
        )
        df = pd.concat([df, df_today])

    df = df.dropna(subset="Open")

    # print("last...", df["Open"].iloc[-1], df["Close"].iloc[-1], "vs. current", current_price)

    return df


def balance_sheet(ticker, *, quartely: bool=False): 
    stock = yf.Ticker(ticker=ticker) 
    return stock.quarterly_balance_sheet if quartely else stock.balance_sheet


def income_stmt(ticker, *, quartely: bool=False):
    stock = yf.Ticker(ticker=ticker) 
    return stock.quarterly_incomestmt if quartely else stock.income_stmt 

# revenue(ticker="MSFT")

# print(income_stmt(ticker="ASML"))

# msft = yf.Ticker("ASML")
# print(msft)
# # pprint(msft.basic_info)
# # print("msft.balance_sheet", type(msft.balance_sheet))
# # print(msft.balance_sheet.to_string())
# # print(msft.financials)
# print(msft.quarterly_financials)
# # pprint()


# history_df: pd.DataFrame = msft.history(period="1y")
# print("history_metadata::::::::::::::::::::::::")
# # pprint(msft.history_metadata)

# input(".")
# # print("history", type(history_df))

# # print("HEAD (past)")
# # print(history_df.head().to_string())

# # print("TAIL (present)")
# # print(history_df.tail().to_string())

# # print("shape:", history_df.shape)

# recoveries = []

# # print(history_df["Low"].tail())
# front_day_high = None
# mid_day_low = None
# back_day_high = None

# for idx, (day_date, day) in enumerate(history_df.iterrows()):
#     day["date"] = day_date
#     day["idx"] = idx
#     if front_day_high is None:
#         front_day_high = day
#         mid_day_low = None
#         continue
#     else:
#         mid_day_low = min(mid_day_low, day, key=lambda x: x["Low"]) if mid_day_low is not None else day

#     if day["High"] >= front_day_high["High"]:
#         back_day_high = day
#         recoveries.append({
#             "front_day_high": front_day_high.to_dict(),
#             "mid_day_low": mid_day_low.to_dict(),
#             "back_day_high": back_day_high.to_dict(),
#             "days": back_day_high["date"] - front_day_high["date"],
#             "idx_days": back_day_high["idx"] - front_day_high["idx"]
#         })
#         mid_day_low = None
#         front_day_high = None
        
# # print(history_df["Low"].shape)

# recoveries = sorted(recoveries, key=lambda x: x["idx_days"], reverse=1)
# print("recoveries", len(recoveries))

# for _ in recoveries:
#     pprint(_)
#     # print(_["days"])
#     input(".")



