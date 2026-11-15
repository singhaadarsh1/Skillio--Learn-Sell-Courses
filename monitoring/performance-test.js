
import http from 'k6/http';
import { check, sleep } from 'k6';

// Benchmark configuration
export const options = {
  vus: 75,             // Simulate 75 virtual users
  duration: '30s',    // Run test for 30 seconds

  thresholds: {
    http_req_failed: ['rate<0.01'],  // Less than 1% failures
    http_req_duration: ['p(95)<500'], // 95% requests under 500ms
  },
};

// API test
export default function () {
  const response = http.get(
    'http://localhost:3001/api/v1/course/preview'
  );

  check(response, {
    'API status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
