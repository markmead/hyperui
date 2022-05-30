import { FunctionComponent } from 'react'

type Props = {
  tags?: string[]
  card?: boolean
}

const Tags: FunctionComponent<Props> = ({ tags, card }) => {
  return (
    <div className={`flex gap-1.5 items-center ${card && '-mt-3 -mr-3'}`}>
      {tags &&
        tags.map((tag) => (
          <span
            className="text-[10px] text-white bg-black rounded py-1 px-3"
            key={tag}
          >
            {tag}
          </span>
        ))}
    </div>
  )
}

export default Tags
