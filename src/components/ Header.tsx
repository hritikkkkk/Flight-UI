import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightsPage: React.FC = () => {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative flights-page">
      <div className="absolute inset-0 bg-cover bg-center" />

      <div className="relative z-10">
        <div className="h-64 flex items-center justify-center bg-opacity-50">
          <motion.h1
            className="text-6xl font-bold text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span>Embark on a Journey</span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {" "}
              to Discover{" "}
            </motion.span>
            <motion.div
              className="text-blue-500"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              New Horizons
            </motion.div>
          </motion.h1>
        </div>

        <div className="shadow-lg p-8 rounded-lg mx-auto mt-6 w-11/12 max-w-4xl">
          <div className="flex flex-col sm:flex-row mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full ">
              <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where from?"
                className="input-field pl-12 w-full py-3 rounded-lg"
              />
            </div>
            <div className="relative w-20 ">
              <FaExchangeAlt
                size={30}
                className="absolute top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="relative w-full">
              <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where to?"
                className="input-field pl-12 w-full py-3 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mt-4 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <div className="relative sm:flex-1">
              <div className="flex  items-center space-x-2 pl-32">
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  placeholderText="Departure"
                  className="input-field bg-gray-700 text-gray-900 w-full py-3 rounded-lg"
                  dateFormat="MMM dd, yyyy"
                />
                <div className="relative  px-3">
                  <FaCalendarAlt size={30} className=" text-gray-400" />
                </div>

                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  placeholderText="Return"
                  className="input-field bg-gray-700 text-gray-900 w-full py-3 rounded-lg"
                  dateFormat="MMM dd, yyyy"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              className=" btn-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
