import { render, screen } from '@testing-library/react';
import LegalBanner from '../LegalBanner';

describe('LegalBanner', () => {
  it('renders with accessibility role alert', () => {
    render(<LegalBanner />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Disclaimer');
  });
});
