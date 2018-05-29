<template>
  <div>
    <group>
      <template v-for="field in allFormData">
        <template v-if="field.type === 'char'">
          <Char :title="field.title" v-model="field.value" type="text"></Char>
        </template>
        <template v-else-if="field.type === 'date'" >
          <datetime v-model="field.value" :title="field.title"></datetime>
        </template>
        <template v-else-if="field.type === 'datetime'" >
          <datetime v-model="field.value" :title="field.title" format="YYYY-MM-DD HH:mm"></datetime>
        </template>
        <template v-else-if="field.type === 'many2one'" >
          <Many2one :title="field.title" :value.sync='field.value'></Many2one>
        </template>
        <template v-else-if="field.type === 'one2many'" >

        </template>
        <template v-else-if="field.type === 'boolean'" >
          <x-switch :title="field.title" v-model="field.value"></x-switch>
        </template>
        <template v-else-if="field.type === 'integer'" >
          <x-number :title="field.title" v-model="field.value" button-style="round"></x-number>
        </template>
        <template v-else-if="field.type === 'float'" >
          <Char :title="field.title" v-model="field.value" type="number"></Char>
        </template>
        <template v-else-if="field.type === 'selection'" >
          <popup-radio :title="field.title" :options="field.options" v-model="field.value"></popup-radio>
        </template>
        <template v-else-if="field.type === 'text'" >
          <x-textarea :title="field.title" v-model="field.value"></x-textarea>
        </template>
        <template v-else-if="field.type === 'Html'" >

        </template>
        <template v-else-if="field.type === 'Binary'" >

        </template>
        <template v-else-if="field.type === 'Many2many'" >

        </template>

      </template>
    </group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import Char from './field/OdooFieldChar.vue'
  import Many2one from './field/OdooMany2one.vue'
  import { GroupTitle, Group, XInput, Selector, PopupRadio,
    Datetime, XNumber, XTextarea, XSwitch } from 'vux'

  export default {
    name: 'formComponent',
    components: {
      Group,
      Char,
      PopupRadio,
      Many2one,
      GroupTitle,
      XInput,
      Selector,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch
    },
    data: function () {
      return {
        second_level_menu: [],
        allFormData: [],
        model: [],
        id: []
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
    created: function () {
      let self = this
      self.$nextTick(function () {
        self.get_form_data()
      })
    },
    methods: {
      actionSheetFunction: function (itemIndex, items) {

      },
      get_form_data: function () {
        let self = this
        axios.get('/odoo/form/new/data', {model: this.model, id: this.recordId}).then(function (response) {
          self.allFormData = response.data
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    watch: {
      '$route': function (to, from) {
      }
    }
  }
</script>
