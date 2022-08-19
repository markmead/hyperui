import { FunctionComponent } from 'react'
import { Component } from '../../interface/component'

type Props = {
  variants: Array<Component> | []
  handleSetVariant: CallableFunction
}

const Variants: FunctionComponent<Props> = ({ variants, handleSetVariant }) => {
  return (
    <>
      {variants.length > 0 && (
        <>
          <label htmlFor="VariantSelect" className="sr-only">
            Variants
          </label>

          <select
            onChange={(e) => handleSetVariant(e.currentTarget.value)}
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
