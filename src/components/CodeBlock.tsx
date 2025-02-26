import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  const { theme } = useTheme();
  const { copied, copy } = useCopyToClipboard();

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-gray-100',
          text: 'text-gray-800',
          button: 'bg-gray-200 hover:bg-gray-300',
          success: 'bg-green-100 text-green-800'
        };
      case 'dark':
        return {
          background: 'bg-gray-800',
          text: 'text-gray-200',
          button: 'bg-gray-700 hover:bg-gray-600',
          success: 'bg-green-800/30 text-green-400'
        };
      default:
        return {
          background: 'bg-black/50',
          text: 'text-gray-200',
          button: 'bg-white/10 hover:bg-white/20',
          success: 'bg-green-500/20 text-green-400'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`relative rounded-lg ${styles.background} p-4 group`}>
      <pre className={`overflow-x-auto ${styles.text}`}>
        <code className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => copy(code.trim())}
        className={`
          absolute top-3 right-3 p-2 rounded-lg
          ${copied ? styles.success : styles.button}
          transition-all duration-200
        `}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
};

export default CodeBlock; 