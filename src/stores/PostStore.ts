import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import type { Post } from "@/types";
import { useCachedFetch } from "@/composables/useCachedFetch";

export const usePostStore = defineStore("PostStore", () => {
  const posts = ref<Post[]>();
  const loadingList = ref(false);
  function fetchPostList() {}

  const loadingSingle = ref(false);
  const post = ref<Post>();
  function fetchPostSingle() {}

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
