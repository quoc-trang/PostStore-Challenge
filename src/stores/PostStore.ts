import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, watch } from "vue";
import type { Post } from "@/types";
import { useCachedFetch } from "@/composables/useCachedFetch";

export const usePostStore = defineStore("PostStore", () => {
  const posts = ref<Post[]>();
  const { loading: loadingList, doFetch } = useCachedFetch({
    fetchStrategy: "stale-refresh-bg",
    data: posts,
  });

  async function fetchPostList() {
    await doFetch("/api/posts?fields=id,title,previewSnippet");
  }

  const postWithBody = ref<Post[]>([]);
  const singlePost = ref<Post>();

  async function fetchPostSingle(id: number) {
    const { loading: loadingSingle, doFetch: doFetchSingle } = useCachedFetch({
      fetchStrategy: "stale-refresh-bg",
      data: singlePost,
    });
    await doFetchSingle(`/api/posts/${id}`);
  }

  watch(posts, (newValue) => {
    newValue?.forEach(async (item) => {
      await fetchPostSingle(item.id);
      if (singlePost.value) postWithBody.value.push(singlePost.value);
    });
  });

  return {
    // list of posts
    loadingList,
    posts,
    fetchPostList,

    // single post
    fetchPostSingle,
    postWithBody,
  };
});

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}
