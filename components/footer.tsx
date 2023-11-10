import Link from 'next/link'
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

type Props = {}

const footer = (props: Props) => {
  return (
<footer className="footer items-center p-4 bg-neutral text-neutral-content">
  <aside className="items-center grid-flow-col">
  <div className="flex items-center text-center gap-6 w-full mb-2">
        <h2 className="text-4xl font-bold mb-2">
          <span className="text-blue-500">W</span>
          <span className="text-red-500">a</span>
          <span className="text-green-500">l</span>
          <span className="text-yellow-500">l</span>
          <span className="text-purple-500">p</span>
          <span className="text-pink-500">y</span>
          <span className="text-orange-500">.</span>
        </h2>
        
      </div>
    <p>Copyright © 2023 - design and develop by <Link href="https://github.com/git-create-devben">DEV⚡BEN</Link></p>
  </aside> 
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <Link href="https://github.com/git-create-devben">
      <FaGithub className="h-8 w-8 text-white" />
    </Link>
    <Link href="https://x.com/benlad_1">
        <FaXTwitter className="h-8 w-8 text-white" />
    </Link>
    <Link href="https://www.threads.net/@devben.tech">
        <FaThreads className="h-8 w-8 text-white" />

    </Link>
  </nav>
</footer>
  )
}

export default footer