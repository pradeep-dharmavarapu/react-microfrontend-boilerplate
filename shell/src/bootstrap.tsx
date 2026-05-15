// This file is the REAL entry point.
// Importing App via dynamic import fixes the
// "Shared module is not available for eager consumption" error.
// Module Federation needs an async boundary at the top level.
import('./App');
