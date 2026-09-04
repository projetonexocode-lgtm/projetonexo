import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-20 text-center">
      <h1 className="mt-3 font-display text-4xl text-charcoal">
        Página não encontrada
      </h1>
      <p className="mt-4 text-sm text-charcoal/70">
        O endereço não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center justify-center bg-espresso px-5 text-sm text-warm"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
