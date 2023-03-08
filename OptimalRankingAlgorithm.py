import pandas as pd
from math import e, log
import numpy as np

Answers = []
err = 0

def Optimizing(e1, e2, e3, e4):
    global err
    try:
        for e in [e2,e3,e4]:
            SUB(from_=e1, to=e, var='r')
        for e in [e3,e4]:
            SUB(from_=e2, to=e, var='n')
        for e in [e4]:
            SUB(from_=e3, to=e, var='l')
        print("\nCurrent Equations:")
        for i in [e1, e2, e3, e4]:
            i.show()
        print('\n')
        d = (e4.left['_']) / e.right['d']
        l = (e3.left['_'] - (e3.right['d'] * d)) / e3.right['l']
        n = (e2.left['_'] - (e2.right['d'] * d) - (e2.right['l'] * l)) / e2.right['n']
        r = (e1.left['_'] - (e1.right['d'] * d) - (e1.right['l'] * l) - (e1.right['n'] * n)) / e1.right['r']
        Answers.append([n, r, d, l])
    except:
        err+=1

def SUM(from_, to):
    for var in from_.right:
        val = from_.right[var]
        to.right[var] += val
    for var in from_.left:
        val = from_.left[var]
        to.left[var] += val

def SUB(from_, to, var):
    v1 = from_.right[var]
    v2 = to.right[var]
    from_.multiply(v2)
    to.multiply(-1*v1)
    from_.multiply(0.5)
    to.multiply(0.5)
    SUM(from_=from_, to=to)
    to.show()

class Equation:
    def multiply(self, num):
        for i in self.right:
            self.right[i] *= num
        for i in self.left:
            self.left[i] *= num
    def divide(self, num):
        self.multiply(1/num)
    def shift(self, var, from_, to):
        val = from_[var]
        from_.pop(var)
        if var in to.keys():
            to[var] += val*-1
        else:
            to[var] = val*-1
    def show(self):
        show = ''
        for i in self.left:
            if self.left[i] > 0: show+='+'
            show += str(self.left[i]) + i
        show += ' = '
        for i in self.right:
            if self.right[i] > 0: show+='+'
            show += str(self.right[i]) + i
        print(show)
    def __init__(self, right, left):
        self.right = right
        self.left = left

class OptimalRankingAlgorithm:
    def __init__(self):
        self.n = 0; self.r = 0
        self.d = 0; self.l = 0
    def eval(self, data):
        x = data.values.tolist()
        data = []
        for i in x:
            data.append(eval(i[1]))
        print(data)
        dataset = []
        for datum in data:
            for i in datum:
                result = sigmoid(sum([
                    i[0] * self.n,
                    i[1] * self.r,
                    i[2] * self.d,
                    i[3] * self.l
                ]))
                dataset.append([i[0],i[1],i[2],i[3],result])
        return dataset
    def train(self, data):
        x = data.values.tolist()
        data = []
        for i in x:
            data.append(eval(i[1]))
        for datum in data:
            equations = []
            for d in datum:
                # need_scale: n  desire: r  distance: d  last_receiving_date: l
                e = Equation(right={'n': d[0], 'r': d[1], 'd': d[2], 'l': d[3]}, left={"_": d[4]})
                equations.append(e)
        for i in range(int(len(equations)/4)):
            Es = equations[i*4:(i+1)*4]
            Optimizing(Es[0], Es[1], Es[2], Es[3])
        self.Equations = equations
        arr = np.array(Answers)
        self.n = sum(arr[:, 0])/len(arr[:, 0])
        self.r = sum(arr[:, 1])/len(arr[:, 1])
        self.d = sum(arr[:, 2])/len(arr[:, 2])
        self.l = sum(arr[:, 3])/len(arr[:, 3])


model = OptimalRankingAlgorithm()
data_train = pd.read_csv(r'C:\Users\lenovo\Desktop\train.csv')
model.train(data_train)
data_eval = pd.read_csv(r'C:\Users\lenovo\Desktop\eval.csv')
result = model.eval(data_eval)
print('Result:\n')
for i in result:
    print(i)


'''
[
[[x, y, z, place], [x, y, z, place], [x, y, z, place],...],
[[x, y, z, place], [x, y, z, place], [x, y, z, place],...],
...
[[x, y, z, place], [x, y, z, place], [x, y, z, place],...],
[[x, y, z, place], [x, y, z, place], [x, y, z, place],...],
]

5 = 6x + 2y #from
5 = 2x + 7y # to
10= 8x 
'''
