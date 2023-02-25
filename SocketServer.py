from socket import *
from threading import Thread

def SendProto(conn, d):
    # send dictionary lingth:
    if conn.recv(1) == chr(0).encode('utf-8'):
        conn.send(len(d.keys()).__str__().encode('utf-8'))
        conn.recv(1) # Synchronizer
    # looping through the whole thing:
    for dic in d.keys():
        # Define Requerments:
        key = dic; data = d[dic]
        dtype = type(d[dic]).__name__
        # send Key & Type:
        if conn.recv(1) == chr(1).encode('utf-8'): conn.send(key.encode('utf-8'))
        if conn.recv(1) == chr(2).encode('utf-8'): conn.send(dtype.encode('utf-8'))
        ## Slice & Send:
        v = d[dic]
        # Encoding process:
        if type(v).__name__ == 'bytes': value = v
        elif type(v).__name__ == 'str': value = v.encode('utf-8')
        elif type(v).__name__ == 'int': value = v.__str__().encode('utf-8')
        else: value = str(v).encode('utf-8')
        # Sending the data size:
        conn.recv(1)
        conn.send(len(value).__str__().encode('utf-8'))
        # sending:
        conn.recv(1)
        conn.sendall(value)
        conn.recv(1)

#  Custom Receiving protocol:
def RecvProto(conn, buffersize=1024, dump=True):
    # recv dictionary lingth:
    conn.send(chr(0).encode('utf-8'))
    length = int(conn.recv(1024))
    conn.send(chr(0).encode('utf-8'))
    # Getting the dictionary data:
    d = {}
    for dic in range(length):
        # receive Key & Type:
        conn.send(chr(1).encode('utf-8'))
        key = conn.recv(1024).decode('utf-8')
        conn.send(chr(2).encode('utf-8'))
        dtype = conn.recv(1024).decode('utf-8')
        ## Receive the value fragments and Reassemble them:
        # Receiving data:
        conn.send(b'0')
        SIZE = int(conn.recv(1024))
        conn.send(b'0')
        v = b''
        while (v.__len__() != SIZE):
            v += conn.recv(buffersize)
        conn.send(b'0')
        # Decoding:
        if dtype == 'bytes': value = v
        elif dtype == 'str': value = v.decode('utf-8')
        elif dtype == 'int': value = int(v)
        else: value = v.decode('utf-8')
        d[key] = value
    if dump: return d
    else: conn.__class__.payload = d

def TH(target, args=[]):
        thread = Thread(target=target, args=args)
        thread.start()

class ServerHandle:
    # Protocols:
    def SwitchData_Backend_Hardware(self):
        try:
            SendProto(self.Hardware, RecvProto(self.Back_end))
            self.Back_end.send(b'1')
        except:
            self.Back_end.send(b'0')
    # Server Initiators / Server Runners:
    def CloseConnection(self, conn, port, addr):
        print(f"[SERVER][PORT:{port}] Connection {addr} Closed...")
        self.Port_map = self.Port_map[:self.PORT.index(port)] + [self.Port_map[self.PORT.index(port)] - 1] + self.Port_map[self.PORT.index(port)+1:]
        self.Connections.remove(conn)
        self.Connections_tuple.remove(str(conn.getpeername()))
        conn.close()

    def Manage_Individual(self, conn, addr, port):
        self.Port_map = self.Port_map[:self.PORT.index(port)] + [self.Port_map[self.PORT.index(port)] + 1] + self.Port_map[self.PORT.index(port)+1:]
        while True:
            try:
                code = conn.recv(1)
                # Requests:
                if code == chr(1).encode('utf-8'):
                    self.SwitchData_Backend_Hardware()
                elif code == b'':
                    self.CloseConnection(conn, port, addr)
                    break
                else:pass
            except ConnectionResetError as e:
                self.CloseConnection(conn, port, addr)
                break

    def run_socket(self, server, port):
        while True:
            server.listen(1)
            conn, addr = server.accept()
            self.Connections.append(conn)
            self.Connections_tuple.append(str(conn.getpeername()))
            if conn.recv(1) == chr(1).encode('utf-8'):
                self.Hardware = conn
                print(f"[SERVER][PORT:{port}] Hardware has been connected {addr}...")
            else: 
                self.Back_end = conn
                TH(target=self.Manage_Individual, args=([conn, addr, port]))
                print(f"[SERVER][PORT:{port}] Back-end has been connected {addr}...")

    def start_active_sockets(self):
        for port in self.PORT:
            sock = socket(AF_INET, SOCK_STREAM)
            sock.bind((self.host, port))
            self.active_sockets.append(sock)
        for sock in range(len(self.active_sockets)):
            TH(target=self.run_socket, args=([self.active_sockets[sock], self.PORT[sock]]))
        print(f"[SERVER][PORT:({min(self.PORT)}-{max(self.PORT)})] Active connection server sockets' Ports have been started...")

    def start_router(self):
        def main():
            self.router = socket(AF_INET, SOCK_STREAM)
            self.router.bind((self.host, self.PORT_R))
            def get_appropriate_port(): return self.PORT[self.Port_map.index(min(self.Port_map))]
            while True:
                self.router.listen(1)
                self.router.accept()[0].send(get_appropriate_port().__str__().encode('utf-8'))
        TH(target=main)

    def start_up(self):
        self.start_router()
        self.start_active_sockets()

    # Server Configurations:
    def __init__(self):
        global this; this = self
        # Server Vars:
        print("[SERVER] Initializing...")
        self.PORT = range(8000, 8011)
        self.Port_map = ([0] * len(self.PORT))
        self.PORT_R = 8080
        self.Connections = []
        self.Connections_tuple = []
        self.active_sockets = []
        self.host = gethostbyname(gethostname())
        # Initiate Server:
        self.start_up()
        print("[SERVER] Server has been successfully Initialized...")


if __name__ == '__main__':
    server = ServerHandle()
