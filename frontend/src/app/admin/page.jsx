"use client";

import AdminPage from '@/components/destination/admin';
import ProtectedRoute from '@/components/login/ProtectedRoute';
import React from 'react';

export default function page() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPage />
    </ProtectedRoute>
  );
}