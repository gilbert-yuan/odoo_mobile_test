<template>
  <div class="vux-form-preview weui-form-preview">
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="(item, index) in list" @click.prevent="card_onclick(list)" :key="index">
        <template v-if="!item.invisible">
          <template v-if="['char', 'text', 'integer', 'float', 'date', 'datetime'].indexOf(item.type) >= 0">
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
          <template v-if="['many2one', 'selecttion'].indexOf(item.type) >= 0">
            <label class="weui-form-preview__label">{{item.title}}</label>
            <span class="weui-form-preview__value">{{item.options?item.options[0].value:''}}</span>
          </template>
          <template v-if="['selecttion'].indexOf(item.type) >= 0">
            <label class="weui-form-preview__label">{{item.title}}</label>
            <span class="weui-form-preview__value">{{item.options?item.options[0].value:''}}</span>
          </template>
          <template v-else-if="!item.invisible && item.type === 'button'">
            <div :have_button="button=true"/>
          </template>
        </template>
      </div>
    </div>
    <div class="weui-form-preview__ft" v-show="button">
      <div v-for="(item, index) in list" :key="index">
        <a class="weui-form-preview__btn"  v-show="!item.invisible && item.type === 'button'"
               href="javascript:"  v-on:click.prevent="buttonHttp(item, index)"
           :class="{'weui-form-preview__btn_default': item.style==='default', 'weui-form-preview__btn_primary': item.style === 'primary'}"
                v-bind:value="list[0].value">{{item.title}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'vux'

  export default {
    name: 'cell-form-preview',
    components: {
      Icon
    },
    props: {
      card: {},
      model: {type: String},
      viewId: {type: Number},
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
        if (item.value === 'change') {
          self.$router.push({
            name: 'newForm',
            params: {
              id: self.card.id,
              model: self.model,
              viewId: self.viewId
            }
          })
        } else {
          self.$http.post('/odoo/mobile/button/method', {
            params: {
              method: item.value,
              model: item.model,
              ids: self.id
            }
          }).then(function (response) {
            let result = response.data
            if (result.success) {
              self.$emit('refresh', false)
            } else {
              self.$emit('show-toast', {toastType: 'warn', toastMsg: result.errMsg, toastShow: true})
            }
          }).catch(function () {

          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
  @import '~vux/src/styles/weui/widget/weui_cell/weui_cell_global';

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

