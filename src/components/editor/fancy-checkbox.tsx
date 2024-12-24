"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface FancyCustomCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const FancyCustomCheckbox: React.FC<FancyCustomCheckboxProps> = ({
  label,
  checked: initialChecked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const toggleCheckbox = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleCheckbox();
    }
  };

  return (
    <div  className="group flex items-center space-x-3">
      <motion.div
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={toggleCheckbox}
        onKeyDown={handleKeyDown}
        className={`w-5 h-5 rounded-full print:bg-gray-500 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${
          isChecked ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200 print:bg-gray-500 '
        } hover:shadow-lg`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isChecked ? 1 : 0,
            opacity: isChecked ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Check className="text-white" size={16} />
        </motion.div>
      </motion.div>
      <label 
        className="cursor-pointer select-none text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
        onClick={toggleCheckbox}
      >
        {label}
      </label>
    </div>
  );
};

export default FancyCustomCheckbox;

