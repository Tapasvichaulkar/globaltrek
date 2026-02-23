'use client';
import TripItinerary from '@/components/tripplanner/TripItinerary';
import TripPlannerForm from '@/components/tripplanner/TripPlannerForm';
import { useState } from 'react';


export default function AITripPlanner() {
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'itinerary'
  const [tripData, setTripData] = useState(null);

  const handlePlanGenerate = (data) => {
    setTripData(data);
    setCurrentView('itinerary');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <>
      {currentView === 'form' ? (
        <TripPlannerForm onPlanGenerate={handlePlanGenerate} />
      ) : (
        <TripItinerary tripData={tripData} onBack={handleBackToForm} />
      )}
    </>
  );
}