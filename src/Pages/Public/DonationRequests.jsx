import { useQuery } from "@tanstack/react-query";
import {
  CiCalendarDate,
  CiHospital1,
  CiLocationOn,
  CiTimer,
  CiSearch,
  CiFilter,
} from "react-icons/ci";
import { FaDroplet, FaXmark } from "react-icons/fa6";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import FilterBadge from "../../Components/Common/FilterBadge";

const DonationRequests = () => {
  const instance = useAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // desc for newest first, asc for oldest first
  const [showFilters, setShowFilters] = useState(false);
  const limit = 4;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters for server-side filtering
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append('donationStatus', 'pending');
    params.append('limit', limit.toString());
    params.append('skip', (currentPage * limit).toString());
    params.append('sortBy', 'donationDate');
    params.append('sortOrder', sortOrder);
    
    if (debouncedSearchTerm.trim()) {
      params.append('search', debouncedSearchTerm.trim());
    }
    if (selectedBloodGroup) {
      params.append('bloodGroup', selectedBloodGroup);
    }
    if (selectedDate) {
      params.append('donationDate', selectedDate);
    }
    
    return params.toString();
  };

  // Fetch requests with server-side filtering
  const { data: donationRequestsData = {}, isLoading } = useQuery({
    queryKey: ["donation-requests", currentPage, debouncedSearchTerm, selectedBloodGroup, selectedDate, sortOrder],
    queryFn: async () => {
      const queryString = buildQueryParams();
      const res = await instance.get(`/allRequests?${queryString}`);
      return res.data;
    },
  });

  const donationRequests = donationRequestsData.result || [];
  const totalPages = Math.ceil((donationRequestsData.total || 0) / limit);

  // Reset pagination when filters change
  const handleFilterChange = () => {
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBloodGroup("");
    setSelectedDate("");
    setSortOrder("desc");
    setCurrentPage(0);
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        setSearchTerm("");
        break;
      case 'bloodGroup':
        setSelectedBloodGroup("");
        break;
      case 'date':
        setSelectedDate("");
        break;
      case 'sort':
        setSortOrder("desc");
        break;
    }
    setCurrentPage(0);
  };

  const activeFiltersCount = [
    debouncedSearchTerm, 
    selectedBloodGroup, 
    selectedDate, 
    sortOrder !== "desc" ? "sort" : ""
  ].filter(Boolean).length;
  return (
    <div className="px-5 py-10 w-full max-w-360 mx-auto">
      <title>All Donation Requests | BloodLine</title>
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        Donation Requests
      </h2>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, hospital, or location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange();
            }}
            className="input input-bordered w-full pl-10 pr-12 py-2 rounded-full border-2 border-secondary/20 focus:border-secondary focus:outline-none transition-all duration-300"
          />
          {searchTerm !== debouncedSearchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-secondary border-t-transparent"></div>
            </div>
          )}
        </div>

        {/* Sort and Filter Toggle */}
        <div className="flex justify-center items-center gap-4">
          {/* Sort Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Sort by Date:</span>
            <button
              onClick={() => {
                setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                handleFilterChange();
              }}
              className="btn btn-outline btn-secondary btn-sm rounded-full px-4 transition-all duration-300"
            >
              <CiCalendarDate className="text-lg" />
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </button>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-outline btn-secondary rounded-full px-6 transition-all duration-300 ${
              showFilters ? "btn-secondary" : ""
            }`}
          >
            <CiFilter className="text-lg" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="badge badge-primary badge-sm ml-2">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Options */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-base-100 rounded-2xl shadow-lg border border-secondary/10 p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Blood Group Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaDroplet className="text-secondary" />
                  Blood Group
                </label>
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => {
                    setSelectedBloodGroup(e.target.value);
                    handleFilterChange();
                  }}
                  className="select select-bordered w-full border-2 border-secondary/20 focus:border-secondary rounded-lg"
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CiCalendarDate className="text-secondary" />
                  Donation Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    handleFilterChange();
                  }}
                  className="input input-bordered w-full border-2 border-secondary/20 focus:border-secondary rounded-lg"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost btn-sm text-secondary hover:bg-secondary hover:text-white rounded-full px-4 transition-all duration-300"
                >
                  <FaXmark className="text-sm" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {debouncedSearchTerm && (
              <FilterBadge
                label="Search"
                value={debouncedSearchTerm}
                onRemove={() => removeFilter('search')}
                icon={CiSearch}
              />
            )}
            {selectedBloodGroup && (
              <FilterBadge
                label="Blood Group"
                value={selectedBloodGroup}
                onRemove={() => removeFilter('bloodGroup')}
                icon={FaDroplet}
              />
            )}
            {selectedDate && (
              <FilterBadge
                label="Date"
                value={selectedDate}
                onRemove={() => removeFilter('date')}
                icon={CiCalendarDate}
              />
            )}
            {sortOrder !== "desc" && (
              <FilterBadge
                label="Sort"
                value="Oldest First"
                onRemove={() => removeFilter('sort')}
                icon={CiCalendarDate}
              />
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Showing {donationRequests.length} of {donationRequestsData.total || 0} requests
            {activeFiltersCount > 0 && (
              <span className="text-secondary font-semibold"> (filtered)</span>
            )}
          </p>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : donationRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">🔍</div>
          <p className="text-xl font-bold text-gray-500 mb-2">
            {activeFiltersCount > 0 ? "No requests match your filters" : "No pending requests available!"}
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="btn btn-secondary btn-sm mt-4 rounded-full"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {donationRequests.map((request, index) => (
            <div
              key={request._id}
              className="group p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-500 flex flex-col gap-3 border-2 border-secondary/20 hover:border-secondary bg-linear-to-br from-white to-gray-50 hover:from-secondary/5 hover:to-secondary/10 transform transition-all"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Blood Group Badge */}
              <div className="flex justify-end">
                <div className="px-4 py-2 rounded-full bg-linear-to-r from-secondary to-secondary/80 text-white font-extrabold text-xl flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {request.bloodGroup}
                </div>
              </div>

              {/* Recipient Name */}
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-secondary transition-colors duration-300">
                {request.recipientName}
              </h2>

              {/* Location Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <CiLocationOn className="text-xl font-bold text-secondary shrink-0" />
                  <p className="text-sm">
                    {request.recipientDivision}, {request.recipientDistrict},{" "}
                    {request.recipientUpazila}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CiLocationOn className="text-xl font-bold text-secondary shrink-0" />
                  <p className="text-sm line-clamp-2">{request.fullAddressLine}</p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <CiCalendarDate className="text-xl font-bold text-secondary" />
                  <p className="text-sm font-medium">{request.donationDate}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CiTimer className="text-xl font-bold text-secondary" />
                  <p className="text-sm">{request.donationTime}</p>
                </div>
              </div>

              {/* Hospital */}
              <div className="flex items-center gap-2 text-gray-600">
                <CiHospital1 className="text-xl font-bold text-secondary" />
                <p className="text-sm font-medium line-clamp-1">{request.hospitalName}</p>
              </div>

              {/* View Details Button */}
              <Link
                to={`/viewDonationRequest/${request._id}`}
                className="btn btn-secondary rounded-full mt-auto group-hover:bg-secondary group-hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-base-100 rounded-2xl shadow-lg border border-secondary/10">
          <div className="text-secondary font-bold text-center sm:text-left">
            Page {currentPage + 1} of {totalPages}
            <span className="text-sm text-gray-500 block sm:inline sm:ml-2">
              ({donationRequestsData.total || 0} total results)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className="btn btn-outline btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="btn btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              Prev
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`btn btn-sm rounded-full w-10 h-10 ${
                      currentPage === pageNum
                        ? "btn-secondary"
                        : "btn-outline btn-secondary"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
              className="btn btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage + 1 >= totalPages}
              className="btn btn-outline btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
