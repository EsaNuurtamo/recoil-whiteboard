import { Whiteboard } from './components/Whiteboard'
import { Sidebar } from './components/Sidebar'
import { useRecoilCallback } from 'recoil'
import { Element, elementListState, elementPositionStateFamily, elementStateSelectorFamily } from './state'
import { useEffect } from 'react'

let elementsDb: Element[] = [
  {id: 'test1', position: [100, 300], color: '#fcba03'},
  {id: 'test2', position: [75, 100], color: '#03fc14'},
  {id: 'test3', position: [200, 220], color: '#fc03b5'}, 
]

const getElementsFromDb = async () => {
  //wait to simulate async fetching
  await new Promise(resolve => setTimeout(resolve, 1000))
  return elementsDb
}

const saveElementsToDb = async (savedElements: Element[]) => {
  //wait to simulate async fetching
  await new Promise(resolve => setTimeout(resolve, 1000))
  elementsDb = savedElements
}

export const App = () => {
  const saveElements = useRecoilCallback(({snapshot}) => async () => {
    const elementIds = await snapshot.getPromise(elementListState)
    const elements = await Promise.all(elementIds.map(id => snapshot.getPromise(elementStateSelectorFamily(id))))
    saveElementsToDb(elements)
  }, [])

  const fetchElements = useRecoilCallback(({snapshot, set}) => async () => {
    const elements = await getElementsFromDb()
    set(elementListState, elements.map(el=>el.id))
    elements.forEach(el => set(elementStateSelectorFamily(el.id), el)) 
    saveElementsToDb(elements)
  }, [])

  //get the state from database when the app is loaded
  useEffect(() => {
    fetchElements()
  }, [fetchElements])

  //save the state to database once in every 5 seconds
  useEffect(() => {
    setTimeout(() => {
      saveElements()
    }, 5000)
  }, [saveElements])

  

  return (
    <>
      <Whiteboard/>
      <Sidebar/>
    </>
  )
}