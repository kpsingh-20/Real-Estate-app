import React from 'react'
import {Link} from 'react-router-dom'
// import {FAsearch} from 'react-icons/fa'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md '>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 

            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Real</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
            </Link>     

            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' 
                className='bg-transparent focus:outline-none w-24 sm:w-64'/>

                {/* <FAsearch className = "text-slate-600"></FAsearch> */}
            </form>

            <ul className='flex gap-4  text-slate-500 hover:underline'>
                <Link to='/'>
                    <li className='hidden sm:inline '>Home</li>
                </Link>
                
                <Link to='/about'>
                    <li className='hidden sm:inline'>About</li>
                </Link>

                <Link to='/sign-in'>
                    <li className=''>Sign in</li>
                </Link>
                
            </ul>


        </div>

    </header>
  )
}