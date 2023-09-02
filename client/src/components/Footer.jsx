import React from 'react'

const Footer = () => {
  return (
    <footer className="w-100 text-center p-2 text-light" style={{ backgroundColor:"#613D2B" }}>&copy; {new Date().getFullYear()}. <a href="/" className="text-decoration-none text-light">WaysBeans</a>. Best quality coffee beans.</footer>
  )
}

export default Footer