import { servicePriceList } from '@/data'

export function PriceList() {
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-surface">
      <table className="w-full text-sm">
        <caption className="sr-only">IMC Motor szerviz árlista</caption>
        <tbody>
          {servicePriceList.map((row, i) => (
            <tr key={i} className="border-b border-hairline last:border-0">
              <th scope="row" className="px-5 py-4 text-left font-normal text-ink">
                {row.label}
                {row.note ? <span className="ml-2 text-xs text-stone">({row.note})</span> : null}
              </th>
              <td className="whitespace-nowrap px-5 py-4 text-right font-medium tabular-nums">
                {row.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
