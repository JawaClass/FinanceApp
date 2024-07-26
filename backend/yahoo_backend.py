import yfinance as yf
import pandas as pd
from pprint import pprint



def history(ticker: str):
    stock = yf.Ticker(ticker)
    return stock.history(period="1y")


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



