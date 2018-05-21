<template>
  <div>
    <group-title>2 columns</group-title>
    <grid>
      <grid-item :label="'Grid'" v-for="i in 2" :key="i">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Grid, GridItem, GroupTitle } from 'vux'

  export default {
    components: {
      Grid,
      GroupTitle,
      GridItem
    },
    data () {
      return {
        HeaderTitle: '',
        GridData: []

      }
    },
    methods: {
      ClickButtonTableItem: function () {
        return true
      }
    },
    created: function () {
      //      axios.get('/get/all/grid_data').then(function (response) {
      //        console.log(JSON.stringify(response))
      //      })
    }
  }
</script>

<style>

  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
