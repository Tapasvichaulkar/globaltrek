"use client";
import { useState } from "react";
import { DESTINATIONS_DATA, CATEGORIES } from "./d";

export default function AdminPage() {
  const [destinations, setDestinations] = useState(DESTINATIONS_DATA);
  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "Heritage",
    thumbnail: "",
    main360: "",
    views: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = () => {
    if (editId) {
      setDestinations(
        destinations.map((d) =>
          d.id === editId
            ? {
                ...d,
                ...form,
                views: form.views.split(","),
              }
            : d
        )
      );
    } else {
      setDestinations([
        ...destinations,
        {
          id: Date.now(),
          ...form,
          views: form.views.split(","),
        },
      ]);
    }

    setForm({
      title: "",
      location: "",
      category: "Heritage",
      thumbnail: "",
      main360: "",
      views: "",
    });
    setEditId(null);
  };

  // Edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      location: item.location,
      category: item.category,
      thumbnail: item.thumbnail,
      main360: item.main360,
      views: item.views.join(","),
    });
  };

  // Delete
  const handleDelete = (id) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  // Cancel edit
  const handleCancel = () => {
    setForm({
      title: "",
      location: "",
      category: "Heritage",
      thumbnail: "",
      main360: "",
      views: "",
    });
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Destination Manager
          </h1>
          <p className="text-blue-700">
            Add, edit, and manage your virtual tour destinations
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">
              {editId ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Update Destination
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Destination
                </span>
              )}
            </h2>
            {editId && (
              <button
                onClick={handleCancel}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Title
              </label>
              <input
                name="title"
                placeholder="Enter destination title"
                value={form.title}
                onChange={handleChange}
                className="w-full border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Location
              </label>
              <input
                name="location"
                placeholder="Enter location"
                value={form.location}
                onChange={handleChange}
                className="w-full border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Thumbnail URL
              </label>
              <input
                name="thumbnail"
                placeholder="https://example.com/image.jpg"
                value={form.thumbnail}
                onChange={handleChange}
                className="w-full border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Main 360° iframe URL
              </label>
              <input
                name="main360"
                placeholder="https://example.com/360-view"
                value={form.main360}
                onChange={handleChange}
                className="w-full border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Alternative Views
              </label>
              <input
                name="views"
                placeholder="url1, url2, url3 (comma separated)"
                value={form.views}
                onChange={handleChange}
                className="w-full border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate multiple URLs with commas
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg shadow-blue-300 transition-all transform hover:scale-105"
            >
              {editId ? "Update Destination" : "Add Destination"}
            </button>
            {editId && (
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-700 to-indigo-900">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              All Destinations ({destinations.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b-2 border-blue-100">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Title
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Location
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Category
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-blue-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {destinations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="font-medium">No destinations yet</p>
                        <p className="text-sm">
                          Add your first destination using the form above
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  destinations.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-blue-50 hover:bg-blue-50/50 transition ${
                        editId === item.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-700">{item.location}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg transition flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}