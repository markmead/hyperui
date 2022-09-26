import { FunctionComponent, useEffect, useState } from 'react'

const Search: FunctionComponent = () => {
  let [results, setResults] = useState<any>([])

  return (
    <>
      <div>
        <form role="search">
          <input type="text" />
          <button>Submit</button>
        </form>

        {results && (
          <div>
            <ul>
              {results.map((result: any) => (
                <li>
                  <a href="">{result}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
