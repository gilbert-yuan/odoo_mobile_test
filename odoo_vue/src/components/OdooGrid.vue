<template>
  <div id="app-box">
      <!-- <group-title>{{grid.groupTitle || ''}}</group-title> -->
      <div v-for="(grid_data, index) in gridDatas" :key="index">
        <group-title>{{grid_data.groupTitle || ''}}</group-title>
        <grid :cols="grid_data.gridCols || 0">
          <div v-for="(gridSingle, index1) in grid_data.gridRow" :key="index1">
            <div v-on:click="clickGridItem(gridSingle)">
              <grid-item :label="gridSingle.title" >
                <img slot="icon" :src="gridSingle.image">
              </grid-item>
            </div>
          </div>
        </grid>
    </div>
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
        document.title = gridSingle.title
        this.$router.push({name: 'odooViews', params: {actionId: gridSingle.actionId}})
      }
    },
    created: function () {
      let self = this
      this.$nextTick(() => {
        self.$http.get('/odoo/mobile/get/all/grid_data', {params: {}}).then(function (response) {
          console.log(response)
          self.gridDatas = response.data && response.data
        }).catch(function (error) {
          alert(error)
        })
      })
    }
  }
</script>

<style>

  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
