import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SimplifierView from '../SimplifierView';
import { simplifyText } from '@/server/actions';

jest.mock('@/server/actions', () => ({
  simplifyText: jest.fn(),
}));

describe('SimplifierView', () => {
  it('renders correctly and handles simplify action', async () => {
    (simplifyText as jest.Mock).mockResolvedValueOnce({
      clauses: [
        {
          original: 'Original complex text.',
          simplified: 'Simple text.',
          jargon: [{ term: 'complex', definition: 'hard to understand' }]
        }
      ]
    });

    render(<SimplifierView content="Sample document content" />);

    expect(screen.getByText('Plain-English Decoder')).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /Translate to Plain English/i });
    fireEvent.click(button);
    
    expect(button).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByText('Original complex text.')).toBeInTheDocument();
      expect(screen.getByText('Simple text.')).toBeInTheDocument();
      expect(screen.getByText('complex:')).toBeInTheDocument();
      expect(screen.getByText('hard to understand')).toBeInTheDocument();
    });
  });
});
