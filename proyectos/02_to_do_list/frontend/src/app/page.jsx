import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="mt-8 mb-4 space-y-2">
        <h1 className="text-center text-4xl font-black">To Do List</h1>
        <p className="text-center text-xl font-medium text-gray-500">With this app you can view your tasks</p>
      </header>
      <Link
        href='/login'
        className="block mx-auto w-[90%] max-w-xs font-medium text-white bg-sky-500 rounded-md py-1 px-4 text-center"
      >
        Get started
      </Link>
    </main>
  )
}
