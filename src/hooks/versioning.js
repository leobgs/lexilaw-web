import { useEffect, useState } from 'react'

export default function useVersioning(input) {
  const [currentVersion, setCurrentVersion] = useState(null)

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch(input).then((data) => {
          return data.json()
        })
        const latestVersion = response.version

        if (currentVersion && currentVersion !== latestVersion) {
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
              registrations.forEach((registration) => registration.unregister())
            })
          }
          window.location.reload(true)
        } else {
          setCurrentVersion(latestVersion)
        }
      } catch (error) {
        console.error('Error fetching version:', error)
      }
    }

    const intervalId = setInterval(fetchVersion, 10 * 1000)
    fetchVersion()
    return () => clearInterval(intervalId)
  }, [])

  return currentVersion
}
