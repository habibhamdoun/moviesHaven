import React from 'react'
import { baseUrl } from '../Constants'

const latest = () => {
  return (
    <div>latest</div>
  )
}

export default latest

export const getServerSideProps = async () => {
    console.log(process.env.NEXT_PUBLIC_API_KEY)
    const resp = await fetch(`${baseUrl}/movies/latest?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    // then(res => res.json()).then(data =>console.log(data))
    const dataToReturn = await resp.json(); 
    return {
        props: {
            data: dataToReturn
        }
    }
} 