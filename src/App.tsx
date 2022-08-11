import { Whiteboard } from './components/Whiteboard'
import { Sidebar } from './components/Sidebar'
import { useRecoilCallback } from 'recoil'
import { Element, elementListState, elementStateSelectorFamily } from './state'
import { useEffect } from 'react'

const getElementsFromDb = async () => {
  //wait to simulate async fetching
  return JSON.parse(localStorage.getItem('elements') || '[]')
}

const saveElementsToDb = async (savedElements: Element[]) => {
  //wait to simulate async fetching
  await new Promise(resolve => setTimeout(resolve, 1000))
  localStorage.setItem('elements', JSON.stringify(savedElements))
}

export const App = () => {
  const saveElements = useRecoilCallback(({ snapshot }) => async () => {
    const elementIds = await snapshot.getPromise(elementListState)
    const elements = await Promise.all(elementIds.map(id => snapshot.getPromise(elementStateSelectorFamily(id))))
    saveElementsToDb(elements)
  }, [])

  const fetchElements = useRecoilCallback(({ set }) => async () => {
    const elements = await getElementsFromDb()
    set(elementListState, elements.map((el: Element) => el.id))
    elements.forEach((el: Element) => set(elementStateSelectorFamily(el.id), el))
    saveElementsToDb(elements)
  }, [])

  //get the state from database when the app is loaded
  useEffect(() => {
    fetchElements()
  }, [fetchElements])

  //save the state to database once in every 5 seconds
  useEffect(() => {
    setInterval(() => {
      saveElements()
    }, 5000)
  }, [saveElements])



  return (
    <>
      <Whiteboard />
      <Sidebar />
    </>
  )
}
