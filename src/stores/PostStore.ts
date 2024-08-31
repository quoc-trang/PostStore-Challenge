import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import type { Post } from "@/types";
import { useCachedFetch } from "@/composables/useCachedFetch";

export const usePostStore = defineStore("PostStore", () => {
  const posts = ref<Post[]>();
  const loadingList = ref(false);
  async function fetchPostList() {
    loadingList.value = true;
    const response = await fetch("/api/posts?fields=id,title,previewSnippet");
    posts.value = await response.json();
    loadingList.value = false;
  }

  const loadingSingle = ref(false);
  const post = ref<Post>();
  async function fetchPostSingle(id: number) {
    loadingSingle.value = true;
    const response = await fetch(`/api/posts/${id}`);
    post.value = await response.json();
    loadingSingle.value = false;
  }

  return {
    // list of posts
    loadingList,
    posts,
    fetchPostList,

    // single post
    fetchPostSingle,
    loadingSingle,
    post,
  };
});

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}
