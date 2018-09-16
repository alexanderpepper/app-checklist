<template lang="pug">
  v-app(:dark='isDarkTheme', :light='!isDarkTheme')
    v-toolbar(app)
      v-toolbar-title App Checklist
      v-spacer
      v-btn(icon, @click='isDarkTheme = !isDarkTheme')
        v-icon invert_colors
    v-content
      router-view
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isDarkTheme: false
    }
  }
}
</script>
