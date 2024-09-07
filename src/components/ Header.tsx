import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { debounce } from "lodash";

type Location = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const FlightsPage: React.FC = () => {
  const [cities, setCities] = useState<Location[]>([]);
  const [filteredFromCities, setFilteredFromCities] = useState<Location[]>([]);
  const [filteredToCities, setFilteredToCities] = useState<Location[]>([]);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/cities");
      const data = await response.json();

      if (data.success) {
        setCities(data.data);
      } else {
        console.error("Error fetching cities:", data.error);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleFromQueryChange = debounce((query: string) => {
    if (query.length >= 2) {
      setFilteredFromCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowFromDropdown(true);
    } else {
      setShowFromDropdown(false);
    }
  }, 300);

  const handleToQueryChange = debounce((query: string) => {
    if (query.length >= 3) {
      setFilteredToCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  }, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target as Node)
      ) {
        setShowFromDropdown(false);
      }
      if (
        toInputRef.current &&
        !toInputRef.current.contains(event.target as Node)
      ) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCitySelect = (city: string, type: "from" | "to") => {
    if (type === "from") {
      setFromQuery(city);
      setShowFromDropdown(false);
    } else {
      setToQuery(city);
      setShowToDropdown(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative flights-page">
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
            <div className="relative w-full" ref={fromInputRef}>
              <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where from?"
                className="input-field pl-12 w-full py-3 rounded-lg"
                value={fromQuery}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  handleFromQueryChange(e.target.value);
                }}
                onFocus={() => setShowFromDropdown(true)}
              />
              {showFromDropdown && filteredFromCities.length > 0 && (
                <ul className="absolute bg-gray-500 text-white w-full mt-2 rounded-lg max-h-40 overflow-y-auto z-40">
                  {filteredFromCities.map((city) => (
                    <li
                      key={city.id}
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleCitySelect(city.name, "from")}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-20">
              <FaExchangeAlt
                size={30}
                className="absolute top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="relative w-full" ref={toInputRef}>
              <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where to?"
                className="input-field pl-12 w-full py-3 rounded-lg"
                value={toQuery}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  handleToQueryChange(e.target.value);
                }}
                onFocus={() => setShowToDropdown(true)}
              />
              {showToDropdown && filteredToCities.length > 0 && (
                <ul className=" absolute bg-gray-500 text-white w-full mt-2 rounded-lg max-h-40 overflow-y-auto z-40">
                  {filteredToCities.map((city) => (
                    <li
                      key={city.id}
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleCitySelect(city.name, "to")}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mt-4 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <div className="relative sm:flex-1">
              <div className="flex items-center space-x-2 pl-32">
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  placeholderText="Departure"
                  className="input-field bg-gray-700 text-gray-900 w-full py-3 rounded-lg"
                  dateFormat="MMM dd, yyyy"
                />
                <div className="relative px-3">
                  <FaCalendarAlt size={30} className="text-gray-400" />
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
