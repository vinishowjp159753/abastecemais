
export default function StatusBadge({value}){
  const map = {
    'Aprovado':'badge badge-green',
    'Em análise':'badge badge-yellow',
    'Rejeitado':'badge badge-red',
    'Em entrega':'badge badge-yellow',
    'Concluído':'badge badge-green',
  }
  return <span className={map[value] || 'badge'}>{value}</span>
}
