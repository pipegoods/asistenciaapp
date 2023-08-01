import Link from 'next/link'

export function Header() {
  return (
    <header className="container mx-auto mb-5 border-0 border-b py-5">
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/students">Estudiantes</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
