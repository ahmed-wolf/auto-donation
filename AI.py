import pandas as pd, os
import tensorflow as tf
print('*')

dftrain = pd.read_csv('train.csv') # training data
dfeval = pd.read_csv('eval.csv') # testing data
print(dftrain.head())
print(dfeval.head())

y_train = dftrain.pop('result')
y_eval = dfeval.pop('result')

NUMERIC_COLUMNS = ['need_scale', 'desire', 'distance', 'last_receiving_date']

feature_columns = []

for feature_name in NUMERIC_COLUMNS:
  feature_columns.append(tf.feature_column.numeric_column(feature_name, dtype=tf.float32))

def make_input_fn(data_df, label_df, num_epochs=10, shuffle=True, batch_size=32):
  def input_function():  # inner function, this will be returned
    ds = tf.data.Dataset.from_tensor_slices((dict(data_df), label_df))  # create tf.data.Dataset object with data and its label
    if shuffle:
      ds = ds.shuffle(1000)  # randomize order of data
    ds = ds.batch(batch_size).repeat(num_epochs)  # split dataset into batches of 32 and repeat process for number of epochs
    return ds  # return a batch of the dataset
  return input_function  # return a function object for use

train_input_fn = make_input_fn(dftrain, y_train)  # here we will call the input_function that was returned to us to get a dataset object we can feed to the model
eval_input_fn = make_input_fn(dfeval, y_eval, num_epochs=1, shuffle=False)

linear_est = tf.estimator.LinearClassifier(feature_columns=feature_columns)

linear_est.train(train_input_fn)  # train
result = linear_est.evaluate(eval_input_fn)  # get model metrics/stats by testing on tetsing data

os.system('cls')

result = list(linear_est.predict(eval_input_fn))

Array = []

for i in result:
  Array.append(i['probabilities'][1])
