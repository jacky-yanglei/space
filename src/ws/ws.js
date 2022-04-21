import { EventBus } from '../eventBus/eventBus.js'
export default class {
    roomId = null;
    context = null;
    WebSocket = null;
    // ws连接状态
    openStatus = false;

    // reload状态
    reloadStatus = false;

    // 微信授权码
    authCode = null;
    constructor(roomId, context, authCode) {
        this.roomId = roomId;
        this.context = context;
        this.authCode = authCode;
        this.init()
    }
    init(isReload) {
        let url = 'wss://wx.tmgxbxwl.cn/tsm/ws/';
        // let url = 'ws://192.168.100.202:8000/ws/';
        // let url = 'ws://confusion.imwork.net:24643/ws/';
        this.WebSocket = new WebSocket(url + this.roomId + '/');
        this.WebSocket.onopen = () => {
            this.openStatus = true;
            this.context.$store.commit('socketReady');
            this.context.$store.commit('webSocket', this);
            if (isReload) {
                this.sendObjMsg({"op":"player_auth", "data": sessionStorage.getItem('player_id')});
            } else {
                this.sendObjMsg({"op":"player_auth", "data": sessionStorage.getItem('player_id') || this.authCode || 'ouN_T5kHFqqgBsBxPhw9bLdfN2O0'});
            }
        }
        this.WebSocket.onerror = () => {
            this.openStatus = false;
            this.reloadStatus = false;
            setTimeout(() => {
                this.reload()
            }, 1000)
            // this.context.$message({message: "WebSocket断开链接", type: 'error'});
            console.log('onerror WebSocket断开链接');
        }
        this.WebSocket.onclose = (e) => {
            this.openStatus = false;
            this.reloadStatus = false;
            setTimeout(() => {
                this.reload()
            }, 1000)
            // this.context.$message({message: "WebSocket断开链接", type: 'error'});
            console.log('onclose WebSocket断开链接');
            console.log(e);
        }
        this.onMsg();
    }
    // 重连
    reload() {
        if (this.reloadStatus) {
            return;
        }
        this.reloadStatus = true;
        this.init(true);
    }
    sendObjMsg(obj) {
        if (this.openStatus) {
            this.WebSocket.send(JSON.stringify(obj))
        } else {
            console.log('WebSocket已断开链接，无法发送消息');
        }
    }
    onMsg() {
        this.WebSocket.onmessage = (msg) => {
            let data = JSON.parse(msg.data)
            // 如果玩家鉴权失败
            if (data.op === 'auth_failed') {
                this.context.$message({message: data.message, type: 'error'});
            }
            else if (data.op === 'wait_dm') {
                if (data.data.id == 1) {
                    this.context.$store.commit('firstScreen', true);
                }
            }
            // 玩家鉴权成功保存玩家信息
            else if(data.op === 'player_auth' && data.success) {
                this.context.$store.commit('userInfo', data.data);
                sessionStorage.setItem('player_id', data.data.id);
                this.authCode = null; // 使用过一次微信授权之后就删除这个授权码
            }
            // 如果接收到强制展示的视频、音频信息
            else if (data.op === 'video' || data.op === 'audio') {
                this.context.$store.commit('firstScreen', false);
                this.context.$store.commit('videoEvent', data.data);
                this.context.$store.commit('playVideo');
            }
            // 如果接收到强制展示的文本信息
            else if (data.op === 'text' || data.op === 'wait_text' ) {
                this.context.$store.commit('forceText', data.data); // 赋值强制文本
                this.context.$store.commit('forceTextModel', true); // 打开model
            }
            // 关闭强制展示的文本
            else if (data.op === 'close_text') {
                this.context.$store.commit('forceTextModel', false);
            }
            // 可以回答问题了
            else if (data.op === 'answer_question') {
                this.context.$store.commit('hasAnswer', data.data);
            }
            // 如果接收到聊天信息
            else if (data.op === 'chat') {
                this.context.$store.commit('receivedChat', data.data);
            }
            // 如果接收到聊天历史信息
            else if (data.op === 'chat_his') {
                this.context.$store.commit('receivedHistory', data.data);
            }
            // 如果强制事件结束
            else if (data.op === 'event_finish') {
                if(data.success) {
                    if (data.data == null) {
                        this.context.$store.commit('closeAllForce');
                    } else if (data.data.type === "close_answer") {
                        let group = data.data.send_group;
                        this.context.$store.commit('closeAnswer', group);
                    }
                } else {
                    if (data.message) {
                        this.context.$message({message: data.message, type: 'error'});
                    }
                }
            }
            // 强制选择分支
            else if(data.op === 'choose_branch') {
                this.context.$store.commit('forceChoose', data.data);
                this.context.$store.commit('forceChooseLine');
            }
            // 当前已选分支情况
            else if (data.op === 'choosed_branch') {
                this.context.$store.commit('choosedBranch', data.data);
            }
            // 收到新的线索场景
            else if (data.op === 'open_collect') {
                this.context.$store.commit('colletScene', data.data.data);
            }
            // 已开放线索场景历史
            else if (data.op === 'opened_collect') {
                this.context.$store.commit('colletHistory', data.data);
            }
            // 已搜到线索清单
            else if (data.op === 'collected_trace') {
                this.context.$store.commit('collectedTrace', data.data);
            }
            else if (data.op === 'collect_trace') {
                if (data.success) {
                    this.context.$message({message: data.message, type: 'success'})
                    if (data.data) {
                        EventBus.$emit('collectTrace', data.data);
                        // this.context.$store.commit('collectTrace', data.data);
                    }
                } else {
                    this.context.$message({message: data.message, type: 'warning'})
                }
            }
            // else if (data.op === 'collect_update') {
            //     this.context.$store.commit('collectTrace', data.data);
            // }
            else if (data.op === 'choose_status') {
                this.context.$store.commit('branchStatus', data.data);
            }
        }
    }
}