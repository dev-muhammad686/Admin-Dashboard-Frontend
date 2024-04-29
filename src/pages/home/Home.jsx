import React from 'react'
import './home.scss'
import SideBar from '../../components/sidebar/SideBar'
import NavBar from '../../components/navbar/NavBar'
import Widgets from '../../components/widget/Widgets'

const Home = () => {
  return (
    <div className='home'>
      <SideBar/>
      <div className='homeContainer'>

        <NavBar/>
        <div className='widgets'>
          <Widgets type='students' color='#D8F1FF'/>
          <Widgets type='tutors' color='#FBFFE0'/>
          <Widgets type='sales' color='#EEF6FF'/>
          <Widgets type='sessions' color='#FFD9D9'/>
        </div>

      </div>
    </div>
  )
}

export default Home