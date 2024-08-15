
import sys
import os
import pandas as pd
sys.path.append('C:\\Users\\masteroflich\\YahooFinancyApp')

print("####" * 5)
print("sys.path", sys.path)
print("####" * 5) 

# from .. import packageA
from backend import bbb

print("HELLO from packageA.file.py", pd.__version__)


# backend
#     packageA
#         file.py
#     app.py