import { useEffect, useState } from 'react'

import { ComponentVariant } from '@/interface/component'

type Props = {
  componentVariants: Array<ComponentVariant> | []
  handleSetVariant: CallableFunction
  handleSetHasDarkMode: CallableFunction
  componentId: string
}

type Variant = {
  id: string
  title: string
}

function PreviewVariants({
  componentVariants,
  handleSetVariant,
  handleSetHasDarkMode,
  componentId,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState<string>('base')

  useEffect(() => {
    handleSetVariant(selectedVariant)

    const variantsObjects = componentVariants.map(function (componentVariant) {
      return {
        id: componentVariant.id,
        title: componentVariant.title,
      }
    }) as Array<Variant>

    const activeVariant: Variant = variantsObjects.filter(function (
      variantObject: Variant
    ) {
      const { id: variantId } = variantObject

      return variantId === selectedVariant
    })[0]

    if (!activeVariant) {
      handleSetHasDarkMode(false)

      return
    }

    handleSetHasDarkMode(activeVariant.title.includes('Dark'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant])

  return (
    <div className="flex-1 lg:flex-auto">
      <label
        htmlFor={`VariantSelect${componentId}`}
        className="block text-xs font-medium text-gray-700"
      >
        Variants
      </label>

      <select
        onChange={(e) => setSelectedVariant(e.currentTarget.value)}
        id={`VariantSelect${componentId}`}
        className="mt-0.5 h-9 w-full rounded-lg border-2 border-black text-xs font-medium sm:w-44"
      >
        <option value="base">Base</option>

        {componentVariants.map((componentVariant: Variant) => (
          <option value={componentVariant.id} key={componentVariant.id}>
            {componentVariant.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PreviewVariants
