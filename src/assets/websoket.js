class joinRoomWs {

    status = false; // 当前连接状态
    WebSocket = null;
    roomId = null;
    focusClose = false;
    context = null;

    constructor() {
        
    }
    init(roomId) {
        // Vue.$message('121312312');
        this.roomId = roomId;
        let url = 'wss://wx.tmgxbxwl.cn/tsm/ws/';
        // let url = 'ws://192.168.100.202:8000/ws/';
        // let url = 'ws://confusion.imwork.net:24643/ws/';
        this.WebSocket = new WebSocket(url + roomId + '/');
        this.status = true;
        this.WebSocket.onclose = (e) => {
            console.log('onclose WebSocket断开链接');
            console.log(e);
            setTimeout(() => {
                this.reloadCallback();
            }, 1000);
        }
    }
    reloadCallback(callback) {
        if (callback) {
            this.callback();
        }
    }
    reload(roomId, callback, isForce) {
        this.status = false;
        if (this.focusClose) {
            this.focusClose = false;
            return;
        }
        if (!roomId) {
            return;
        }
        this.init(roomId);
        this.onopen(() => {
            let data = {"op":"auth","data":localStorage.getItem("playerToken")}

            if (isForce) {
                data = {"op":"dm_auth","data": 'Bearer '+localStorage.getItem("token")}
            }
            // console.log(JSON.stringify({data_type: isForce?'reconnect':'init', data: data }))
            // this.send(JSON.stringify({data_type: isForce?'reconnect':'init', data: data }));
            this.send(JSON.stringify(data))
            if (callback) {
                callback();
            }
        });
    }
    onopen (callback) {
        this.WebSocket.onopen = (e) => {
            callback(e);
        };
    }
    send(data) {
        if (this.status) {
            this.WebSocket.send(data)
        }
    }
    onmessage(callback) {
        this.WebSocket.onmessage = (e) => {
            if (e.data === 'ping') {
                ws.send('pong')
            } else {
                let data = JSON.parse(e.data);
                if (data.data_type === 'error') {
                    if (data.data === '错误的房间号') {
                        // this.focusClose = true;
                    }
                }
                if (data.op === 'close') {
                    // this.focusClose = true;
                }
                callback(data, e);
            }
        };
    }
    onclose() {
    }
    onerror() {
    }
}
let ws = new joinRoomWs();
export default ws;