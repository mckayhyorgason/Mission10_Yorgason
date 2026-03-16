import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Bowler = {
  firstName?: string
  middleInit?: string
  lastName?: string
  teamName: string
  address?: string
  city?: string
  state?: string
  zip?: string
  phoneNumber?: string
}

function PageHeader() {
  return (
    <header className="page-header">
      <p className="eyebrow">Bowling League Directory</p>
      <h1>Barbara and David Fournier&apos;s Bowling Crew</h1>
      <p className="lede">
        A current roster of bowlers who play for the Marlins and Sharks teams.
      </p>
    </header>
  )
}

function BowlerTable({ bowlers }: { bowlers: Bowler[] }) {
  return (
    <section className="table-card" aria-label="Bowler list">
      <div className="table-meta">
        <h2>Team Roster</h2>
        <p>{bowlers.length} bowlers</p>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {bowlers.map((bowler, index) => (
              <tr key={`${bowler.lastName ?? 'bowler'}-${index}`}>
                <td className="name">{formatName(bowler)}</td>
                <td>{bowler.teamName}</td>
                <td>{bowler.address ?? '—'}</td>
                <td>{bowler.city ?? '—'}</td>
                <td>{bowler.state ?? '—'}</td>
                <td>{bowler.zip ?? '—'}</td>
                <td>{bowler.phoneNumber ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function formatName(bowler: Bowler) {
  const parts = [bowler.firstName, bowler.middleInit, bowler.lastName].filter(
    Boolean
  )
  return parts.join(' ')
}

function App() {
  const [bowlers, setBowlers] = useState<Bowler[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiBase = useMemo(() => {
    const fromEnv = import.meta.env.VITE_API_BASE
    return fromEnv || ''
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadBowlers() {
      try {
        setIsLoading(true)
        const response = await fetch(`${apiBase}/api/bowlers`)
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }
        const data = (await response.json()) as Bowler[]
        if (isActive) {
          setBowlers(data)
          setError(null)
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load bowlers right now.'
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadBowlers()

    return () => {
      isActive = false
    }
  }, [apiBase])

  return (
    <div className="page">
      <PageHeader />
      {isLoading ? (
        <section className="status">Loading bowlers...</section>
      ) : error ? (
        <section className="status error">
          <h2>Could not load bowlers</h2>
          <p>{error}</p>
          <p>
            Confirm the API is running{apiBase ? ' at ' : ' and reachable.'}
            {apiBase ? <span>{apiBase}</span> : null}
          </p>
        </section>
      ) : (
        <BowlerTable bowlers={bowlers} />
      )}
    </div>
  )
}

export default App
