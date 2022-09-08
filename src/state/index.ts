import { atom, atomFamily, selectorFamily } from 'recoil'

export interface Element {
  id: string
  position: [number, number],
  color: string
}

export const elementListState = atom<string[]>({
  key: 'ElementList',
  default: [],
})

export const selectedElementState = atom<string | null>({
  key: 'SelectedElement',
  default: null,
})

export const elementPositionStateFamily = atomFamily<[number, number], string>({
  key: 'ElementPosition',
  default: [15, 75],
})

export const elementColorStateFamily = atomFamily<string, string>({
  key: 'ElementColor',
  default: '#ff0000',
})

// with this selector we can get and set all properties of element at once
export const elementStateSelectorFamily = selectorFamily<Element, string>({
  key: 'ElementState',
  get: (id) => async ({ get }) => ({
    id,
    position: get(elementPositionStateFamily(id)),
    color: get(elementColorStateFamily(id)),
  }),
  set: (id) => ({ set }, newValue) => {
    const newElement = newValue as Element
    set(elementPositionStateFamily(id), newElement.position)
    set(elementColorStateFamily(id), newElement.color)
  },
})


