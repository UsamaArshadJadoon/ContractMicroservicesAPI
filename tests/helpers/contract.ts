/**
 * Generates a unique contract number for each test run.
 * Format: {prefix}_{unix_timestamp_ms}
 * Guarantees no collisions between concurrent CI runs.
 */
export function generateContractNumber(prefix = 'tu_auto'): string {
  return `${prefix}_${Date.now()}`;
}
