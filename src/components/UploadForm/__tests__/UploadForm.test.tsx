import React from 'react';
import { render } from '@testing-library/react-native';
import { UploadForm } from '../UploadForm';
import { useUploadForm } from '../hooks/useUploadForm';

// Mock the hook
jest.mock('../hooks/useUploadForm');

describe('UploadForm', () => {
  // Helper to create a mock implementation for different states
  const setupMockHook = (overrides = {}) => {
    const mockHook = {
      image: null,
      pickImage: jest.fn(),
      error: null,
      isUploading: false,
      handleUpload: jest.fn(),
      ...overrides
    };
    
    (useUploadForm as jest.Mock).mockReturnValue(mockHook);
    return mockHook;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in initial state', () => {
    setupMockHook();
    const { toJSON } = render(<UploadForm />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with selected image', () => {
    setupMockHook({
      image: 'data:image/jpeg;base64,mockImageData'
    });
    const { toJSON } = render(<UploadForm />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    setupMockHook({
      error: 'Something went wrong'
    });
    const { toJSON } = render(<UploadForm />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly while uploading', () => {
    setupMockHook({
      image: 'data:image/jpeg;base64,mockImageData',
      isUploading: true
    });
    const { toJSON } = render(<UploadForm />);
    expect(toJSON()).toMatchSnapshot();
  });
});