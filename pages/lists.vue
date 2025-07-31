<template>
  <div class="wrap">
    <div class="news-list flex flex-wrap justify-between">
      <div v-for="news in newsList" :key="news.com_biz" class="news-box">
        <div class="news-cover">
          <a href="javascript:;">
            <img class="picture" :src="news.com_cover" :alt="news.com_title" />
          </a>
        </div>
        <div class="my-12px">
          <NuxtLink :to="`/news/${news.com_docid}`">
            <p>{{ news.com_title }}</p>
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <div class="date ml-12px">
            {{ dayjs(news.com_update_time, "YYYY-MM-DD").format("YYYY年MM月") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

// 资讯列表
let newsList = [];
const api_url: string = "http://192.168.1.207:8000/api/lists";
try {
  const { data } = await useFetch(api_url);
  console.log(data)
  newsList = data.value?.data.default || [];
} catch (error) {
  console.warn(error);
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 64px 0;
  background-image: linear-gradient(0deg, #0e0e0e, #292875);
}

.news-list {
  width: 1200px;
  margin: 0 auto;
}

.news-box {
  width: 367px;
  margin-top: 24px;
  .news-cover {
    width: 100%;
    height: 172px;
    margin-top: 24px;
    border-radius: 8px;
    overflow: hidden;
    .picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    &:hover .picture {
      transform: scale(1.2);
    }
  }
  .title {
    color: #ffffff;
    font-size: 20px;
    line-height: 1.2;
  }
  .tag {
    min-width: 76px;
    padding: 2px 10px;
    color: #999ab0;
    border-radius: 4px;
    background-color: #31346c;
  }
  .date {
    color: #7d7e8c;
    line-height: 1.2;
  }
}
</style>
