import { useCallback, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { elementListState, selectedElementState } from '../state'
import { Element } from './Element'
import { v4 as uuid } from 'uuid'

export const Whiteboard = () => {
  const [elements, setElements] = useRecoilState(elementListState)
  const setSelectedElement = useSetRecoilState(selectedElementState)

  const addElement = useCallback(() => {
    const id = uuid()
    setElements([...elements, id])
    setSelectedElement(id)
  }, [elements, setElements, setSelectedElement])

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
      <button 
        style={{ 
          position: 'absolute', 
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          margin: '15px',
          fontSize: '16px',
          cursor: 'pointer'
        }} 
        onClick={addElement}
      >
        Add new element
      </button>
      {elements.map((id) => (
        <Element key={id} elementId={id} />
      ))}
    </>
  )
}
