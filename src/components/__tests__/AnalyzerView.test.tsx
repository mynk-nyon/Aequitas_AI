import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AnalyzerView from '../AnalyzerView';
import { analyzeRisks } from '@/server/actions';

jest.mock('@/server/actions', () => ({
  analyzeRisks: jest.fn(),
}));

describe('AnalyzerView', () => {
  it('renders correctly and handles analyze action', async () => {
    (analyzeRisks as jest.Mock).mockResolvedValueOnce({
      findings: [
        {
          clause: 'Risk clause.',
          explanation: 'This is a risk.',
          severity: 'HIGH',
          category: 'Indemnification'
        }
      ]
    });

    render(<AnalyzerView content="Sample risk content" />);

    const button = screen.getByRole('button', { name: /Audit Risks/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Risk clause.')).toBeInTheDocument();
      expect(screen.getByText('This is a risk.')).toBeInTheDocument();
      expect(screen.getByText('HIGH RISK')).toBeInTheDocument();
    });
  });
});
