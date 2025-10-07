'use client'

import Navbar from '@/components/Navbar'

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='center'>
        <h1>Добро пожаловать</h1>
        <h3>Здесь собраны лучшие треки!</h3>
        <style jsx>
          {`
            .center {
              margin-top: 150px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          `}
        </style>
      </div>
    </>
  )
}
