export async function fetchMoodData(mood) {
  const response = await fetch('/api/generateMood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood }),
  });

  return await response.json();
}
