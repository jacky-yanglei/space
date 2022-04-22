import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
// 创建一个新的 store 实例
const store = new Vuex.Store({
    state () {
        return {
            firstScreen: false,
            socketReady: false, // 推送链接准备成功
            userInfo: {}, // 用户信息
            videoEvent: null, // 强制展示的视频地址
            playVideo: false, // 是否展示video模框

            chatVideoModal: false,
            chatVideoUrl: null,
            
            webSocket: null, //  ws对象用于在页面中去发送消息
            forceText: null, // 强制展示的文本信息
            forceTextModel: false, // 是否展示文本模框
            chatDetailModel: false,
            chatDetailShowName: '', // 当前查看聊天的详情
            forceChooseLine: false,
            forceChoose: [],
            hasAnswer: {}, // 当前可以回复的群组
            imgView: false,  // 预览聊天中的图片
            imgViewBase64: '', 
            choosedBranch: {
                
            },
            replyChat: {

            },
            
            chat: {  // 聊天列表

            },


            // 可搜集线索清单
            colletScene: {},
            currentSceneStatus: false,
            currentColletScene: null,  // 当前收证场景

            collectedTrace: {},  // 已搜到的线索清单


            //当前分支选择情况
            currentBranchStatus: {},
        }
    },
    mutations: {
        // 第一屏等待DM开始
        firstScreen(state, data) {
            state.firstScreen = data
        },
        socketReady(state) {
            state.socketReady = true;
        },
        userInfo(state, data) {
            state.userInfo = data;
        },
        videoEvent(state, data) {
            state.videoEvent = data;
        },
        playVideo(state) {
            state.playVideo = true;
        },
        webSocket(state, data) {
            state.webSocket = data;
        },
        forceTextModel(state, data) {
            state.forceTextModel = data;
        },
        forceText(state, data) {
            state.forceText = data;
        },
        // 新增可回复的群组
        hasAnswer(state, data) {
            state.hasAnswer[data.send_group] = {
                id: data.id
            }
            state.hasAnswer = Object.assign({}, state.hasAnswer);
            // 如果没有群组要创建一个群组
            if (!state.chat[data.send_group]) {
                state.chat[data.send_group] = {
                    groupName: data.send_group,
                    chatList: []
                }
                state.chat = Object.assign({}, state.chat);
            }
        },
        // 关闭可回复的群组
        closeAnswer(state, data) {
            state.hasAnswer[data] = false;
        },
        // 接收聊天信息
        receivedChat(state, data) {
            if (data.speaker === 'player') {
                if (!state.replyChat[data.group]) {
                    state.replyChat[data.group] = {
                        groupName: data.group,
                        chat: data,
                    }
                }
                state.replyChat[data.group].chat = data;
                state.replyChat = Object.assign({}, state.replyChat);
                // 如果没有群组要创建一个群组
                if (!state.chat[data.group]) {
                    state.chat[data.group] = {
                        groupName: data.group,
                        chatList: []
                    }
                    state.chat = Object.assign({}, state.chat);
                }
            } else if (data.speaker === 'eleven' || typeof data.speaker === 'object') {
                if (state.replyChat[data.group]) {
                    state.replyChat[data.group].chat = null;
                    state.replyChat = Object.assign({}, state.replyChat); // 收到聊天后就要清除之前的聊天选项 
                }
                if (!state.chat[data.group]) {
                    state.chat[data.group] = {
                        groupName: data.group,
                        chatList: []
                    }
                }
                data.seed = false;
                state.chat[data.group].chatList.push(data);
                state.chat = Object.assign({}, state.chat);
            }
        },
        // 接收历史聊天信息
        receivedHistory(state, data) {
            for (let key in data) {
                if (!state.chat[key]) {
                    state.chat[key] = {
                        groupName: key,
                        chatList: []
                    }
                }
                let arr = data[key];
                let chatList = [];
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].speaker == 'player') {
                        if (!state.replyChat[key]) {
                            state.replyChat[key] = {
                                groupName: key,
                                chat: arr[i],
                            }
                        }
                        state.replyChat[key].chat = arr[i];
                        state.replyChat = Object.assign({}, state.replyChat);
                    } else {
                        if (!state.replyChat[key]) {
                            state.replyChat[key] = {
                                groupName: key,
                                chat: null,
                            }
                        } else {
                            state.replyChat[key].chat = null;
                        }
                        chatList.push(arr[i]);
                        state.replyChat = Object.assign({}, state.replyChat);
                    }
                }
                state.chat[key].chatList = chatList;
            }
            state.chat = Object.assign({}, state.chat);
        },
        // 关闭所有的强制事件
        closeAllForce(state) {
            state.playVideo = false;
            // state.forceChooseLine = false;
        },
        // 选择分支线路
        forceChooseLine(state) {
            state.forceChooseLine = true;
        },
        forceChoose(state, data) {
            state.forceChoose = data;
        },
        // 当前选择分支的情况
        choosedBranch(state, data) {
            state.choosedBranch = data;
        },
        // 添加可以收集线索的场景
        colletScene(state, data) {
            state.colletScene[data.send_group] = data;
            state.currentColletScene = data;
            state.currentSceneStatus = true;
            state.colletScene = Object.assign({}, state.colletScene);
        },
        // 处理场景历史
        colletHistory(state, data) {
            for(let i = 0; i < data.length; i++) {
                state.colletScene[data[i].send_group] = data[i];
            }
            state.colletScene = Object.assign({}, state.colletScene);
        },
        // 已搜到线索清单
        collectedTrace(state, data) {
            for (let key in data) {
                state.collectedTrace[key] = data[key];
            }
            state.collectedTrace = Object.assign({}, state.collectedTrace);
        },
        // 已搜到的一条线索
        collectTrace(state, data) {
            if (!state.collectedTrace[data.send_group]) {
                state.collectedTrace[data.send_group] = [];
            }
            if (state.collectedTrace[data.send_group].indexOf(data.id) === -1) {
                state.collectedTrace[data.send_group].push(data.id);
                state.collectedTrace = Object.assign({}, state.collectedTrace);
            }
        },
        branchStatus(state, data) {
            if (data.not_choosed.length === 0) { // 当未选择的人为空时关闭
                state.currentBranchStatus = {};
                state.forceChooseLine = false;
            }
            state.currentBranchStatus = data.choosed;
        }
    }
  });
  export default store;