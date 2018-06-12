<template>
  <div class="weui-cell vux-cell-form-preview">
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in list" @click.prevent="card_onclick(list)">
        <template v-if="!item.invisible">
          <template v-if="['char', 'text', 'many2one', 'integer', 'float', 'date', 'datetime'].indexOf(item.type) >= 0">
            <label class="weui-form-preview__label">{{item.title}}</label>
            <span class="weui-form-preview__value">{{item.value}}</span>
          </template>
          <template v-else-if="item.type === 'boolean'">
            <label class="weui-form-preview__label">{{item.title}}</label>
            <template v-if="item.value">
              <span class="weui-form-preview__value"><icon type="success"></icon></span>
            </template>
            <template v-else>
              <span class="weui-form-preview__value"><icon type="cancel"></icon></span>
            </template>
          </template>
          <template v-else-if="!item.invisible && item.type === 'button'">
            <div :have_button="button=true"/>
          </template>
        </template>
      </div>
      <div class="weui-form-preview__ft" v-show="button">
        <template  v-for="(item, index) in list">
          <button class="weui-form-preview__btn weui-form-preview-btn__primary"
                  v-show="!item.invisible && item.type === 'button'"
                  v-on:click.prevent="buttonHttp(item, index)"
                  v-bind:value="list[0].value">{{item.title}} </button>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
  import { Icon } from 'vux'
  export default {
    name: 'cell-form-preview',
    components: {
      Icon
    },
    props: {
      card: {},
      borderIntent: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        id: this.card.id,
        list: this.card.fieldVals,
        button: false
      }
    },

    methods: {
      card_onclick: function (list) {
        this.$emit('on-click-card', list)
      },
      buttonHttp: function (item, index) {
        let self = this
        self.$http.get('/odoo/button/method', {params: { 'method': item.value, 'model': item.model, 'ids': self.list[0].value }}).then(function (response) {
          if (response.data.success) {
            self.$emit('refresh', false)
          } else {
            self.$emit('show-toast', {toastType: 'warn', toastMsg: response.data.errMsg, toastShow: true})
          }
        }).catch(function () {

        })
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  @import '~vux/src/styles//weui/widget/weui_cell/weui_form/weui-form-preview.less';

  .vux-cell-form-preview .weui-form-preview__bd {
    width: 100%;
    padding: 0;
  }
  .weui-form-preview-ft {
    display: -webkit-flex;
    display: flex;
    line-height: 50px;
    position: relative;
  }
  button.weui-form-preview-btn {
    background-color: transparent;
    border: 0 none;
    font-size: inherit;
    outline: 0 none;
  }
  .weui-form-preview-btn:active {
    background-color: #eeeeee;
  }
  .weui-form-preview-btn::after {
    border-left: 1px solid #d5d5d6;
    bottom: 0;
    color: #d5d5d6;
    content: " ";
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleX(0.5);
    transform-origin: 0 0 0;
    width: 1px;
  }
  .weui-form-preview-btn:first-child::after {
    display: none;
  }
  .weui-form-preview-btn-default {
    color: #999999;
  }
  .weui-form-preview-btn-default {
    color: #999999;
  }
  .weui-form-preview-btn-primary {
    color: #0bb20c;
  }
</style>

