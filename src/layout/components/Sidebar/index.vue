<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-custom custom-theme"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.backgroundColor"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped lang="scss">
//.el-menu-custom:before {
//  content: "";
//  width: 100%;
//  height: 100%;
//  position: absolute;
//  left: 0;
//  top: 0;
//  background-image: url('~@/assets/noise.e7f2a273.gif');
//  z-index: 1;
//  background-color: #639;
//  opacity: .05;
//}
.el-scrollbar__view::v-deep {
  height: 100%;
}
.el-menu-custom::v-deep {
  height: 100vh !important;
}
</style>
