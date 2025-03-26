class BlogLoader {
    constructor() {
        this.postsDirectory = '/api/blog/posts';
        this.posts = [];
        console.log('BlogLoader initialized with directory:', this.postsDirectory);
    }

    async loadPosts() {
        try {
            const url = `${this.postsDirectory}/index.json?t=${Date.now()}`;
            console.log('Attempting to fetch from:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to load posts: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            this.posts = data.posts;
            return this.posts;
        } catch (error) {
            console.error('Error loading blog posts:', error);
            return [];
        }
    }

    async loadPost(slug) {
        try {
            const response = await fetch(`${this.postsDirectory}/${slug}.json`);
            if (!response.ok) throw new Error('Failed to load post');
            return await response.json();
        } catch (error) {
            console.error('Error loading blog post:', error);
            return null;
        }
    }

    renderPostsList(posts, container) {
        console.log('Rendering posts:', posts);
        if (!posts || !posts.length) {
            console.log('No posts to render');
            container.innerHTML = `
                <div class="col-12 text-center">
                    <p class="body-large">No posts found.</p>
                </div>
            `;
            return;
        }

        try {
            const html = posts.map(post => `
                <div class="col-md-6 col-lg-4">
                    <div class="blog-card">
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <h3 class="heading-3">${post.title}</h3>
                            <p class="body-default">${post.excerpt}</p>
                            <a href="/post/${post.id}" class="btn secondary-combo">Read More</a>
                        </div>
                    </div>
                </div>
            `).join('');
            container.innerHTML = html;
        } catch (error) {
            console.error('Error rendering posts:', error);
            this.showError(container, 'Error rendering posts');
        }
    }

    showLoading(container) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="body-large">Loading posts...</p>
            </div>
        `;
    }

    showError(container, message) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="body-large text-danger">${message}</p>
            </div>
        `;
    }
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded - Initializing blog');
    const blogLoader = new BlogLoader();
    const postsContainer = document.querySelector('.blog-grid .row');
    
    if (postsContainer) {
        console.log('Found posts container');
        blogLoader.showLoading(postsContainer);
        try {
            const posts = await blogLoader.loadPosts();
            console.log('Posts loaded:', posts);
            blogLoader.renderPostsList(posts, postsContainer);

            // Handle Load More button
            const loadMoreBtn = document.querySelector('.load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    // Implement pagination logic here
                    console.log('Load more clicked');
                });
            }
        } catch (error) {
            console.error('Error in main blog initialization:', error);
            blogLoader.showError(postsContainer, 'Failed to load blog posts. Please try again later.');
        }
    } else {
        console.log('Posts container not found');
    }

    // Handle individual post pages
    const postContent = document.querySelector('.blog-post');
    if (postContent) {
        const slug = window.location.pathname.split('/').pop();
        const post = await blogLoader.loadPost(slug);
        if (post) {
            document.title = `${post.title} - Origins Wellness Center`;
            postContent.querySelector('.heading-1').textContent = post.title;
            // ... populate other post content
        }
    }
}); 