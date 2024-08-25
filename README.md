---
difficulty: 1
training: true
chapter: "Chapter 3: Advanced State Management"
tags: vue
---

# PostStore Challenge

In this challenge, you are tasked with creating a `PostsStore`. It should be used for fetching and storing data for a list of posts and data for an individual post.

## Requirements

The `PostsStore` should:

1. Fetch the data for all the posts from `/api/posts`
   - In order to make things more performant you can request only the `post` fields (properties) needed like this: `/api/posts?fields=id,title,previewSnippet` (this excludes the post body, which in a real app is typically long and isn't shown on a listings page)
2. Keep up with the loading state of the posts list
3. Fetch the data for a single post (based on it's id) from `/api/posts/:id`
   - This will include the post body
4. When fetching the single post you should check the loaded post list to see if the post has already been partially loaded (without the body)
   - You can display the partially loaded post while the full request is pending

> 💡 HINT: The API responses have been given a 1 second delay so that you can develop the loading functionality more transparently

> 💡 HINT: Feel free to use TypeScript to make your store type safe if you'd like. This is NOT required however.

As a bonus challenge you can also:

1. Load the list of posts and the individual posts in the background while currently loaded data is still displayed
2. Implement a caching strategy to only refetch posts in the background after they have expired from a cache

> 💡 HINT: You won't have to do anything as complex as the bonus challenge on the exam but it is a great exercise to increase your skills

![Screenshot of the solution](https://images.certificates.dev/csvd-training-code-challenge-10.gif)
