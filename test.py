import pandas as pd

data = pd.read_csv('history.csv')
print(data)

data = data.assign(btn_id = 'id')
print(data)

data.to_csv('history.csv', index=False)
