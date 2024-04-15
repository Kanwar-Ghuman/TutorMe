export default async function PostsPage() {
    const res = await fetch('http://localhost:3000/api/posts');
    // const { posts } = await res.json();
    console.log(res)
    return (
        <div>
            {/* <h1>All Posts</h1>
            <hr style={{ width: '220px' }} />
            <div style={{ paddingTop: '40px' }}>
                {posts.map(post => (
                    <article key={post.id}>
                        <h2>{post.title}</h2>
                        <p style={{ paddingBottom: '30px' }}>{post.body}</p>
                    </article>
                ))}
            </div> */}
        </div>
    );
}