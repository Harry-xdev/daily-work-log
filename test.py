import pandas as pd

def read_log_data():
    df = pd.read_csv('history.csv')
    print(df)

read_log_data()
