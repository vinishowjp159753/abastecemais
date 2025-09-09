
export function maskCPF(v='') {
  return v.replace(/\D/g,'')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
    .slice(0,14);
}
export function maskPhone(v='') {
  return v.replace(/\D/g,'')
    .replace(/(\d{2})(\d)/,'($1) $2')
    .replace(/(\d{5})(\d{4}).*/,'$1-$2')
    .slice(0, 15);
}
export function maskCEP(v='') {
  return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9);
}
export function randomCode() {
  const s = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out=''; for (let i=0;i<8;i++) out += s[Math.floor(Math.random()*s.length)];
  return `AB-${out}`;
}
export function randomPin() {
  return Math.floor(100000 + Math.random()*900000).toString();
}
export const STATUS = ['Em análise','Aprovado','Rejeitado','Em entrega','Concluído'];
