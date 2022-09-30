import { FunctionComponent, useEffect, useState } from 'react'
import { Component } from '../interface/component'

type Props = {
  componentVariants: Array<Component> | []
  handleSetVariant: CallableFunction
  handleSetHasDarkMode: CallableFunction
  componentId: string
}

type Variant = {
  id: string
  title: string
}

const Variants: FunctionComponent<Props> = ({
  componentVariants,
  handleSetVariant,
  handleSetHasDarkMode,
  componentId,
}) => {
  let [variant, setVariant] = useState<string>('base')

  useEffect(() => {
    handleSetVariant(variant)

    let variantsObjects = componentVariants.map((variant) => {
      return {
        id: variant.id,
        title: variant.title,
      }
    })

    let activeVariant: Variant = variantsObjects.filter(
      ({ id }) => id === variant
    )[0]

    if (!activeVariant) {
      handleSetHasDarkMode(false)

      return
    }

    handleSetHasDarkMode(activeVariant.title.includes('Dark'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  return (
    <>
      <div>
        <label htmlFor="VariantSelect" className="sr-only">
          Variants
        </label>

        <select
          onChange={(e) => setVariant(e.currentTarget.value)}
          className="w-full pl-3 text-xs font-medium border-2 border-black rounded-lg h-9"
          id={`VariantSelect${componentId}`}
        >
          <option value="base">Base</option>

          {componentVariants.map((variant) => (
            <option value={variant.id} key={variant.id}>
              {variant.title}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Variants
