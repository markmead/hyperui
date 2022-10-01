import { ComponentVariant } from '@/interface/component'
import { useEffect, useState } from 'react'

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
    <div>
      <label htmlFor="VariantSelect" className="sr-only">
        Variants
      </label>

      <select
        onChange={(e) => setSelectedVariant(e.currentTarget.value)}
        id={`VariantSelect${componentId}`}
        className="h-9 w-full rounded-lg border-2 border-black pl-3 text-xs font-medium"
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
