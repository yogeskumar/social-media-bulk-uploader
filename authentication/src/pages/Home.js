import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div>Home</div>
      <Link to='/youtubeauth'> YoutubeAuth </Link>
      <Link to='/instagramauth'> InstagramAuth </Link>
      <Link to='/tiktokauth'> TikTokAuth </Link>
    </div>
  )
}

export default Home