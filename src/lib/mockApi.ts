/**
 * Simulated API Utility
 *
 * This utility deliberately simulates network latency and occasionally throws
 * random errors to test the UI recovery states and loading boundaries.
 */

// Configure the failure rate (0.0 to 1.0)
const FAILURE_RATE = 0.0; // 0.3 = 30% chance of failure for testing
const MIN_LATENCY_MS = 500;
const MAX_LATENCY_MS = 1500;

class APIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function simulatedFetch<T>(
  data: T,
  shouldFail: boolean = Math.random() < FAILURE_RATE
): Promise<T> {
  // Simulate network latency
  const latency =
    Math.floor(Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS + 1)) + MIN_LATENCY_MS;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        // Deliberately throw an error
        const errors = [
          new APIError("Connection to the coffee inventory database timed out.", 504),
          new APIError("Failed to authenticate the current session.", 401),
          new APIError("Internal server error while processing the order request.", 500),
          new APIError("Rate limit exceeded. Please wait a moment and try again.", 429),
        ];

        const randomError = errors[Math.floor(Math.random() * errors.length)];
        reject(randomError);
      } else {
        // Success
        resolve(data);
      }
    }, latency);
  });
}
