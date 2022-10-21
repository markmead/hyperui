import { Category } from '@/interface/category'
import { ComponentCard } from '@/interface/component'
import {
  getCategoryBySlug,
  getCategorySlugs,
  getComponentsByCategory,
} from '@/lib/getComponents'

type Props = {
  componentsByCategory: Array<CategoryProps>
}

type CategoryProps = {
  categoryDetail: Category
  categoryComponents: Array<ComponentCard>
}

function Info({ componentsByCategory }: Props) {
  let allCategoriesComponentCount = 0

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12">
      <article className="prose mx-auto prose-img:w-full prose-img:rounded-lg">
        <h1>HyperUI Info</h1>

        <p>
          Created by{' '}
          <a
            href="https://twitter.com/itsmarkmead"
            target="_blank"
            rel="noreferrer"
          >
            Mark Mead
          </a>
          .
        </p>

        <p>
          It started out as a Vue JS SPA and on the 12th Nov 2021 it was rebuilt
          with Next JS. Before the rebuild to Next JS, it was a paid product
          that required users to purchase a license through Gumroad.
        </p>

        <p>
          It launched in 2021 with around 80 components, but now it has... 🥁
        </p>

        <table>
          <thead>
            <tr>
              <th>Category</th>

              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            {componentsByCategory.map(
              ({ categoryDetail, categoryComponents }: CategoryProps) => {
                const categoryComponentCount = categoryComponents
                  .map((categoryData) => categoryData.count)
                  .reduce((valueA, valueB) => valueA + valueB, 0)

                allCategoriesComponentCount += categoryComponentCount

                return (
                  <tr key={categoryDetail.title}>
                    <td>{categoryDetail.title}</td>
                    <td>{categoryComponentCount}</td>
                  </tr>
                )
              }
            )}
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td>{allCategoriesComponentCount}</td>
            </tr>
          </tfoot>
        </table>

        <p>
          Alongside HyperUI, I will often use these Tailwind CSS component
          libraries.
        </p>

        <ul>
          <li>
            <a href="https://tailwindui.com/" target="_blank" rel="noreferrer">
              tailwindui.com
            </a>
          </li>

          <li>
            <a href="https://flowbite.com/" target="_blank" rel="noreferrer">
              flowbite.com
            </a>
          </li>

          <li>
            <a href="https://mynaui.com/" target="_blank" rel="noreferrer">
              mynaui.com
            </a>
          </li>
        </ul>
      </article>
    </div>
  )
}

export async function getStaticProps() {
  const categorySlugs = getCategorySlugs()

  const componentsByCategory = categorySlugs
    .map((categorySlug) => {
      const categoryDetail = getCategoryBySlug(`${categorySlug}`, ['title'])

      const categoryComponents = getComponentsByCategory(`${categorySlug}`, [
        'title',
        'count',
        'category',
      ])

      return {
        categoryDetail,
        categoryComponents,
      }
    })
    .reverse()

  return {
    props: {
      componentsByCategory,
    },
  }
}

export default Info
