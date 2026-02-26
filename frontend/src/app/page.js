'use client'
import React from 'react'
import Hero from '@/components/home/hero'
import DestinationsCarousel from '@/components/home/DestinationsCarousel'



import SearchPlaces from '@/components/home/category'
import Sample from '@/components/home/sample'
export default function hero() {
  return (
    <div>
       
       <Hero/>
      <Sample/>
       <DestinationsCarousel/>
       <SearchPlaces/>
 
     
    </div>
  )
}
