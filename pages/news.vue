<template>
  <div class="news-detail-wrap">
      <div v-html="newsDetail"></div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

// 获取路由参数
const route = useRoute();
const newsId = route.params.id as string;

// 新闻详情数据
const newsDetail = ref<any>(null);

// 格式化日期
const formatDate = (dateString: string) => {
  return dayjs(dateString, "YYYY-MM-DD").format("YYYY年MM月DD日");
};

// 获取新闻详情
const fetchNewsDetail = async () => {
  try {
    
    const api_url: string = "http://192.168.1.207:8000/api/news";
    try {
      const { data } = await useFetch(api_url, {
        query: {
          id: newsId
        }
      });
      newsDetail.value = data.value?.data.com_txt
    } catch (error) {
      console.warn(error);
    }
  } catch (error) {
    console.error('获取新闻详情失败:', error);
    newsDetail.value = null;
  }
};

// 页面加载时获取数据
fetchNewsDetail();

// 监听路由变化
watch(() => route.params.id, (newId) => {
  if (newId !== newsId) {
    fetchNewsDetail();
  }
});
</script>

<style lang="scss" scoped>
.news-detail-wrap {
  min-height: 100vh;
  background-image: linear-gradient(0deg, #0e0e0e, #292875);
  padding: 80px 0 40px;
}

.news-detail-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: #7d7e8c;
  font-size: 14px;

  .breadcrumb-item {
    color: #7d7e8c;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }

    &.active {
      color: #f2be61;
    }
  }

  .breadcrumb-separator {
    margin: 0 8px;
    color: #7d7e8c;
  }
}

.news-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.news-header {
  margin-bottom: 30px;

  .news-title {
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  .news-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    .news-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .news-tag {
        padding: 4px 12px;
        background: rgba(242, 190, 97, 0.2);
        color: #f2be61;
        border-radius: 20px;
        font-size: 12px;
        border: 1px solid rgba(242, 190, 97, 0.3);
      }
    }

    .news-date {
      color: #7d7e8c;
      font-size: 14px;
    }
  }
}

.news-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;

  .cover-image {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
}

.news-body {
  .news-description {
    color: #e0e0e0;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 30px;

    p {
      margin-bottom: 16px;
    }
  }

  .news-actions {
    display: flex;
    justify-content: center;

    .read-more-btn {
      display: inline-block;
      padding: 12px 32px;
      background: linear-gradient(135deg, #f2be61, #e6a93a);
      color: #ffffff;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(242, 190, 97, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(242, 190, 97, 0.4);
      }
    }
  }
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: #ffffff;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #f2be61;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  p {
    color: #7d7e8c;
    font-size: 16px;
  }
}

.error {
  text-align: center;
  padding: 60px 0;
  color: #ffffff;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #f2be61;
  }

  p {
    color: #7d7e8c;
    margin-bottom: 30px;
  }

  .back-btn {
    display: inline-block;
    padding: 10px 24px;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 响应式设计
@media (max-width: 768px) {
  .news-detail-container {
    width: 100%;
    padding: 0 16px;
  }

  .news-content {
    padding: 20px;
  }

  .news-header .news-title {
    font-size: 24px;
  }

  .news-meta {
    flex-direction: column;
    align-items: flex-start !important;
  }
}
</style> 