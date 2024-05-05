import React from 'react'
import { SandboxEditorsWindow, SandboxOutputWindow } from '../components'

function Sandbox() {
  return (
    <div className='h-[calc(100vh-70px)]'>
        <SandboxEditorsWindow/>
        <SandboxOutputWindow/>
    </div>
  )
}

export default Sandbox