import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest' // optional if globals: true
import App from './App'

describe('App', () => {
  it('Renders headline', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
 
  });
});
