import React, { CSSProperties } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedElementState } from '../state'
import { ElementDetails } from './ElementDetails'


const sidebarStyle: CSSProperties = {
  position: 'absolute',
  backgroundColor: '#004452',
  color: 'white',
  right: 0,
  top: 0,
  paddingLeft: '12px',
  paddingBottom: '12px',
  height: '100%',
  width: '338px',
}

export const Sidebar = () => {
  const elementId = useRecoilValue(selectedElementState)
  return (
    <div
      style={sidebarStyle}
    >
      {elementId ? <ElementDetails elementId={elementId} /> : <h4>Select an element by clicking it</h4>}
    </div>
  )
}
