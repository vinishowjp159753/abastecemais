
import { motion } from 'framer-motion';

export default function Hero({onNewOrder}){
  return (
    <section className="bg-gradient-to-br from-primary via-primaryDark to-emerald-800 text-white">
      <div className="container py-24 text-center">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="font-display text-4xl md:text-5xl font-bold mb-4">
          Faça seu pedido e fuja dos preços abusivos da gasolina
        </motion.h1>
        <p className="opacity-90 max-w-2xl mx-auto mb-8">
          Uma forma inovadora e segura para economizar na hora de abastecer.
        </p>
        <motion.button whileHover={{scale:1.03}} whileTap={{scale:.98}} onClick={onNewOrder}
          className="btn btn-primary text-lg">
          Fazer novo pedido
        </motion.button>
      </div>
    </section>
  )
}
