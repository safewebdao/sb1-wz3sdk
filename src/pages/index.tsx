import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Website {
  url: string;
  title: string;
  description: string;
  unique_visitors: number;
  image: string;
}

const websites: Website[] = [
  {
    url: "https://taximanli.github.io/kotobade-asobou",
    title: "Kotobade Asobou 言葉で遊ぼう",
    description: "Japanese Wordle - daily word puzzle game. 日本語版 Wordle - 日替わり単語パズルゲーム。",
    unique_visitors: 88397,
    image: "taximanli.github.io/kotobade-asobou.jpg"
  },
  // Add more websites here...
];

export default function Home() {
  const [spinning, setSpinning] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  const spinSlotMachine = () => {
    setSpinning(true);
    setShowIframe(false);
    setTimeout(() => {
      const totalVisitors = websites.reduce((sum, site) => sum + site.unique_visitors, 0);
      let randomNumber = Math.random() * totalVisitors;
      let selectedSite: Website | undefined;

      for (const site of websites) {
        if (randomNumber <= site.unique_visitors) {
          selectedSite = site;
          break;
        }
        randomNumber -= site.unique_visitors;
      }

      setSelectedWebsite(selectedSite || null);
      setSpinning(false);
    }, 3000);
  };

  const handleVisitWebsite = () => {
    setShowIframe(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Website Slot Machine</title>
        <meta name="description" content="Discover exciting websites through our slot machine showcase!" />
        <meta name="keywords" content="slot machine, website showcase, random website, discovery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Website Slot Machine</h1>
              <p className="text-xl text-gray-600 mb-8">Pull the lever to discover an exciting website!</p>
              
              <div className="mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Slot Machine"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>

              <motion.button
                className="px-6 py-3 font-bold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline transform transition hover:scale-105"
                onClick={spinSlotMachine}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={spinning}
              >
                {spinning ? 'Spinning...' : 'Pull Lever'}
              </motion.button>

              <AnimatePresence>
                {selectedWebsite && (
                  <motion.div
                    key={selectedWebsite.url}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md"
                  >
                    <Image
                      src={`/${selectedWebsite.image}`}
                      alt={selectedWebsite.title}
                      width={600}
                      height={300}
                      className="rounded-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedWebsite.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedWebsite.description}</p>
                    <button
                      onClick={handleVisitWebsite}
                      className="inline-block px-6 py-3 font-bold text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline transform transition hover:scale-105"
                    >
                      Visit Website
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showIframe && selectedWebsite && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                  >
                    <div className="bg-white rounded-lg p-4 w-full max-w-4xl max-h-[90vh] flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{selectedWebsite.title}</h3>
                        <button
                          onClick={() => setShowIframe(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Close
                        </button>
                      </div>
                      <iframe
                        src={selectedWebsite.url}
                        className="w-full flex-grow rounded-lg border-2 border-gray-200"
                        style={{ height: 'calc(90vh - 100px)' }}
                        title={selectedWebsite.title}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}