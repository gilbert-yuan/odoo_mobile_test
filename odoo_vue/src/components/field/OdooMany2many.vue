<template>
  <cell @click.native="show" :title="title" :value="currentValue" :is-link="!readonly" primary="title">
    <div style="width:250px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;">
      <span class="vux-cell-value" v-if="displayValue">{{ displayValue }}</span>
    </div>
    <div v-transfer-dom>
      <popup
        height="100%"
        width="75%"
        position="right"
        v-model="showPopup"
        style="background-color:#fff;"
        @on-hide="$emit('on-hide')"
        @on-show="$emit('on-show')">
        <search
          :results="results"
          v-model="searchValue"
          position="absolute"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search"></search>
        <checklist  random-order
                   :options.sync="options" v-model="currentValue"
                   @on-change="onValueChange"></checklist>
      </popup>
    </div>
  </cell>
</template>

<script>
  import {Cell, Popup, Radio, TransferDom, Search, Checklist} from 'vux'

  export default {
    name: 'Many2many',
    components: {
      Popup,
      Search,
      Checklist,
      Radio,
      Cell
    },
    directives: {
      TransferDom
    },
    props: ['title', 'value', 'readonly', 'field', 'options_default'],
    computed: {
      displayValue: function () {
        let ChoiceVal = ''
        if (this.options && !this.options.length) {
          return ChoiceVal
        }
        if (typeof this.options[0] === 'object') {
          const match = this.options.filter(option => {
            return this.currentValue.indexOf(option.key) >= 0
          })
          if (match) {
            match.forEach(function (value) {
              ChoiceVal = ChoiceVal + ' ' + value.value
            })
            return ChoiceVal
          }
        }
        return ChoiceVal
      }
    },
    methods: {
      onValueChange: function (val) {
        // this.hide()
      },
      show: function () {
        if (!this.readonly) {
          this.getNewData()
          this.showPopup = true
        }
      },
      setFocus: function () {
        this.$refs.search.setFocus()
      },
      onSubmit: function () {
        this.getNewData()
      },
      onFocus: function () {
        this.radioSearchHeight = '45px'
      },
      onCancel: function () {
        this.radioSearchHeight = '0px'
        this.showPopup = false
      },
      hide: function () {
        this.showPopup = false
      },
      getNewData: function () {
        let self = this
        self.$http.get('/odoo/mobile/model/name_search',
          {
            params:
              {model: self.field.model, value: self.searchValue || '', domain: self.field.domain || [], limit: 15}
          }).then(function (response) {
            self.options = response.data
          }).catch(function (error) {
            alert(JSON.stringify(error))
          })
      }
    },
    watch: {
      value: function (val) {
        this.currentValue = val
      },
      currentValue: function (val) {
        console.log(val)
        this.$emit('update:value', val)
        this.$emit('update:options_default', this.currentValue)
      }
    },
    created: function () {
      // this.getNewData()
    },
    data: function () {
      return {
        results: [],
        searchValue: '',
        radioSearchHeight: '0px',
        options: this.options_default || [],
        showPopup: false,
        currentValue: []
      }
    }
  }
</script>

<style  type="less">

</style>
