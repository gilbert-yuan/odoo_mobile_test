<template>
  <div id="app-box">
    <template v-for="grid in gridDatas">
      <group-title>{{grid.groupTitle}}</group-title>
      <grid :cols="grid.cols">
        <template v-for="gridSingle in grid.gridRow">
          <div v-on:click="clickGridItem(gridSingle)">
            <grid-item :label="gridSingle.title" >
              <img slot="icon" :src="gridSingle.image">
            </grid-item>
          </div>
        </template>
      </grid>
    </template>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  import {XHeader, Grid, GridItem, GroupTitle} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'odooGrid',
    components: {
      Grid,
      XHeader,
      GroupTitle,
      GridItem
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.vux.isLoading,
        vux: state => state.vux
      })
    },
    data: function () {
      return {
        cols: 4,
        headerTitle: '',
        gridDatas: []
      }
    },
    methods: {
      clickGridItem: function (gridSingle) {
        this.vux.headerTitle = gridSingle.title
        this.$router.push({name: 'odooViews', params: {actionId: gridSingle.actionId}})
      }
    },
    created: function () {
      let self = this
      self.$http.get('/odoo/mobile/get/all/grid_data').then(function (response) {
        self.gridDatas = response.data
      }).catch(function (error) {
        alert(error)
      })
    }
  }
</script>

<style>

  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
