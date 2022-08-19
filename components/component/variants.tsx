import { FunctionComponent, useEffect, useState } from 'react'
import { Component } from '../../interface/component'

type Props = {
  variants: Array<Component> | []
  handleSetVariant: CallableFunction
  handleSetThemed: CallableFunction
}

type Variant = {
  id: string
  title: string
}

const Variants: FunctionComponent<Props> = ({
  variants,
  handleSetVariant,
  handleSetThemed,
}) => {
  let [variant, setVariant] = useState<string>('base')

  useEffect(() => {
    handleSetVariant(variant)

    let variantsObjects = variants.map((variant) => {
      return {
        id: variant.id,
        title: variant.title,
      }
    })

    let activeVariant: Variant = variantsObjects.filter(
      ({ id }) => id === variant
    )[0]

    if (!activeVariant) {
      handleSetThemed(false)

      return
    }

    handleSetThemed(activeVariant.title.includes('Dark'))
  }, [variant])

  return (
    <>
      {variants.length > 0 && (
        <>
          <label htmlFor="VariantSelect" className="sr-only">
            Variants
          </label>

          <select
            onChange={(e) => setVariant(e.currentTarget.value)}
            className="pl-3 h-9 border-2 border-black rounded-lg text-xs font-medium"
            id="VariantSelect"
          >
            <option value="base">Base</option>

            {variants.map((variant) => (
              <option value={variant.id} key={variant.id}>
                {variant.title}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  )
}

export default Variants
