// src/components/AnimatedEffects.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fistImg from '../assets/fist.png';
import kickImg from '../assets/kick.png';

export default function AnimatedEffects({ trigger, type }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const animation = {
    initial: type === 'fist' ? { x: '-100vw', opacity: 0 } : { y: '-100vh', opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.img
          src={type === 'fist' ? fistImg : kickImg}
          alt="effect"
          className="fixed w-32 h-32 z-50 pointer-events-none"
          style={{ top: type === 'fist' ? '30%' : '60%', left: type === 'fist' ? '10%' : '70%' }}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={animation.transition}
        />
      )}
    </AnimatePresence>
  );
}
