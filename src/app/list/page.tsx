import React from 'react'
import ListPage from './ListPageComponent'
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: "/assets/pic.jpg",
  },
  title: "List",
  description: "This is list page shop",
  keywords: ['shop', 'ecommerce', 'sell']
};

const page = () => {
  return (
    <div>
      <ListPage/>
    </div>
  )
}

export default page
