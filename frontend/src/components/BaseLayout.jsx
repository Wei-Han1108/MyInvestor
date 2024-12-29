import React from 'react'
import Header from './Header'
import MySidebar from './MySidebar'
import MyFooter from './MyFooter'
const BaseLayout = ({children}) => {
  return (
    <div >
    <Header className="w-full"/>
    <div className="pt-12">
        <div className="flex p-4">
        <MySidebar className="flex-1 p-4"/>
        <main className="flex-1">
            {children}
        </main>
        </div>
    </div>
    <MyFooter className="w-full" />
    </div>
  )
}

export default BaseLayout
