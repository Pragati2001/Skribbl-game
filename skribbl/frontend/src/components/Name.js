import React from 'react'
import '../styles/name.scss'
export default function Name() {
  return (
    <div className='wrapper'>
        <div className='desc'>
            Enter your Name
            <input type="text" spellCheck="false" v-model="displayText" required
            ></input>
        </div>

    </div>
  )
}
