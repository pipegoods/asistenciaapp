export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      No es del todo necesario, pero es recomendable que uses un linter para que
      te ayude a mantener un código limpio y consistente. En este caso, usaremos
      ESLint con la configuración <b>recomendada</b> por Next.js. Para ello,
      ejecuta el siguiente comando en la terminal:
      <code className="mt-4 block rounded-md bg-gray-100 p-4">
        npx eslint --init
      </code>
    </main>
  )
}
