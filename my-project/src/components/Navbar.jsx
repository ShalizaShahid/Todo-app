import React from 'react'

function Navbar(props) {
  return (
    <>
      <nav className="flex justify-between bg-violet-950 w-full h-16 text-white py-4">

        <div className="logo">
          <span className="font-bold italic mx-8 cursor-pointer text-xl">iTask
          </span>
        </div>

        <ul className="flex gap-8 mx-18 cursor-pointer transition-all duration-1000">

          <li>{props.home}</li>
          <li>{props.tasks}</li>

        </ul>

      </nav>

    </>
  )
}

export default Navbar