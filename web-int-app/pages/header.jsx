import React from 'react'
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';

const header = () => {
  return (
    <nav className="flex md:justify-center justify-between items-center py-4 mx-auto">
      <ConnectButton showBalance={false}/>
    </nav>
  )
}

export default header