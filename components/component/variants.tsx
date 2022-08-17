import { FunctionComponent } from 'react'
import { Component } from '../../interface/component'

import styles from '../../styles/button.module.css'

type Props = {
  variants: Array<Component>
  handleReset: CallableFunction
  handleFetch: CallableFunction
}

const Variants: FunctionComponent<Props> = ({
  variants,
  handleReset,
  handleFetch,
}) => {
  return (
    <>
      {variants.length > 0 && (
        <div className="flex gap-4">
          <button className={styles.pill} onClick={() => handleReset()}>
            <span className="text-xs font-medium">Base</span>
          </button>

          {variants.map((variant) => (
            <button
              className={styles.pill}
              onClick={() => handleFetch(variant.id)}
              key={variant.id}
            >
              <span className="text-xs font-medium">{variant.title}</span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export default Variants
