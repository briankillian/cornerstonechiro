import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInclude: ['**/*.json'],
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        about: './pages/about.html',
        blog: './pages/blog.html',
        blogPost: './pages/blog/post.html',
        membership: './pages/membership.html',
        services: './pages/services.html',
        team: './pages/team.html'
      }
    }
  }
}) 