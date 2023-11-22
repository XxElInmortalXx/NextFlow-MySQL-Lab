import Comments from "@/components/Comments"
import FormComment from "@/components/FormComment"

function BlogDetailPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold">Post One</h1>
      <p>Write by: Jhon123</p>
      <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel numquam inventore cum consequuntur reiciendis expedita commodi fugiat magnam distinctio neque!</p>

      <Comments />
      <FormComment />
    </section>
  )
}

export default BlogDetailPage