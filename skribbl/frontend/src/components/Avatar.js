import React from 'react'
import '../styles/avatar.css';
import Avatar from '@material-ui/core/Avatar';
import img0 from '../assets/img0.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
export default function Avatar_Img() {
  return (
    <div className='avatar_grp'>
        <img className="avatar__style"
        src={img1}
        alt="img1"/>
        <img className="avatar__style"
        src={img0}
        alt="img1"/>
        <img className="avatar__style"
        src={img2}
        alt="img1"/>
    </div>
  )
}
