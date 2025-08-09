import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AdminSettingsRequestStatus from '../components/AdminSettings/AdminSettingsRequestStatus';
import { useUserManagementFile } from '../hooks/useUserManagementFile';

// Mock the custom hook to control its return values
vi.mock('@/hooks/useUserManagementFile', () => ({
  useUserManagementFile: vi.fn(),
}));

describe('AdminSettingsRequestStatus', () => {
  const mockDismiss = vi.fn();
  const mockRefresh = vi.fn();
  const mockClear = vi.fn();
  const mockOnUpload = vi.fn();

  const baseHookReturn = {
    loadingRequests: false,
    uploadResult: null,
    onUpload: mockOnUpload,
    requests: [
      {
        messageId: 1,
        fileName: 'file1.csv',
        status: 'success',
        message: 'Test message',
        requestor: 'Tester',
        requestTime: '2025-01-01T00:00:00Z',
      },
      {
        messageId: 2,
        fileName: 'file2.csv',
        status: 'fail',
        message: 'Another message',
        requestor: 'Tester2',
        requestTime: '2025-01-02T00:00:00Z',
      },
    ],
    dismissMessage: mockDismiss,
    refreshMessages: mockRefresh,
    clearUploadResult: mockClear,
    progresses: {},
    isUploading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error mock
    useUserManagementFile.mockReturnValue(baseHookReturn);
  });

  it('renders request rows and dismiss button works', async () => {
    render(<AdminSettingsRequestStatus />);

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText('fail')).toBeInTheDocument();

    const triggers = screen.getAllByTestId(/dismiss-/);
    expect(triggers).toHaveLength(2);

    await userEvent.click(triggers[0]);
    // select Dismiss
    const dismissOption = await screen.findByText('Dismiss');
    await userEvent.click(dismissOption);
    expect(mockDismiss).toHaveBeenCalledWith(1);
  });

  it('shows loader when loadingRequests is true', () => {
    // @ts-expect-error mock
    useUserManagementFile.mockReturnValue({
      ...baseHookReturn,
      loadingRequests: true,
    });

    const { container } = render(<AdminSettingsRequestStatus />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows no requests message when requests array is empty', () => {
    // @ts-expect-error mock
    useUserManagementFile.mockReturnValue({
      ...baseHookReturn,
      requests: [],
    });

    render(<AdminSettingsRequestStatus />);
    expect(screen.getByText(/No requests submitted/i)).toBeInTheDocument();
  });
});
