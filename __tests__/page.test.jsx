/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from 'src/app/page.tsx'

describe('Home', () => {
  it('verifica se existe oi no texto', () => {
    render(<Home />)

    const messageError = screen.getByRole('texto')

    expect(messageError.textContent).toBe('Teste')
  })
})
