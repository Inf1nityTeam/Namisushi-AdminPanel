<template>
  <header
    class="base-sidebar"
    :class="isCollapsed ? 'base-sidebar--open' : 'base-sidebar--close'"
  >
    <div class="base-sidebar__logo">
      <a href="#">
        <span>LOGO</span>
      </a>
    </div>

    <BaseSidebarToggle />

    <hr class="base-sidebar__hr base-sidebar__hr--top" />

    <div class="base-sidebar__menu base-sidebar__menu--top">
      <template v-for="el of menuList" :key="el.id">
        <el-tooltip
          effect="dark"
          :content="el.title"
          placement="right"
          :disabled="isCollapsed"
        >
          <router-link
            :to="el.path"
            :class="
              $route.path === el.path ||
              ($route.path === '/categories' && el.path === '/products')
                ? 'active'
                : ''
            "
          >
            <img :src="require(`@/assets/image/sidebar/${el.img}`)" />
            <span>{{ el.title }}</span>
          </router-link>
        </el-tooltip>
      </template>
    </div>

    <hr class="base-sidebar__hr base-sidebar__hr--center" />

    <div class="base-sidebar__menu base-sidebar__menu--center">
      <el-tooltip
        effect="dark"
        :content="notificationEl.title"
        placement="right"
        :disabled="isCollapsed"
      >
        <router-link
          :to="notificationEl.path"
          :class="$route.path === '/' ? 'active' : ''"
        >
          <img :src="require(`@/assets/image/sidebar/${notificationEl.img}`)" />
          <span>{{ notificationEl.title }}</span>
        </router-link>
      </el-tooltip>
    </div>

    <hr class="base-sidebar__hr base-sidebar__hr--last" />

    <div class="base-sidebar__menu">
      <router-link :to="logoutEl.path">
        <img :src="require(`@/assets/image/sidebar/${logoutEl.img}`)" />
        <span>{{ logoutEl.title }}</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { baseSidebarState } from "@/app/baseWrapper/components/baseSidebar/baseSidebar.state";
import BaseSidebarToggle from "@/app/baseWrapper/components/baseSidebar/BaseSidebarToggle";
import { sidebarMenu } from "@/app/baseWrapper/components/baseSidebar/baseSidebar.config";

export default {
  name: "base-sidebar",
  components: { BaseSidebarToggle },
  computed: {
    isCollapsed() {
      return baseSidebarState.isCollapsed;
    },
    menuList() {
      return sidebarMenu.filter((el) => el.id < sidebarMenu.length - 1);
    },
    logoutEl() {
      return sidebarMenu[sidebarMenu.length - 1];
    },
    notificationEl() {
      return sidebarMenu[sidebarMenu.length - 2];
    },
  },
};
</script>

<style scoped lang="scss">
.base-sidebar {
  position: fixed;
  background: #11162b;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 20px;
  transition: all 350ms ease-in-out;

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  &__logo {
    transition: all 350ms ease-in-out;

    > a {
      > span {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }

  &__hr {
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    border: none;
    position: absolute;
    transition: all 350ms ease-in-out;

    &--last {
      bottom: 64px;
    }
  }

  &__menu {
    position: absolute;
    width: 100%;
    transition: all 350ms ease-in-out;

    > a {
      margin: auto;
      padding: 12px 16px;
      height: 52px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: all 350ms ease-in-out;

      > img {
        height: 28px;
      }

      > span {
        margin-top: 6px;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.9);
      }
    }

    > .active {
      //background: rgba(21, 21, 21, 0.7);
      background: linear-gradient(180deg, #7ea8fc 0%, #2662f3 100%);
    }

    &:nth-last-child(1) {
      bottom: 10px;

      > a {
        height: 46px;

        &:hover {
          //background: rgba(21, 21, 21, 0.7);
          background: linear-gradient(180deg, #7ea8fc 0%, #2662f3 100%);
        }
      }
    }

    &--center {
      > a {
        > img {
          height: 20px;
          margin-left: 4px;
          margin-right: 6px;
        }
      }
    }
  }

  &--open {
    width: 292px;

    .base-sidebar {
      &__logo {
        margin-left: 24px;
      }

      &__hr {
        width: 244px;
        left: 24px;

        &--top {
          top: 64px;
        }

        &--center {
          top: calc(232px + 64px);
        }
      }

      &__menu {
        &--top {
          top: 77px;
        }

        &--center {
          top: calc(208px + 77px + 25px);
          //bottom: 10px;
        }

        > a {
          width: 268px;

          > span {
            transform: translateX(9px);
            opacity: 1;
            transition: all 150ms ease-in-out 330ms;
          }
        }
      }
    }
  }

  &--close {
    width: 84px;

    .base-sidebar {
      &__logo {
        margin-left: 19px;
      }

      &__hr {
        width: 36px;
        left: 24px;

        &--top {
          top: 106px;
        }

        &--center {
          top: calc(232px + 106px);
        }
      }

      &__menu {
        &--top {
          top: 119px;
        }

        &--center {
          top: calc(208px + 119px + 25px);
          //bottom: 10px;
        }

        > a {
          width: 60px;

          > span {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 150ms ease-in-out;
          }
        }
      }
    }
  }
}
</style>
