
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function ClientNewOrder() {
  const [pedidoCriado, setPedidoCriado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gera número do pedido e senha aleatória
      const numeroPedido = Math.floor(100000 + Math.random() * 900000).toString();
      const senhaPedido = Math.floor(100000 + Math.random() * 900000).toString();

      // Coleta os dados do formulário
      const formData = {
        nome: e.target.nome.value,
        cpf: e.target.cpf.value,
        telefone: e.target.telefone.value,
        email: e.target.email.value,
        endereco: e.target.endereco.value,
        smiles: e.target.smiles.checked,
        shellbox: e.target.shellbox.checked,
        numeroPedido,
        senhaPedido,
        status: "Pendente",
        createdAt: new Date(),
      };

      // Salva no Firestore
      await addDoc(collection(db, "orders"), formData);

      // Exibe na tela
      setPedidoCriado({ numeroPedido, senhaPedido });

      // Envia e-mail com EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nome: formData.nome,
          email: formData.email,
          numeroPedido,
          senhaPedido,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      alert("Erro ao salvar pedido. Tente novamente!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {!pedidoCriado ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" placeholder="Nome" className="input" required />
          <input name="cpf" placeholder="CPF" className="input" required />
          <input name="telefone" placeholder="Telefone" className="input" required />
          <input name="email" placeholder="E-mail" className="input" required />
          <input name="endereco" placeholder="Endereço" className="input" required />

          <div className="flex gap-4 items-center">
            <label>
              <input type="checkbox" name="smiles" /> Possui Smiles?
            </label>
            <label>
              <input type="checkbox" name="shellbox" /> Tem Shellbox?
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Fazer Pedido
          </button>
        </form>
      ) : (
        <div className="text-center p-4 bg-green-50 border rounded-xl">
          <h2 className="text-xl font-bold text-green-600">Pedido Criado com Sucesso!</h2>
          <p className="mt-2 text-gray-700">Número do Pedido: <b>{pedidoCriado.numeroPedido}</b></p>
          <p className="mt-1 text-gray-700">Senha: <b>{pedidoCriado.senhaPedido}</b></p>
          <p className="mt-3 text-sm text-gray-500">
            Essas informações também foram enviadas para o seu e-mail.
          </p>
        </div>
      )}
    </div>
  );
}
