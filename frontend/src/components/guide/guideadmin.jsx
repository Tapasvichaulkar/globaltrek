'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X, Users, MapPin, Star, DollarSign, Globe } from 'lucide-react';


export default function GuideAdminPage() {
  const [guides, setGuides] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: '',
    place: '',
    category: '',
    image: '',
    rating: '',
    experience: '',
    languages: '',
    price: '',
    about: ''
  };

  const [form, setForm] = useState(emptyForm);
useEffect(() => {
  fetchGuides();
}, []);

const fetchGuides = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/guides");
    const data = await res.json();
    setGuides(data);
  } catch (error) {
    console.error("Error fetching guides:", error);
  }
};
  // Add or Update Guide
const handleSave = async () => {
  if (!form.name || !form.place || !form.price) {
    alert('Please fill required fields: Name, Place, and Price');
    return;
  }

  const guideData = {
    ...form,
    rating: Number(form.rating || 4.5),
    price: Number(form.price),
    languages: form.languages
      ? form.languages.split(',').map(l => l.trim())
      : []
  };

  try {
    if (editingId) {
      await fetch(`http://localhost:5000/api/guides/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guideData),
      });
    } else {
      await fetch("http://localhost:5000/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guideData),
      });
    }

    fetchGuides();
    setEditingId(null);
    setForm(emptyForm);

  } catch (error) {
    console.error("Error saving guide:", error);
  }
};

  const handleEdit = (guide) => {
  setEditingId(guide._id);
  setForm({
    ...guide,
    languages: guide.languages ? guide.languages.join(', ') : ''
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this guide?')) return;

  try {
    await fetch(`http://localhost:5000/api/guides/${id}`, {
      method: "DELETE",
    });

    fetchGuides();
  } catch (error) {
    console.error("Error deleting guide:", error);
  }
};

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 flex items-center gap-3">
            <Users className="w-10 h-10 text-blue-900" />
            Guide Management Panel
          </h1>
          <p className="text-blue-700">
            Manage tour guides, their details, and availability
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900 flex items-center gap-2">
              {editingId ? (
                <>
                  <Edit className="w-6 h-6 text-blue-900" />
                  Edit Guide Profile
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6 text-blue-900" />
                  Add New Guide
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={handleCancel}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Guide Name <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Enter guide's full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            {/* Place */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Location/Place <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="City or region"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Category
              </label>
              <input
                placeholder="e.g., Heritage, Adventure, Wildlife"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Experience
              </label>
              <input
                placeholder="e.g., 5+ Years, 10 Years"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Languages
              </label>
              <input
                placeholder="English, Hindi, Spanish (comma separated)"
                value={form.languages}
                onChange={(e) => setForm({ ...form, languages: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
              <p className="text-sm text-gray-500 mt-1">Separate languages with commas</p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Price per Day <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="2000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                <Star className="w-4 h-4" />
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="4.5"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
              <p className="text-sm text-gray-500 mt-1">0 to 5 stars</p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Profile Image URL
              </label>
              <input
                placeholder="https://example.com/guide-photo.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition"
              />
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                About Guide
              </label>
              <textarea
                placeholder="Write a brief bio about the guide, their expertise, and what makes them special..."
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                rows="4"
                className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-blue-200 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {editingId ? 'Update Guide' : 'Add Guide'}
            </button>

            {editingId && (
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* GUIDE LIST */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-900">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Users className="w-6 h-6" />
              All Guides ({guides.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b-2 border-blue-100">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Guide
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Place
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Category
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Experience
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Languages
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Rating
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-900">
                    Price/Day
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-blue-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {guides.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-gray-300" />
                        <p className="font-medium">No guides yet</p>
                        <p className="text-sm">
                          Add your first guide using the form above
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  guides.map((guide) => (
                    <tr
                      key={guide._id}
                      className={`border-b border-blue-50 hover:bg-blue-50/50 transition ${
                        editingId === guide._id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {guide.image ? (
                            <img
                              src={guide.image}
                              alt={guide.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">
                              {guide.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          {guide.place}
                        </div>
                      </td>
                      <td className="p-4">
                        {guide.category ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {guide.category}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-gray-700 text-sm">
                          {guide.experience || '—'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {guide.languages && guide.languages.length > 0 ? (
                            guide.languages.slice(0, 2).map((lang, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-cyan-100 text-cyan-800"
                              >
                                {lang}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                          {guide.languages && guide.languages.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{guide.languages.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-gray-900">
                            {guide.rating || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-blue-700">
                          ₹{guide.price?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(guide)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                            title="Edit guide"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(guide._id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                            title="Delete guide"
                          >
                            <Trash2 className="w-4 h-4" />
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