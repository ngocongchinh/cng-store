import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoadMoreButton from './LoadMoreButton'

describe('LoadMoreButton', () => {
  it('should not render when hasMore is false', () => {
    const { container } = render(
      <LoadMoreButton onClick={vi.fn()} hasMore={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should render when hasMore is true', () => {
    render(<LoadMoreButton onClick={vi.fn()} hasMore={true} />)
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LoadMoreButton onClick={onClick} hasMore={true} />)

    const button = screen.getByRole('button', { name: /load more/i })
    await user.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should show loading state', () => {
    render(<LoadMoreButton onClick={vi.fn()} hasMore={true} loading={true} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should be enabled when not loading', () => {
    render(<LoadMoreButton onClick={vi.fn()} hasMore={true} loading={false} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
