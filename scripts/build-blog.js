const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const postsDirectory = path.join(process.cwd(), 'pages/blog/posts');
const outputDirectory = path.join(process.cwd(), 'public/blog');
const templatePath = path.join(process.cwd(), 'pages/blog/templates/post-template.html');

function buildBlog() {
    console.log('Starting blog build...');
    console.log('Posts directory:', postsDirectory);
    console.log('Output directory:', outputDirectory);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
        console.log('Creating output directory...');
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // Read the template
    const template = fs.readFileSync(templatePath, 'utf8');

    // List all files in posts directory
    const files = fs.readdirSync(postsDirectory);
    console.log('Found files:', files);

    // Read all markdown files
    const posts = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            console.log('Processing file:', file);
            const fullPath = path.join(postsDirectory, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            
            return {
                ...data,
                slug: file.replace('.md', ''),
                content: marked(content)
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('Processed posts:', posts.length);

    // Write index.json
    const indexPath = path.join(outputDirectory, 'index.json');
    fs.writeFileSync(
        indexPath,
        JSON.stringify(posts.map(({ content, ...post }) => post), null, 2)
    );
    console.log('Written index.json to:', indexPath);

    // Write individual post JSON files and HTML files
    posts.forEach(post => {
        // Write JSON
        const postPath = path.join(outputDirectory, `${post.slug}.json`);
        fs.writeFileSync(postPath, JSON.stringify(post, null, 2));
        console.log('Written post file:', postPath);

        // Generate HTML
        let html = template;
        Object.keys(post).forEach(key => {
            let value = post[key];
            html = html.replace(new RegExp(`\\\${${key}}`, 'g'), value);
        });

        // Handle share URL encoding separately
        html = html.replace(/\${encodeURIComponent\(title\)}/g, encodeURIComponent(post.title));
        html = html.replace(/\${encodeURIComponent\(window\.location\.href\)}/g, encodeURIComponent(`https://cornerstonechiropractic.com/blog/posts/${post.slug}`));

        // Write HTML file
        const htmlPath = path.join(postsDirectory, `${post.slug}.html`);
        fs.writeFileSync(htmlPath, html);
        console.log('Written HTML file:', htmlPath);
    });

    console.log('Blog built successfully!');
    console.log(`Generated ${posts.length} posts`);
}

buildBlog(); 