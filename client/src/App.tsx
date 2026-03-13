import { useState } from 'react'
import './App.css'
import { getJoke, type JokeResponse } from './services/jokesService'

function App() {
  const [joke, setJoke] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetJoke = async () => {
    try {
      setLoading(true)
      setError(null)

      const data: JokeResponse = await getJoke()
      setJoke(data.joke)
    } catch (err) {
      setError('Something went wrong. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-root">
      <div className="card">
        <h1 className="title">AWS Jokes</h1>
        <p className="subtitle">Click the button to get a fresh joke from the API.</p>

        <button
          className="action-button"
          onClick={handleGetJoke}
          disabled={loading}
        >
          {loading ? 'Loading joke…' : 'Give me a joke'}
        </button>

        {error && <p className="error-text">{error}</p>}

        {joke && !error && (
          <div className="joke-box">
            <p>{joke}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
