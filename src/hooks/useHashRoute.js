import { useEffect, useMemo, useState } from 'react'
import { requestRoute } from '../lib/request'

// Ruta por hash, sin configurar el servidor: «#/reserva?…» es la página de solicitud; cualquier otro hash es la portada.
// Devuelve { route: { name, params }, hash }.
export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const route = useMemo(() => {
    const [path, query = ''] = hash.slice(1).split('?')
    if (path === requestRoute) return { name: 'request', params: new URLSearchParams(query) }
    return { name: 'home', params: new URLSearchParams() }
  }, [hash])

  return { route, hash }
}
