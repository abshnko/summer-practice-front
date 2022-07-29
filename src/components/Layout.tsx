import { motion } from 'framer-motion';
import React from 'react';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Layout;
