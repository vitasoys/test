<script lang="ts" setup>
import { CUR_ENV } from "@/config";
import Header from "@/layouts/Header/Header.vue";
import Footer from "@/layouts/Footer/Footer.vue";
import {
  Swiper,
  SwiperSlide,
  modules as swiperModules,
} from "@/lib/vue-swiper";
import type { Swiper as SwiperClass, SwiperOptions } from "swiper/types";

// swiper
const swiperOptions: SwiperOptions = {
  modules: swiperModules,
  direction: "vertical",
  mousewheel: true,
  slidesOffsetAfter: 200,
  resistanceRatio: 0,
};
const activePageIndex = ref(0);
const onSlideChange = (swiper: SwiperClass) => {
  activePageIndex.value = swiper.activeIndex;
};

// banner 切换
const bannerActivatedIndex = ref<number>(1);
const bannerMaxIndex: number = 5;
let nextBannerTimer: NodeJS.Timeout | undefined;
const handleNextBanner = () => {
  if (nextBannerTimer) return;
  nextBannerTimer = setTimeout(() => {
    nextBannerTimer = undefined;
    if (bannerActivatedIndex.value === bannerMaxIndex) {
      bannerActivatedIndex.value = 1;
      return;
    }
    bannerActivatedIndex.value += 1;
  }, 3200);
};

watch(
  () => activePageIndex.value,
  () => {
    if (activePageIndex.value) {
      handleNextBanner();
    } else {
      bannerActivatedIndex.value = 1;
      nextBannerTimer && clearTimeout(nextBannerTimer);
      nextBannerTimer = undefined;
    }
  }
);

console.log('当前环境', CUR_ENV)
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <Header :class="`active-${activePageIndex}`"></Header>
    </template>
    <swiper v-bind="swiperOptions" @slideChange="onSlideChange">
      <swiper-slide>
        <div class="full-page">
          <video
            class="video-player"
            src="@/assets/media/video/index-layer.mp4"
            muted
            autoplay
            loop
          ></video>
          <div class="slogan"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="full-page" :class="{ animate: activePageIndex }">
          <div class="role-banner">
            <transition-group name="fade" @after-leave="handleNextBanner">
              <div
                class="pic-role"
                v-for="index in bannerMaxIndex"
                v-show="index === bannerActivatedIndex"
                :key="index"
              ></div>
            </transition-group>
          </div>
          <div class="layer">
            <div class="content">
              <div class="title-en">Tencent Game</div>
              <h2 class="title">腾讯游戏</h2>
              <div class="desc <2xl:w-32vw">
                <p>腾讯游戏成立于2003年，是全球领先的游戏开发商和运营商。</p>
                <p>
                  腾讯游戏希望从游戏最本质的体验和精神出发，以快乐的基因和不变的初心为原点，为游戏赋予更多元的价值和意义。
                </p>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <template #footer>
      <Footer></Footer>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.swiper {
  padding-top: 62px;
  width: 100%;
  height: 100vh;
}

.default-layout {
  position: relative;
  .header {
    &.active-0 {
      --header-bg-color: transparent;
    }
    &.active-1 {
      --header-bg-color: #f2be61;
    }
    &.active-2 {
      --header-bg-color: #551ed7;
    }
    &.active-3 {
      --header-bg-color: #3d6898;
    }
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}

.full-page {
  position: relative;
  height: 100%;
  width: 100%;
}
.video-player {
  position: absolute;
  width: 100%;
  height: 100vh;
  bottom: 0;
  object-fit: cover;
}
.layer {
  position: relative;
  height: 100%;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    transparent 40%
  );
  .slogan {
    position: absolute;
    width: 592px;
    height: 162px;
    top: 40%;
    left: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("~/assets/images/index/firstPage/slogan.webp");
    transform: translate(-50%, -50%);
  }
}

.full-page {
  position: relative;
  height: 100%;
  width: 100%;
  background-size: auto 80%, cover;
  background-position: left, center;
  background-repeat: no-repeat;
  background-color: #fff;
  background-image: url("~/assets/images/index/secondPage/bg/pvp-logo-bg.png"),
    url("~/assets/images/index/secondPage/bg/pvp-bg.webp");
}

.role-banner {
  position: absolute;
  height: 100%;
  width: 100%;
  .pic-role {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: auto 100%;
    background-position: left bottom;
    background-repeat: no-repeat;
    &:nth-child(1) {
      background-image: url("~/assets/images/index/secondPage/img/role1.png");
    }
    &:nth-child(2) {
      background-image: url("~/assets/images/index/secondPage/img/role2.png");
    }
    &:nth-child(3) {
      background-image: url("~/assets/images/index/secondPage/img/role3.png");
    }
    &:nth-child(4) {
      background-image: url("~/assets/images/index/secondPage/img/role4.png");
    }
    &:nth-child(5) {
      background-image: url("~/assets/images/index/secondPage/img/role5.png");
    }
  }
}

.layer {
  position: relative;
  height: 100%;
  background-size: 120% 100%;
  background-position: left bottom;
  background-repeat: no-repeat;
  background-image: url("~/assets/images/index/secondPage/bg/pvp-gold-bg.png");
  z-index: 9;
}

.content {
  position: absolute;
  top: 10%;
  right: 2%;
  .title,
  .title-en {
    font-size: 48px;
    font-weight: bold;
    line-height: 60px;
  }
  .title-en {
    color: rgb(242, 190, 97, 0.7);
  }
  .title {
    color: #2c2c2c;
  }
  .desc {
    max-width: 560px;
    margin-top: 60px;
    color: #353434;
    font-size: 20px;
    line-height: 40px;
  }
}

.full-page.animate {
  .content {
    .title,
    .title-en {
      opacity: 0;
      animation: slide-in 1s 400ms ease-in-out forwards;
    }
    .desc {
      opacity: 0;
      animation: slide-in 0.8s 800ms ease-in-out forwards;
    }
  }
  .role-banner {
    animation: slide-right-in 0.8s ease-in-out forwards;
  }
}

// 动画
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s opacity ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slide-in {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slide-right-in {
  0% {
    transform: translateX(-100px);
    opacity: 0.78;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
