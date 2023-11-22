import { posts } from "@/data/posts"
import Link from "next/link"

function BlogsPage() {
  return (
    <section className="max-w-4xl mx-auto py-8 w-[90%]">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {
          posts.map((post => (
            <Link
              key={post.id}
              href={`/blogs/${post.id}`}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>Write bt: {post.username}</p>
            </Link>
          )))
        }
      </div>
    </section>
  )
}

export default BlogsPage