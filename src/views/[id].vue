<script setup lang="ts">
import { usePostStore } from "@/stores/PostStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppLoader from "@/components/AppLoader.vue";
const route = useRoute();

const postStore = usePostStore();
const id = Number(route.params.id as string);

if (!id) {
  throw new Error("Post ID is required");
}

const post = computed(() =>
  postStore.postWithBody.find((post) => post.id === id)
);

const singlePostTitle = computed(
  () => postStore.posts?.find((item) => item.id === id)?.title
);
</script>
<template>
  <h1 class="text-3xl">
    {{ singlePostTitle ?? post?.title }}
    <AppLoader v-if="postStore.loadingList" size="sm" />
  </h1>
  <div v-if="post">
    <p>
      {{ new Date(post?.publishedAt).toLocaleDateString() }}
      {{ new Date(post?.publishedAt).toLocaleTimeString() }}
    </p>
    <p class="mb-5 opacity-50">{{ post?.previewSnippet }}</p>
    <div>
      <p>{{ post?.body }}</p>
    </div>
  </div>
  <div v-else>
    <div class="w-3/4 h-4 mb-2 skeleton"></div>
    <div class="w-full h-4 mb-2 skeleton"></div>
    <div class="w-full h-4 mb-2 skeleton"></div>
  </div>
</template>
