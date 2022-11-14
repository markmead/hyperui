import '@testing-library/jest-dom'
import { menuLinks } from '../../src/utils/menuLinks'

describe('Menu Links', () => {
  it('Adds a heading correctly', () => {
    menuLinks.push({
      title: 'Test',
      href: '/test',
    })

    expect(menuLinks[menuLinks.length - 1].title).toBe('Test')
    expect(menuLinks[menuLinks.length - 1].href).toBe('/test')
  })
  it('Adds a Removes Heading Correctly', () => {
    const newMenu = menuLinks.filter((link) => link.title !== 'Blog')

    expect(newMenu.some((link) => link.title === 'Blog')).toBe(false)
  })
})
