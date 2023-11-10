import React from 'react'

type Props = {}

const footer = (props: Props) => {
  return (
   <footer>
    <p>
      &copy; {new Date().getFullYear()} DevConnector
    </p>
   
   </footer>
  )
}

export default footer