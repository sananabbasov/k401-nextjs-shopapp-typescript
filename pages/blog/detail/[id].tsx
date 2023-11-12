import { useRouter } from 'next/router'
import React from 'react'

function Pages() {
    const router = useRouter()
  return (
    <>
    {router.query.id}
    <div>Pages</div>
    </>
  )
}

export default Pages