import React, { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { elementColorStateFamily, elementPositionStateFamily } from '../state'
import InputColor from 'react-input-color'


export const ElementDetails = ({ elementId }: { elementId: string }) => {
  const [position, setPosition] = useRecoilState(
    elementPositionStateFamily(elementId)
  )
  const [color, setColor] = useRecoilState(elementColorStateFamily(elementId))

  const onSetPosition = useCallback((value: [number, number]) => {
    const maxX = window.innerWidth - 400
    const maxY = window.innerHeight - 50
    const x = Math.min(Math.max(0, value[0]), maxX)
    const y = Math.min(Math.max(0, value[1]), maxY)
    setPosition([x, y])
  }, [setPosition])

  return (
    <div>
      <h4>Element id</h4>
      <div>{elementId}</div>
      <h4>Position</h4>
      <input
        type="number"
        value={position[0]}
        onChange={(e) => onSetPosition([parseInt(e.target.value), position[1]])}
      />
      <input
        type="number"
        value={position[1]}
        onChange={(e) => onSetPosition([position[0], parseInt(e.target.value)])}
      />
      <h4>Color</h4>
      <InputColor initialValue={color} onChange={(val: any) => setColor(val.hex)}/>
    </div>
  )
}
