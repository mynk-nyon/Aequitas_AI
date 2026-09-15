import { render, screen, fireEvent } from '@testing-library/react';
import DashboardView from '../DashboardView';

jest.mock('isomorphic-dompurify', () => ({
  sanitize: (str: string) => str,
}));

jest.mock('@/server/actions', () => ({
  simplifyText: jest.fn(),
  analyzeRisks: jest.fn(),
  compareDocuments: jest.fn(),
  generatePrepSheet: jest.fn(),
  askQuestion: jest.fn(),
}));

describe('DashboardView UI', () => {
  it('handles tab switching and preset loading', () => {
    render(<DashboardView />);
    
    // Check initial state (Input Document tab)
    expect(screen.getByText('Provide Legal Document')).toBeInTheDocument();
    
    // Load a preset
    const presetButton = screen.getByRole('button', { name: /Preset A: Lease/i });
    fireEvent.click(presetButton);
    
    const textarea = screen.getByLabelText(/Main Document/i);
    expect((textarea as HTMLTextAreaElement).value).toContain('The lease shall automatically renew');
    
    // Switch to another tab (e.g. Risk Analyzer)
    const analyzerTab = screen.getByRole('tab', { name: /Risk Analyzer/i });
    fireEvent.click(analyzerTab);
    
    // Expect AnalyzerView to be visible
    expect(screen.getByText('Clause Risk & Obligation Matrix')).toBeInTheDocument();
  });
});
