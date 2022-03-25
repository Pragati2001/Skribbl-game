import React from 'react'
import '../styles/start_btn.scss';
import Next_Page from './Next_Page';
export default function Start_btn() {
    function next_one()
    {
        console.log("clicked");
        // <Next_Page />
    }
  return (
    <div className='start_btn'>
        <button className='btn third' onClick={()=>{next_one()}}><span className='start_wrd'>Start</span></button>
    </div>
  )
}
