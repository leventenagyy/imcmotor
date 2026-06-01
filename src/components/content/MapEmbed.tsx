import { site } from '@/data'

export function MapEmbed({ className }: { className?: string }) {
  return (
    <iframe
      title="IMC Motor – térkép (Dunakeszi, Kikerics köz 4.)"
      src={site.mapsEmbedUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={className ?? 'h-full min-h-72 w-full border-0'}
    />
  )
}
