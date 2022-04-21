<template>
    <div>
        <div style="width: 100%">
            <video-player  class="video-player-box"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
                >
            </video-player>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            playerOptions: {
                // videojs options
                width: document.body.clientWidth,
                muted: false,
                language: 'zh',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: "https://wx.tmgxbxwl.cn/tsm/api/static/video/%E6%8A%96%E9%9F%B3/02.mp4"
                }],
                poster: "https://www.matrixone.io/assets/images/funds/report/report-logo.png",
            }
        }
    }
}
</script>
<style lang="less" scoped>
// ::v-deep {
//      .vjs-big-play-button {
//         top: 50%;
//         left: 50%;
//     }
// }
</style>