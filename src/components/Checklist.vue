<template lang="pug">
  v-container(fluid)
    v-slide-y-transition(mode='out-in')
      v-layout(align-center, wrap)
        v-flex.mb-4(xs12, v-for='(topic, index) in checklist.topics', :key='index')
          v-card
            v-card-title.title(v-text='topic.name')
            v-card-text
              div(v-for='(item, index) in topic.items', :key='index')
                v-checkbox(v-model='item.checked', :label='item.text')
        v-flex.mb-4.text-xs-right(xs12)
          v-btn.mx-0(color='primary', flat, @click='clearDialog = true') Clear All
    v-dialog(v-model="clearDialog", width="280")
      v-card
        v-card-text
          .title.mb-3 Are you sure?
          .body-1 Clear all checkboxes and start over?
        v-card-actions
          v-spacer
          v-btn(flat, color='primary', @click="clearDialog = false") Cancel
          v-btn.text--white(dark, color='red darken-2', @click='clear') Clear
</template>

<script>
  export default {
    name: 'Checklist',
    props: {
      app: String
    },
    data () {
      return {
        clearDialog: false,
        checklist: {
          topics: [
            {
              name: '',
              items: [
                {
                  text: '',
                  checked: false
                }
              ]
            }
          ]
        }
      }
    },
    watch: {
      $route: {
        handler () {
          this.initialize()
        }
      },
      checklist: {
        deep: true,
        handler () {
          console.log('changed')
          window.localStorage[this.app] = JSON.stringify(this.checklist)
        }
      }
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        if (window.localStorage[this.app]) {
          this.checklist = JSON.parse(window.localStorage[this.app])
        } else {
          this.loadFile()
        }
      },
      clear () {
        window.localStorage[this.app] = ''
        this.loadFile()
        this.clearDialog = false
        this.$forceUpdate()
      },
      loadFile () {
        this.checklist = require(`../constants/${this.app}.json`)
      }
    }
  }
</script>
