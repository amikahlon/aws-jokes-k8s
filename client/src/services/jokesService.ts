export type JokeResponse = {
  success: boolean
  joke: string
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export async function getJoke(): Promise<JokeResponse> {
  const response = await fetch(`${API_BASE}/api/jokes`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data = (await response.json()) as JokeResponse
  return data
}
