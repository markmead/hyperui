import { Fragment } from 'react'

export default function DescriptionList({ listItems }) {
  return (
    <dl className="grid grid-cols-[80px_1fr] *:m-0">
      {listItems.map(({ label, value }, itemIndex) => (
        <Fragment key={itemIndex}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
