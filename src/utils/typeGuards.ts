// src/utils/typeGuards.ts

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ApiResponse } from '@/types'; // Assuming your ApiResponse type is here

/**
 * Type guard to check if an error is a FetchBaseQueryError from RTK Query.
 * This is useful for handling API-specific errors.
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type guard to check if an error is a standard Error object or an object with a 'message' property.
 * This covers general JavaScript errors.
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

/**
 * Extracts a user-friendly error message from various error types.
 * Prioritizes backend messages from ApiResponse, then RTK Query status, then generic Error messages.
 */
export function getErrorMessage(err: unknown): string {
  let errorMessage = 'An unexpected error occurred.';

  if (isFetchBaseQueryError(err)) {
    // This is an RTK Query error from the API call
    const apiError = err;
    if (apiError.data && typeof apiError.data === 'object' && apiError.data !== null) {
      const backendError = apiError.data as ApiResponse; // Cast to your ApiResponse type
      errorMessage = backendError.message || backendError.error || `API Error: ${apiError.status}`;
    } else {
      // Fallback for cases where data might not be a structured object
      errorMessage = `API Error: ${apiError.status}`;
    }
  } else if (isErrorWithMessage(err)) {
    // This is a standard JavaScript Error with a message property
    errorMessage = err.message;
  }
  return errorMessage;
}
