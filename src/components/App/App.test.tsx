import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest' 
import App from './App'

describe('App', () => {
  it('Renders headline', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
 
  });

  it('Renders theme button', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /toggle theme/i })

    expect(button).toBeVisible()
    expect(button).toBeEnabled()
  });
}); 