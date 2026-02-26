"use client";

import GuideAdminPage from '@/components/guide/guideadmin';
import ProtectedRoute from '@/components/login/ProtectedRoute';
import React from 'react';

export default function page() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <GuideAdminPage />
    </ProtectedRoute>
  );
}