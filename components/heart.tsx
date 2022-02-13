import { FunctionComponent, useEffect, useState } from 'react'

import styles from '../styles/button.module.css'

import { Collection } from '../interface/collection'

type Props = {
  collection: Collection
  id: number
}

const Heart: FunctionComponent<Props> = ({ collection, id }) => {
  let [save, setSave] = useState<boolean>(false)

  const saveToLocalStorage = (collection: string, id: number) => {
    let exampleName = `${collection}-${id}`
    let savedCollections = JSON.parse(
      localStorage.getItem('collections') || '[]'
    )

    let newSavedCollections = savedCollections.includes(exampleName)
      ? savedCollections.filter((item: string) => item !== exampleName)
      : [...savedCollections, exampleName]

    localStorage.setItem('collections', JSON.stringify(newSavedCollections))
  }

  let checkSaved = (collection: string, id: number) => {
    let exampleName = `${collection}-${id}`
    let savedCollections = JSON.parse(
      localStorage.getItem('collections') || '[]'
    )
    let isSave = savedCollections.includes(exampleName)

    setSave(isSave)
  }

  let handleClick = (collection: string, id: number) => {
    saveToLocalStorage(collection, id)
    checkSaved(collection, id)
  }

  useEffect(() => {
    checkSaved(collection.id, id)
  }, [])

  return (
    <>
      <button
        type="button"
        className={styles.pill}
        onClick={() => handleClick(collection.id, id)}
      >
        <span role="img" className="mr-1.5 text-sm">
          ❤️
        </span>

        <span className="text-xs font-medium">{save ? 'Saved' : 'Save'}</span>
      </button>
    </>
  )
}

export default Heart
