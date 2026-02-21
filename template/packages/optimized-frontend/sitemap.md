# Sitemap Generation Feature

The `optimized-frontend` package includes a built-in sitemap generator that supports handling large numbers of dynamic pages through pagination.

## Configuration

To enable sitemap generation, update your `config.js` file.

### 1. Add Domain

```javascript
let config = {
  domain: "https://your-domain.com",
  // ... other config
};
```

### 2. Add `sitemapGenerator` to Dynamic Routes

The `sitemapGenerator` function should return:
- `uniqueName`: A unique identifier for this route (e.g., `"posts"`)
- `total`: Total number of items
- `loader`: A function that returns a batch of URLs

#### Loader parameters

| Parameter | Description |
|-----------|-------------|
| `limit` | Max items to return (default: 10,000) |
| `itemsToSkip` | Number of items to skip (for pagination) |

#### Loader return format

Each item should contain:
- `url`: Relative or absolute URL of the page
- `lastUpdatedAt` (optional): ISO date string

### Example

```javascript
const dynamicRoutes = [
  {
    path: "/post/:id",
    loaderForBot: async ({ params }) => {
      return { htmlHeadCode: "", images: "", mainImage: "", title: "...", text: "...", items: [] };
    },
    loaderForClient: async ({ params }) => {
      return await fetch(`/api/posts/${params.id}`).then((r) => r.json());
    },

    sitemapGenerator: async () => {
      const totalPosts = 100000;

      return {
        uniqueName: "post",
        total: totalPosts,
        loader: async ({ limit, itemsToSkip }) => {
          // Fetch batch of posts from your DB
          return posts.map(post => ({
            url: `/post/${post.id}`,
            lastUpdatedAt: post.updatedAt,
          }));
        },
      };
    },
  },
];
```

## Generated Endpoints

| Endpoint | Description |
|----------|-------------|
| `/sitemap.xml` | Main sitemap index |
| `/sitemap-static.xml` | Static routes sitemap |
| `/sitemap-<uniqueName>.xml` | Dynamic route sitemap index (e.g., `/sitemap-post.xml`) |
| `/sitemap-<uniqueName>-<page>.xml` | Paginated sitemap files (e.g., `/sitemap-post-1.xml`) — up to 10,000 URLs each |
