import { ClipboardCheck, Rocket, Users, Lightbulb, Flag } from 'lucide-react'; // Import the specific icons
import { motion } from 'framer-motion';

const NPMToolsGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300 text-black">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text shadow-lg p-2 rounded">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Rocket className="inline-block w-6 h-6 mr-2" />
          </motion.div>
          NPM Tools Guide
        </h2>
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text shadow-lg p-2 rounded">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Users className="inline-block w-6 h-6 mr-2" />
          </motion.div>
          Technology Toolbar
        </h3>
        <p className="mb-4">The Technology Toolbar provides quick access to various npm tools. Click on any technology to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Copy its npm installation command</li>
          <li>See a toast notification with the copied command</li>
        </ul>
        <h4 className="text-lg font-semibold mb-2 bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text shadow-lg p-2 rounded">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <ClipboardCheck className="inline-block w-6 h-6 mr-2" />
          </motion.div>
          How to Use:
        </h4>
        <p className="mb-4">Click a technology to see its npm command.</p>
        <p className="mb-4 font-medium">Pro Tip: Hover over the Technology Toolbar to pause its automatic scrolling.</p>
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text shadow-lg p-2 rounded">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Lightbulb className="inline-block w-6 h-6 mr-2" />
          </motion.div>
          Hidden Technology Toolbar
        </h3>
        <p className="mb-4">Discover a seamless technology integration experience with our 'Hidden Technology Toolbar.' Discreetly positioned in the upper left corner of the page, this dynamic toolbar follows you throughout the site. Each icon represents a powerful tool in your development arsenal, ready to be explored and integrated with a simple click.</p>
        <h4 className="text-lg font-semibold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text shadow-lg p-2 rounded">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Flag className="inline-block w-6 h-6 mr-2" />
          </motion.div>
          Features:
        </h4>
        <p className="mb-4">Click a technology to see its npm command.</p>
        <p className="mb-4 font-medium">Pro Tip: Hover over the Technology Toolbar to pause its automatic scrolling.</p>
      </div>
    </motion.div>
  );
};

export default NPMToolsGuide;
