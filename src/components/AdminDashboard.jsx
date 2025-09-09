
import OrdersTable from './OrdersTable';
import BudgetPanel from './BudgetPanel';

export default function AdminDashboard(){
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold">Painel</h3>
          <p className="text-sm text-gray-600 mt-2">Gerencie pedidos, status, observações, custos e lucros.</p>
          <ul className="mt-3 text-sm list-disc list-inside text-gray-600">
            <li>Atualize o <b>status</b> do pedido</li>
            <li>Edite <b>observações</b></li>
            <li>Preencha <b>custos e lucros</b></li>
            <li>Marque como <b>entregue</b></li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Reset de Senha</h3>
          <p className="text-sm text-gray-600 mt-2">O link para resetar a senha do administrador sempre será enviado para:</p>
          <p className="text-sm mt-1"><b>vinicius.andrade.123@hotmail.com</b></p>
          <a className="btn btn-outline mt-3" href="mailto:vinicius.andrade.123@hotmail.com?subject=Reset%20de%20Senha%20-%20Abastece%2B">Enviar pedido de reset</a>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Dicas</h3>
          <p className="text-sm text-gray-600 mt-2">Use a busca da tabela para encontrar clientes por nome, CPF ou código do pedido.</p>
          <p className="text-sm text-gray-600">As alterações são salvas automaticamente.</p>
        </div>
      </div>
      <BudgetPanel/>
      <OrdersTable/>
    </div>
  )
}
