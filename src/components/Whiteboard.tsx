import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { elementListState } from '../state'
import { Element } from './Element'
import { v4 as uuid } from 'uuid'

export const Whiteboard = () => {
  const [elements, setElements] = useRecoilState(elementListState)

  const addElement = useCallback(() => {
    setElements([...elements, uuid()])
  }, [elements, setElements])

  useEffect(() => {
    function dragOver(event: DragEvent) {
      event.preventDefault()
      return false
    }
    document.body.addEventListener('dragover', dragOver, false)
    return () => document.body.removeEventListener('dragover', dragOver, false)
  }, [])

  return (
    <>
      <button style={{ position: 'absolute' }} onClick={addElement}>
        Add new element
      </button>
      {elements.map((id) => (
        <Element key={id} elementId={id} />
      ))}
    </>
  )
}
