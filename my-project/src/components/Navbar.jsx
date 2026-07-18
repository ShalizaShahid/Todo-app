import React from 'react'

function Navbar(props) {
  return (
    <>
      <nav className="flex justify-between bg-violet-950 w-full h-16 text-white py-4">

        <div className="logo">
          <span className="font-bold italic mx-8 cursor-pointer text-lg">iTask
          </span>
        </div>

      </nav>

    </>
  )
}

export default Navbar
