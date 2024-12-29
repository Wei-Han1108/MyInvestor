import React from 'react'
import { Footer } from "flowbite-react";
const MyFooter = () => {
  return (
    <div>
      <Footer container>
      <div className="w-full text-center">
        <Footer.Divider />
        <Footer.Copyright href="#" by="Flowbite™" year={2024} />
      </div>
    </Footer> 
    </div>
  )
}

export default MyFooter
