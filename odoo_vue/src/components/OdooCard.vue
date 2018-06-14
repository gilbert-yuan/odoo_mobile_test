<template>
  <div>
    <scroller style="position:fixed; top: 90px;bottom: 70px;width:100%"
              :on-refresh="refresh"
              noDataText="暂无更多数据"
              loadingLayerColor="position: relative; top: -0.9em; padding: 0 .55em; color: #999999;font-size:5em"
              refresh-layer-color="#4b8bf4"
              loading-layer-color="#ec4949"
              :on-infinite="infinite">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                     repeatCount="indefinite">
            </animate>
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                     repeatCount="indefinite">
            </animate>
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                     repeatCount="indefinite">
            </animate>
          </line>
          <line x1="52" x2="52" y1="16" y2="48">
            <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36"
                     repeatCount="indefinite">
            </animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                     repeatCount="indefinite">
            </animate>
          </line>
        </g>
      </svg>
      <template v-for="card in cardList">
        <div class="weui-cells">
          <cell-form-preview :card.sync="card" @on-click-card="treeRowClick" :border-intent="false"
                             @refresh="refresh_data" @show-toast="showToast">
          </cell-form-preview>
        </div>
      </template>
    </scroller>
    <toast v-model="toastShow" :type="toastType">{{toastMsg}}</toast>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Search, Group} from 'vux'
  import CellFormPreview from './cellFormPreview.vue'

  export default {
    props: ['model', 'domain', 'view_id', 'limit', 'offset_step', 'context'],
    name: 'OdooCard',
    components: {
      Group,
      CellFormPreview,
      Search
    },
    data: function () {
      return {
        offset: 0,
        timer: 0,
        toastShow: false,
        toastType: 'success',
        toastMsg: '',
        mainBtnColor: '#FF0099',
        is_all_records_data: false,
        now_record_length: this.offset_step,
        cardList: []
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.vux.isLoading,
        vux: state => state.vux
      })
    },
    mounted () {
      let self = this
      this.timer = setInterval(() => {
        self.$vux.toast.isVisible()
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {
      showToast: function (toastSetting) {
        let self = this
        self.toastMsg = toastSetting.toastMsg
        self.toastType = toastSetting.toastType
        self.toastShow = toastSetting.toastShow
      },
      refresh_data: function () {
        let self = this
        self.offset = 0
        self.cardList = []
        self.get_more_data(self.offset, 'fresh')
      },
      treeRowClick: function (item) {
        this.$emit('on-click-item', item)
      },
      get_more_data: function (offset, type) {
        let self = this
        if (!self.model || !self.limit || !self.offset & self.offset !== 0 || !self.view_id || !self.domain) {
          return
        }
        self.$http.get('/odoo/get/list/view/data', {
          params: {
            model: self.model,
            view_id: self.view_id,
            domain: self.domain,
            limit: self.limit,
            offset: self.offset}
        }).then(function (response) {
          if (!response.data) {
            return
          }
          if (type === 'add') {
            if (response.data.length !== self.offset_step) {
              self.is_all_records_data = true
            } else {
              self.is_all_records_data = false
            }
            self.now_record_length = response.data.length
            self.cardList = self.cardList.concat(response.data)
            console.log(self.cardList)
          } else {
            self.now_record_length = response.data.length
            self.cardList = response.data
          }
        }).catch(function (error) {
          alert(error)
        })
      },
      refresh: function (done) {
        var self = this
        setTimeout(function () {
          self.offset = 0
          self.cardList = []
          self.is_all_records_data = false
          self.get_more_data(0, 'fresh')
          done()
        }, 300)
      },
      infinite: function (done) {
        let self = this
        if (self.is_all_records_data || self.now_record_length < self.offset_step) {
          setTimeout(function () {
            done(true)
            self.is_all_records_data = false
          }, 300)
          return
        }
        setTimeout(function () {
          self.offset = self.offset + self.offset_step
          self.get_more_data(self.offset, 'add')
          done()
        }, 300)
      },
      actionSheetFunction: function (itemIndex, items) {
        let self = this
        if (itemIndex === 0) {
          self.$router.push({name: 'newForm', params: {model: self.model}})
        }
      }
    },
    watch: {
      domain: {
        handler: function (val, oldVal) {
          let self = this
          self.offset = 0
          self.cardList = []
          self.get_more_data(self.offset, 'fresh')
        }
      }
    },
    created: function () {
      let self = this
      self.vux.menus = ['新建', '取消']
      self.vux.actionSheetFunction = self.actionSheetFunction
      self.offset = 0
      self.get_more_data(self.offset, 'refresh')
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  .no-data-text {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -0.9em;
    padding: 0 .55em;
    color: #999999;
    width: 65%;
    margin: 1.5em auto;
    line-height: 1.6em;
    font-size: 14px;
    text-align: center;

  }
  /*.card_top_bottom {}*/
  /*.weui-cells.vux-search_show {*/
    /*margin-top: 0 !important;*/
    /*overflow-y: auto !important;*/
    /*position: fixed !important;*/
    /*width: 100% !important;*/
    /*height: auto !important;*/
    /*.weui-cell:last-child {*/
      /*margin-bottom: 0px !important;*/
    /*}*/
    /*&::-webkit-scrollbar {*/
      /*display: none;*/
    /*}*/
    /*&::after {*/
      /*display: none;*/
    /*}*/
  /*}*/
</style>
