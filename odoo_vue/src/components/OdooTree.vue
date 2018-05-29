<template>
  <div>
    <scroller style="position:fixed; top: 84px;width:100%"
              :on-refresh="refresh"
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
      <TreeRow :list.sync="treeList" style=" position:autoFixed;" v-on:on-click-item="treeRowClick"></TreeRow>
    </scroller>
  </div>
</template>

<script>
  import axios from 'axios'
  import TreeRow from './field/OdooTreeRow.vue'
  import { mapState } from 'vuex'
  import { Panel, Search } from 'vux'
  export default {
    props: ['viewData', 'model'],
    name: 'Tree',
    components: {
      Panel,
      TreeRow,
      Search
    },
    data () {
      return {
        offset: 0,
        is_all_records_data: false,
        now_record_length: 6,
        treeList: []
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
    methods: {
      treeRowClick: function (item) {
        this.$emit('on-click-item', item)
      },
      get_more_data: function (offset, type) {
        let self = this
        axios.get('/odoo/get/tree', {modelName: this.model, offset: self.offset}).then(function (response) {
          if (type === 'add') {
            if (response.data.length !== 6) {
              self.is_all_records_data = true
            } else {
              self.is_all_records_data = false
            }
            self.now_record_length = response.data.length
            self.treeList = self.treeList.concat(response.data)
            console.log(self.treeList)
          } else {
            self.now_record_length = response.data.length
            self.treeList = response.data
          }
        }).catch(function (error) {
          alert(error)
        })
      },
      refresh: function (done) {
        var self = this
        setTimeout(function () {
          self.offset = 0
          self.treeList = []
          self.is_all_records_data = false
          self.get_more_data(0, 'fresh')
          done()
        }, 300)
      },
      infinite: function (done) {
        let self = this
        if (self.is_all_records_data || self.now_record_length < 6) {
          setTimeout(function () {
            done(true)
            self.is_all_records_data = false
          }, 300)
          return
        }
        setTimeout(function () {
          self.offset = self.offset + 6
          self.get_more_data(self.offset, 'add')
          done()
        }, 300)
      },
      actionSheetFunction: function (itemIndex, items) {
        let self = this
        if (itemIndex === 0) {
          self.$router.push({ name: 'newForm', params: {model: self.model} })
        }
      }
    },
    created: function () {
      let self = this
      self.vux.menus = ['新建', '取消']
      self.vux.actionSheetFunction = self.actionSheetFunction
      self.get_more_data(0, 'refresh')
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  .weui-cells.vux-search_show {
    margin-top: 0!important;
    overflow-y: auto!important;
    position: fixed!important;
    width: 100%!important;
    height: auto!important;
    .weui-cell:last-child {
      margin-bottom: 0px!important;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    &::after {
      display: none;
    }
  }
</style>
