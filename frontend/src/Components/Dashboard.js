import React from 'react'
import TopNav from './TopNav'
import '../css/dashboard.css'
import DashboardInner from './DashboardInner'
import BottomNav from './BottomNav'

function Dashboard() {
  return (
    <div className='dashboard'>
        <TopNav/>
        <DashboardInner/>
        <BottomNav/>
    </div>
  )
}

export default Dashboard