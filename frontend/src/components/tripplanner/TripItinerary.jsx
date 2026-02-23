'use client';
import { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, DollarSign, Clock, Users, ArrowLeft, 
  Sunrise, Sun, Sunset, Moon, Navigation, Info, Utensils, 
  Coffee, Star, Camera, TrendingUp, Home, Car, Plane,
  Download, Share2, Heart, Edit3
} from 'lucide-react';

export default function TripItinerary({ tripData, onBack }) {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState(0);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    generateDetailedItinerary();
  }, [tripData]);

  const generateDetailedItinerary = async () => {
    setLoading(true);
    
    try {
      const { destination, days, budget, interest, travelers } = tripData;
      const perPersonBudget = Math.round(parseInt(budget) / parseInt(travelers));
      const dailyBudget = Math.round(perPersonBudget / parseInt(days));
      
      const prompt = `Create a comprehensive ${days}-day itinerary for ${destination.name} (${destination.places}) in ${destination.state}, India.

Trip Details:
- Category: ${interest}
- Duration: ${days} days
- TOTAL Budget: ₹${budget} for ${travelers} travelers
- Per Person Budget: ₹${perPersonBudget}
- Target Daily Budget per Person: ₹${dailyBudget}
- Main Destination: ${destination.name}
- Key attractions: ${destination.places}

CRITICAL INSTRUCTIONS FOR ${days}-DAY TRIP:

1. **NO REPETITION**: Each day must visit DIFFERENT places. Do not repeat the same location twice.

2. **Geographic Planning**:
   - Day 1: Focus on ${destination.name} main attractions
   ${parseInt(days) >= 2 ? `- Day 2: Visit nearby places within 20-30 km of ${destination.name}` : ''}
   ${parseInt(days) >= 3 ? `- Day 3: Explore surrounding areas within 50 km, include nearby cities/towns` : ''}
   ${parseInt(days) >= 4 ? `- Day 4: Visit other famous ${interest.toLowerCase()} destinations in ${destination.state}` : ''}
   ${parseInt(days) >= 5 ? `- Day 5+: Cover regional attractions, day trips to nearby heritage sites` : ''}

3. **Proper Time Management** (12-hour activity windows):
   - Morning Block: 6:00 AM - 12:00 PM (6 hours)
   - Afternoon Block: 12:00 PM - 6:00 PM (6 hours)
   - Evening Block: 6:00 PM - 10:00 PM (4 hours)
   - Include travel time between locations
   - Factor in hotel check-in/check-out times
   - Add buffer time for meals and rest

4. **Hotel & Accommodation**:
   - Day 1: Show hotel check-in timing
   - Include hotel location in itinerary
   - Suggest staying near Day 2's attractions if visiting far areas

5. **Travel Between Places**:
   - Include actual travel time and distance
   - Suggest transport mode (car/bus/train)
   - Add travel costs to daily budget

6. **Nearby Tourist Places** (IMPORTANT):
   For ${days} days in ${destination.state}, include these types of places:
   - Other ${interest.toLowerCase()} sites within 50-100 km
   - Famous landmarks in nearby cities
   - Local markets, viewpoints, cultural centers
   - Hidden gems not in main tourist circuit

BUDGET CONSTRAINTS:
- The sum of all ${days} days' costs should equal approximately ₹${perPersonBudget} per person
- Each day should cost approximately ₹${dailyBudget} per person
- Adjust activity costs, meal prices, and transport to fit the budget
- Day 1 and Day ${days} might be slightly cheaper (arrival/departure days)

For EACH day, provide:

1. **Morning Activities** (6 AM - 12 PM):
   - 2-3 activities with specific time slots
   - Include hotel check-in on Day 1
   - Show travel time if visiting far places
   - Location names must be DIFFERENT from previous days

2. **Afternoon Activities** (12 PM - 6 PM):
   - 2-3 activities with specific time slots
   - Include lunch break
   - Add travel time between places

3. **Evening Activities** (6 PM - 10 PM):
   - 1-2 activities
   - Sunset points, markets, cultural shows
   - Return to hotel timing

4. **Meals** (with realistic locations):
   - Breakfast: Hotel or nearby cafe (₹${Math.round(dailyBudget * 0.1)}-${Math.round(dailyBudget * 0.12)})
   - Lunch: Restaurant at tourist spot (₹${Math.round(dailyBudget * 0.12)}-${Math.round(dailyBudget * 0.15)})
   - Dinner: Popular restaurant (₹${Math.round(dailyBudget * 0.15)}-${Math.round(dailyBudget * 0.18)})

5. **Daily Budget Breakdown** (per person):
   - Activities cost: ₹${Math.round(dailyBudget * 0.4)}
   - Food cost: ₹${Math.round(dailyBudget * 0.35)}
   - Transport cost: ₹${Math.round(dailyBudget * 0.15)} (local + intercity)
   - Miscellaneous: ₹${Math.round(dailyBudget * 0.1)}
   - Total: ₹${dailyBudget}

**EXAMPLES OF NEARBY PLACES FOR ${destination.state}:**
${getNearbySuggestions(destination.state, interest, destination.name)}

Also provide:
1. **5-7 Nearby Places** worth visiting (outside main itinerary)
2. **Travel Tips** specific to ${destination.name}

Return ONLY valid JSON in this exact structure:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Day title - Location name",
      "region": "Area being covered",
      "activities": [
        {
          "time": "HH:MM AM/PM - HH:MM AM/PM",
          "period": "Morning/Afternoon/Evening",
          "title": "Activity name",
          "description": "Detailed description",
          "location": "Specific place name (must be unique across all days)",
          "distance": "X km from hotel/previous location",
          "travelTime": "X minutes by car/bus",
          "cost": 500,
          "tips": "Helpful tip"
        }
      ],
      "meals": {
        "breakfast": {"place": "Restaurant name", "dish": "Dish name", "cost": 300},
        "lunch": {"place": "Restaurant name", "dish": "Dish name", "cost": 500},
        "dinner": {"place": "Restaurant name", "dish": "Dish name", "cost": 800}
      },
      "costBreakdown": {
        "activities": 2000,
        "food": 1600,
        "transport": 400,
        "miscellaneous": 300,
        "total": 4300
      },
      "hotelInfo": "Hotel location and timing info (Day 1 only)"
    }
  ],
  "nearbyPlaces": [
    {"name": "Place name", "distance": "X km from ${destination.name}", "description": "Brief description", "rating": 4.5, "category": "${interest}"}
  ],
  "travelTips": [
    "Best way to travel between cities",
    "Local transport options",
    "When to visit each place"
  ],
  "accommodationSuggestion": "Where to stay for best access to Day 2-${days} activities"
}

REMEMBER: NO REPETITION! Each location should appear only ONCE across all ${days} days.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 12000,
          messages: [{ role: "user", content: prompt }],
        })
      });

      const data = await response.json();
      const textContent = data.content.find(item => item.type === "text")?.text || "";
      
      const cleanedText = textContent.replace(/```json|```/g, "").trim();
      const parsedData = JSON.parse(cleanedText);
      
      setItinerary(parsedData.itinerary);
      setNearbyPlaces(parsedData.nearbyPlaces || []);
      
      // Calculate total cost per person
      const total = parsedData.itinerary.reduce((sum, day) => sum + day.costBreakdown.total, 0);
      setTotalCost(total);
      
    } catch (error) {
      console.error("Error generating itinerary:", error);
      // Fallback itinerary
      const fallbackItinerary = getFallbackItinerary(tripData);
      setItinerary(fallbackItinerary);
      
      // Calculate total from fallback
      const total = fallbackItinerary.reduce((sum, day) => sum + day.costBreakdown.total, 0);
      setTotalCost(total);
      
      // Set some default nearby places
      setNearbyPlaces(getDefaultNearbyPlaces(tripData));
    }
    
    setLoading(false);
  };

  const getNearbySuggestions = (state, interest, mainDestination) => {
    const suggestions = {
      'Delhi': 'Qutub Minar, India Gate, Lotus Temple, Humayun Tomb, Akshardham Temple',
      'Rajasthan': 'Hawa Mahal, City Palace, Jantar Mantar, Nahargarh Fort, Albert Hall Museum',
      'Maharashtra': 'Elephanta Caves, Gateway of India, Marine Drive, Sanjay Gandhi National Park',
      'Karnataka': 'Mysore Palace, Chamundi Hills, Brindavan Gardens, Ranganathittu Bird Sanctuary',
      'Tamil Nadu': 'Mahabalipuram, Kanchipuram Temples, DakshinaChitra, Vedanthangal Bird Sanctuary',
      'Kerala': 'Munnar Tea Gardens, Thekkady Wildlife, Alleppey Backwaters, Cochin Fort Kochi',
      'Uttar Pradesh': 'Fatehpur Sikri, Agra Fort, Itimad-ud-Daulah, Mehtab Bagh',
      'Goa': 'Fort Aguada, Basilica of Bom Jesus, Dudhsagar Falls, Spice Plantations',
      'West Bengal': 'Victoria Memorial, Howrah Bridge, Dakshineswar Temple, Science City',
      'Himachal Pradesh': 'Rohtang Pass, Solang Valley, Hadimba Temple, Naggar Castle'
    };
    
    return suggestions[state] || 'Nearby temples, forts, museums, markets, natural viewpoints';
  };

  const getDefaultNearbyPlaces = (tripData) => {
    const { destination, interest } = tripData;
    return [
      {
        name: `Other ${interest} Sites`,
        distance: "20-50 km",
        description: `Explore more ${interest.toLowerCase()} destinations near ${destination.name}`,
        rating: 4.3,
        category: interest
      },
      {
        name: "Local Markets & Shopping",
        distance: "5-10 km",
        description: `Visit traditional markets and shopping areas in ${destination.state}`,
        rating: 4.0,
        category: "Shopping"
      },
      {
        name: "Cultural Centers",
        distance: "10-30 km",
        description: `Museums, art galleries, and cultural landmarks`,
        rating: 4.2,
        category: "Culture"
      }
    ];
  };

  const getFallbackItinerary = (data) => {
    const { budget, days, travelers, destination, interest } = data;
    const perPersonBudget = Math.round(parseInt(budget) / parseInt(travelers));
    const dailyBudget = Math.round(perPersonBudget / parseInt(days));
    
    // Calculate reasonable splits
    const activitiesCost = Math.round(dailyBudget * 0.4);
    const foodCost = Math.round(dailyBudget * 0.35);
    const transportCost = Math.round(dailyBudget * 0.15);
    const miscCost = Math.round(dailyBudget * 0.1);
    
    const breakfastCost = Math.round(foodCost * 0.25);
    const lunchCost = Math.round(foodCost * 0.35);
    const dinnerCost = Math.round(foodCost * 0.4);
    
    const daysList = [];
    const mainPlaces = destination.places.split(',').map(p => p.trim());
    
    // Define different areas to visit each day to avoid repetition
    const nearbyAreas = [
      `${destination.name} Main Area`,
      `${destination.name} Surrounding Attractions`,
      `Nearby ${interest} Sites (20-30 km)`,
      `${destination.state} Regional Attractions`,
      `Day Trip Destinations`,
      `Hidden Gems & Local Favorites`,
      `Cultural & Heritage Sites nearby`
    ];
    
    for (let i = 1; i <= parseInt(days); i++) {
      const isArrivalDay = i === 1;
      const isDepartureDay = i === parseInt(days);
      
      // Arrival and departure days are typically cheaper
      const dayMultiplier = (isArrivalDay || isDepartureDay) ? 0.7 : 1;
      const adjustedDailyTotal = Math.round(dailyBudget * dayMultiplier);
      const adjustedActivitiesCost = Math.round(activitiesCost * dayMultiplier);
      const adjustedTransportCost = Math.round(transportCost * dayMultiplier * (i > 2 ? 1.5 : 1)); // More transport for far places
      
      const currentArea = nearbyAreas[Math.min(i - 1, nearbyAreas.length - 1)];
      const placeIndex = i - 1;
      
      const activities = [];
      
      // Morning activities
      if (isArrivalDay) {
        activities.push({
          time: "12:00 PM - 2:00 PM",
          period: "Afternoon",
          title: "Arrival & Hotel Check-in",
          description: `Arrive at ${destination.name}, complete hotel check-in, freshen up and get ready for exploration`,
          location: `Hotel in ${destination.name}`,
          distance: "N/A",
          travelTime: "N/A",
          cost: 0,
          tips: "Keep ID proof and booking confirmation ready. Choose a hotel central to Day 2 activities"
        });
      } else {
        activities.push({
          time: "7:00 AM - 10:00 AM",
          period: "Morning",
          title: `Visit ${mainPlaces[placeIndex % mainPlaces.length] || currentArea}`,
          description: `Explore ${mainPlaces[placeIndex % mainPlaces.length] || currentArea} - one of the key ${interest.toLowerCase()} destinations in this region`,
          location: mainPlaces[placeIndex % mainPlaces.length] || currentArea,
          distance: i === 2 ? "5-10 km" : i === 3 ? "20-30 km" : i === 4 ? "40-50 km" : "30-40 km",
          travelTime: i === 2 ? "15-20 min" : i === 3 ? "45 min" : "1-1.5 hours",
          cost: Math.round(adjustedActivitiesCost * 0.3),
          tips: "Start early to avoid crowds and heat. Carry water and snacks"
        });
      }
      
      // Late Morning / Noon activity
      if (!isDepartureDay) {
        activities.push({
          time: isArrivalDay ? "3:00 PM - 5:00 PM" : "10:30 AM - 1:00 PM",
          period: isArrivalDay ? "Afternoon" : "Morning",
          title: isArrivalDay ? `${destination.name} Orientation Walk` : `${interest} Experience - Area ${i}`,
          description: isArrivalDay 
            ? `Take a guided walk around ${destination.name}, visit local markets, and understand the area layout`
            : `Engage in ${interest.toLowerCase()}-specific activities, photography, and immersive experiences at nearby attractions`,
          location: isArrivalDay ? `${destination.name} Local Market` : `${currentArea}`,
          distance: isArrivalDay ? "1-2 km" : "5-10 km from morning spot",
          travelTime: isArrivalDay ? "5-10 min" : "15-20 min",
          cost: Math.round(adjustedActivitiesCost * 0.25),
          tips: isArrivalDay ? "Good time to exchange currency and buy local SIM" : "Hire a local guide for better insights"
        });
      } else {
        activities.push({
          time: "9:00 AM - 11:00 AM",
          period: "Morning",
          title: "Souvenir Shopping & Last-minute Sightseeing",
          description: `Visit local handicraft shops, buy souvenirs and gifts. Quick visit to any missed spots`,
          location: `${destination.name} Shopping District`,
          distance: "2-5 km",
          travelTime: "10-15 min",
          cost: Math.round(adjustedActivitiesCost * 0.4),
          tips: "Bargain for best prices. Keep some budget for airport shopping too"
        });
      }
      
      // Afternoon activity
      if (!isDepartureDay) {
        activities.push({
          time: "2:00 PM - 5:00 PM",
          period: "Afternoon",
          title: `Explore ${i === 1 ? 'Nearby Attractions' : i === 2 ? 'Local Cultural Sites' : 'Regional Landmarks'}`,
          description: `Visit ${i === 1 ? 'museums, viewpoints, or heritage sites' : i === 2 ? 'temples, monuments, or art galleries' : 'other famous landmarks in the region'} within ${i === 1 ? '10' : i === 2 ? '20' : '30-50'} km radius`,
          location: `${i === 1 ? destination.name : destination.state} Area ${i}`,
          distance: `${i * 10}-${i * 15} km`,
          travelTime: `${i === 1 ? '20' : i === 2 ? '30-40' : '45-60'} min`,
          cost: Math.round(adjustedActivitiesCost * 0.25),
          tips: "Book tickets online if possible to save time"
        });
      } else {
        activities.push({
          time: "12:00 PM - 1:00 PM",
          period: "Afternoon",
          title: "Hotel Checkout",
          description: "Pack bags, complete hotel checkout, and prepare for departure journey",
          location: "Hotel",
          distance: "N/A",
          travelTime: "N/A",
          cost: 0,
          tips: "Check for any items left behind"
        });
      }
      
      // Evening activity
      if (!isDepartureDay) {
        activities.push({
          time: "6:00 PM - 8:30 PM",
          period: "Evening",
          title: `${i === 1 ? 'Sunset Point' : i === 2 ? 'Cultural Show' : i === 3 ? 'Night Market' : 'Evening Leisure'} Visit`,
          description: i === 1 
            ? `Visit a scenic sunset point for photography and relaxation`
            : i === 2 
              ? `Attend traditional cultural performance, music, or dance show`
              : i === 3
                ? `Explore vibrant night markets, street food, and local shopping`
                : `Leisure time for hotel relaxation or optional activities`,
          location: `${destination.name} ${i === 1 ? 'Viewpoint' : i === 2 ? 'Cultural Center' : i === 3 ? 'Night Bazaar' : 'Hotel Area'}`,
          distance: "5-10 km",
          travelTime: "15-20 min",
          cost: Math.round(adjustedActivitiesCost * 0.2),
          tips: i === 1 ? "Arrive 30 min before sunset" : i === 2 ? "Book seats in advance" : "Carry cash for street shopping"
        });
      } else {
        activities.push({
          time: "2:00 PM - 4:00 PM",
          period: "Afternoon",
          title: "Departure Journey",
          description: `Travel to airport/railway station and begin your journey home with wonderful memories`,
          location: "Airport/Railway Station",
          distance: "10-30 km from hotel",
          travelTime: "30-60 min",
          cost: Math.round(adjustedActivitiesCost * 0.3),
          tips: "Reach 2-3 hours before departure time"
        });
      }
      
      daysList.push({
        day: i,
        title: isArrivalDay 
          ? `Arrival at ${destination.name}` 
          : isDepartureDay 
            ? "Shopping & Departure" 
            : `Exploring ${currentArea}`,
        region: currentArea,
        activities: activities,
        meals: {
          breakfast: { 
            place: i === 1 ? "On Journey/Airport" : "Hotel Restaurant", 
            dish: i === 1 ? "Light Breakfast" : "Buffet Breakfast with Local Options", 
            cost: i === 1 ? Math.round(breakfastCost * 0.6) : breakfastCost 
          },
          lunch: { 
            place: `${i === 1 ? destination.name : currentArea} Restaurant`, 
            dish: `Regional ${interest === 'Spiritual' ? 'Vegetarian' : 'Special'} Thali`, 
            cost: lunchCost 
          },
          dinner: { 
            place: isDepartureDay ? "On Journey" : `Popular Restaurant in ${destination.name}`, 
            dish: isDepartureDay ? "Packed Meal/Snacks" : `${destination.state} Specialty Cuisine`, 
            cost: isDepartureDay ? Math.round(dinnerCost * 0.4) : dinnerCost 
          }
        },
        costBreakdown: {
          activities: adjustedActivitiesCost,
          food: Math.round(foodCost * dayMultiplier),
          transport: adjustedTransportCost,
          miscellaneous: Math.round(miscCost * dayMultiplier),
          total: adjustedDailyTotal + (i > 2 ? Math.round(transportCost * 0.5) : 0) // Extra transport for far places
        },
        hotelInfo: i === 1 ? `Stay at hotel in central ${destination.name} for easy access to Day 2-${days} locations` : undefined
      });
    }
    
    return daysList;
  };

  const getPeriodIcon = (period) => {
    switch (period) {
      case 'Morning': return <Sunrise className="w-5 h-5 text-amber-500" />;
      case 'Afternoon': return <Sun className="w-5 h-5 text-orange-500" />;
      case 'Evening': return <Sunset className="w-5 h-5 text-rose-500" />;
      case 'Night': return <Moon className="w-5 h-5 text-indigo-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDownload = () => {
    if (!itinerary) return;

    const { destination, days, budget, travelers } = tripData;
    
    let textContent = `🌟 ${days}-DAY TRIP ITINERARY 🌟\n`;
    textContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    textContent += `📍 Destination: ${destination.name}, ${destination.state}\n`;
    textContent += `📅 Duration: ${days} days\n`;
    textContent += `👥 Travelers: ${travelers}\n`;
    textContent += `💰 Budget: ₹${budget}\n`;
    textContent += `💵 Estimated Cost: ₹${totalCost * parseInt(travelers)}\n`;
    textContent += `✅ Status: ${(totalCost * parseInt(travelers)) <= parseInt(budget) ? 'Within Budget' : 'Over Budget'}\n\n`;
    
    itinerary.forEach((day) => {
      textContent += `\n${'='.repeat(50)}\n`;
      textContent += `📅 DAY ${day.day}: ${day.title}\n`;
      if (day.region) textContent += `📍 Region: ${day.region}\n`;
      textContent += `${'='.repeat(50)}\n\n`;
      
      textContent += `⏰ ACTIVITIES:\n${'-'.repeat(50)}\n`;
      day.activities.forEach((activity, idx) => {
        textContent += `\n${idx + 1}. ${activity.title}\n`;
        textContent += `   🕐 Time: ${activity.time}\n`;
        textContent += `   📍 Location: ${activity.location}\n`;
        if (activity.distance && activity.distance !== 'N/A') textContent += `   🚗 Distance: ${activity.distance}\n`;
        if (activity.travelTime && activity.travelTime !== 'N/A') textContent += `   ⏱️  Travel Time: ${activity.travelTime}\n`;
        textContent += `   💰 Cost: ₹${activity.cost}\n`;
        textContent += `   📝 ${activity.description}\n`;
        if (activity.tips) textContent += `   💡 Tip: ${activity.tips}\n`;
      });
      
      textContent += `\n🍽️  MEALS:\n${'-'.repeat(50)}\n`;
      textContent += `☕ Breakfast: ${day.meals.breakfast.dish} at ${day.meals.breakfast.place} (₹${day.meals.breakfast.cost})\n`;
      textContent += `🍛 Lunch: ${day.meals.lunch.dish} at ${day.meals.lunch.place} (₹${day.meals.lunch.cost})\n`;
      textContent += `🍜 Dinner: ${day.meals.dinner.dish} at ${day.meals.dinner.place} (₹${day.meals.dinner.cost})\n`;
      
      textContent += `\n💰 COST BREAKDOWN:\n${'-'.repeat(50)}\n`;
      textContent += `Activities: ₹${day.costBreakdown.activities}\n`;
      textContent += `Food: ₹${day.costBreakdown.food}\n`;
      textContent += `Transport: ₹${day.costBreakdown.transport}\n`;
      textContent += `Miscellaneous: ₹${day.costBreakdown.miscellaneous}\n`;
      textContent += `TOTAL: ₹${day.costBreakdown.total}\n`;
      
      if (day.hotelInfo) {
        textContent += `\n🏨 ${day.hotelInfo}\n`;
      }
    });
    
    if (nearbyPlaces.length > 0) {
      textContent += `\n\n${'='.repeat(50)}\n`;
      textContent += `📸 NEARBY PLACES TO EXPLORE\n`;
      textContent += `${'='.repeat(50)}\n`;
      nearbyPlaces.forEach((place, idx) => {
        textContent += `\n${idx + 1}. ${place.name}\n`;
        textContent += `   📍 Distance: ${place.distance}\n`;
        textContent += `   ⭐ Rating: ${place.rating}\n`;
        textContent += `   📝 ${place.description}\n`;
      });
    }
    
    textContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    textContent += `Generated by AI Trip Planner\n`;
    textContent += `Happy Travels! 🧳✈️\n`;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destination.name.replace(/\s+/g, '_')}_${days}day_itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${tripData.days}-Day Trip to ${tripData.destination.name}`,
      text: `Check out my ${tripData.days}-day itinerary for ${tripData.destination.name}! 
Budget: ₹${tripData.budget} for ${tripData.travelers} travelers
Total Cost: ₹${totalCost * parseInt(tripData.travelers)}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const textToCopy = `${shareData.title}\n${shareData.text}`;
        await navigator.clipboard.writeText(textToCopy);
        alert('Trip details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        const textToCopy = `${shareData.title}\n${shareData.text}`;
        await navigator.clipboard.writeText(textToCopy);
        alert('Trip details copied to clipboard!');
      } catch (clipboardError) {
        alert('Unable to share. Please try again.');
      }
    }
  };

  const getPeriodGradient = (period) => {
    switch (period) {
      case 'Morning': return 'from-amber-50 to-yellow-50 border-amber-300';
      case 'Afternoon': return 'from-orange-50 to-red-50 border-orange-300';
      case 'Evening': return 'from-rose-50 to-pink-50 border-rose-300';
      case 'Night': return 'from-indigo-50 to-purple-50 border-indigo-300';
      default: return 'from-gray-50 to-slate-50 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Creating Your Perfect Itinerary</h2>
          <p className="text-gray-600">AI is crafting a personalized plan just for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
        }

        .timeline-line {
          position: absolute;
          left: 20px;
          top: 60px;
          bottom: 30px;
          width: 3px;
          background: linear-gradient(to bottom, #6366f1, #a855f7, #ec4899);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4 mt-10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Planning
          </button>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-5xl mb-2">{tripData.destination.image}</div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-blue-400 mb-2">
                  {tripData.destination.name}
                </h1>
                <p className="text-gray-600 text-lg">{tripData.destination.state} • {tripData.days} Days Trip</p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleShare}
                  className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                  title="Share this itinerary"
                >
                  <Share2 className="w-6 h-6 text-indigo-500 group-hover:text-indigo-600" />
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                  title="Download as text file"
                >
                  <Download className="w-6 h-6 text-purple-500 group-hover:text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Your Budget</p>
                <p className="text-2xl font-bold text-indigo-600">₹{tripData.budget}</p>
                <p className="text-xs text-gray-500 mt-1">For {tripData.travelers} travelers</p>
              </div>
              <DollarSign className="w-10 h-10 text-indigo-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Planned Cost</p>
                <p className="text-2xl font-bold text-purple-600">₹{totalCost * parseInt(tripData.travelers)}</p>
                <p className="text-xs text-gray-500 mt-1">Total for all travelers</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Per Person</p>
                <p className="text-2xl font-bold text-pink-600">₹{totalCost}</p>
                <p className="text-xs text-gray-500 mt-1">Cost per traveler</p>
              </div>
              <Users className="w-10 h-10 text-pink-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Daily Average</p>
                <p className="text-2xl font-bold text-rose-600">₹{Math.round(totalCost / parseInt(tripData.days))}</p>
                <p className="text-xs text-gray-500 mt-1">Per person per day</p>
              </div>
              <Calendar className="w-10 h-10 text-rose-500 opacity-20" />
            </div>
          </div>

          <div className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border-2 ${
            (totalCost * parseInt(tripData.travelers)) <= parseInt(tripData.budget) 
              ? 'border-green-400 bg-green-50/50' 
              : 'border-orange-400 bg-orange-50/50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Status</p>
                <p className={`text-lg font-bold ${
                  (totalCost * parseInt(tripData.travelers)) <= parseInt(tripData.budget)
                    ? 'text-green-600'
                    : 'text-orange-600'
                }`}>
                  {(totalCost * parseInt(tripData.travelers)) <= parseInt(tripData.budget)
                    ? '✓ Within Budget'
                    : 'Over Budget'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(totalCost * parseInt(tripData.travelers)) <= parseInt(tripData.budget)
                    ? `Savings: ₹${parseInt(tripData.budget) - (totalCost * parseInt(tripData.travelers))}`
                    : `Over by: ₹${(totalCost * parseInt(tripData.travelers)) - parseInt(tripData.budget)}`
                  }
                </p>
              </div>
              {(totalCost * parseInt(tripData.travelers)) <= parseInt(tripData.budget) ? (
                <div className="text-4xl">✅</div>
              ) : (
                <div className="text-4xl">⚠️</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            {itinerary && itinerary.map((dayPlan, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20"
              >
                {/* Day Header */}
                <button
                  onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
  {dayPlan.day}
</div>

                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-800">Day {dayPlan.day}</h3>
                      <p className="text-gray-600">{dayPlan.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Est. Cost</p>
                      <p className="font-bold text-indigo-600">₹{dayPlan.costBreakdown.total}</p>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        expandedDay === i ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedDay === i && (
                  <div className="border-t border-gray-100 p-6 bg-gradient-to-b from-gray-50/50 to-white/50">
                    {/* Activities */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-indigo-600" />
                        Activities Schedule
                      </h4>
                      <div className="space-y-4 relative pl-12">
                        <div className="timeline-line"></div>
                        {dayPlan.activities.map((activity, actIdx) => (
                          <div key={actIdx} className="relative">
                            <div className="absolute left-[-35px] top-3">
                              {getPeriodIcon(activity.period)}
                            </div>
                            <div className={`bg-gradient-to-br ${getPeriodGradient(activity.period)} rounded-2xl p-5 shadow-md border-2 hover:shadow-lg transition-all`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-semibold text-indigo-600">
                                      {activity.time}
                                    </span>
                                    <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                                      {activity.period}
                                    </span>
                                  </div>
                                  <h5 className="font-bold text-gray-800 text-lg mb-2">{activity.title}</h5>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <MapPin className="w-4 h-4" />
                                      <span className="text-sm">{activity.location}</span>
                                    </div>
                                    {activity.distance && activity.distance !== 'N/A' && (
                                      <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                          <Car className="w-3 h-3" />
                                          {activity.distance}
                                        </span>
                                        {activity.travelTime && activity.travelTime !== 'N/A' && (
                                          <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {activity.travelTime}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-xl shadow-md flex-shrink-0">
                                  <p className="text-xs text-gray-500">Cost</p>
                                  <p className="font-bold text-green-600">₹{activity.cost}</p>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">{activity.description}</p>
                              {activity.tips && (
                                <div className="bg-white/60 border-l-4 border-amber-400 p-3 rounded-lg">
                                  <div className="flex items-start gap-2">
                                    <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-700">
                                      <span className="font-semibold">Tip:</span> {activity.tips}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-indigo-600" />
                        Dining Recommendations
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-200 shadow-md">
                          <div className="flex items-center gap-2 mb-3">
                            <Coffee className="w-6 h-6 text-amber-600" />
                            <span className="font-bold text-gray-800">Breakfast</span>
                          </div>
                          <h6 className="font-semibold text-gray-800 mb-1">{dayPlan.meals.breakfast.place}</h6>
                          <p className="text-sm text-gray-600 mb-2">{dayPlan.meals.breakfast.dish}</p>
                          <p className="font-bold text-amber-600 text-lg">₹{dayPlan.meals.breakfast.cost}</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 border-2 border-orange-200 shadow-md">
                          <div className="flex items-center gap-2 mb-3">
                            <Utensils className="w-6 h-6 text-orange-600" />
                            <span className="font-bold text-gray-800">Lunch</span>
                          </div>
                          <h6 className="font-semibold text-gray-800 mb-1">{dayPlan.meals.lunch.place}</h6>
                          <p className="text-sm text-gray-600 mb-2">{dayPlan.meals.lunch.dish}</p>
                          <p className="font-bold text-orange-600 text-lg">₹{dayPlan.meals.lunch.cost}</p>
                        </div>

                        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border-2 border-rose-200 shadow-md">
                          <div className="flex items-center gap-2 mb-3">
                            <Moon className="w-6 h-6 text-rose-600" />
                            <span className="font-bold text-gray-800">Dinner</span>
                          </div>
                          <h6 className="font-semibold text-gray-800 mb-1">{dayPlan.meals.dinner.place}</h6>
                          <p className="text-sm text-gray-600 mb-2">{dayPlan.meals.dinner.dish}</p>
                          <p className="font-bold text-rose-600 text-lg">₹{dayPlan.meals.dinner.cost}</p>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border-2 border-indigo-200">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-indigo-600" />
                        Day {dayPlan.day} Budget Breakdown
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Activities</p>
                          <p className="font-bold text-indigo-600">₹{dayPlan.costBreakdown.activities}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Food</p>
                          <p className="font-bold text-purple-600">₹{dayPlan.costBreakdown.food}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Transport</p>
                          <p className="font-bold text-pink-600">₹{dayPlan.costBreakdown.transport}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Misc.</p>
                          <p className="font-bold text-rose-600">₹{dayPlan.costBreakdown.miscellaneous}</p>
                        </div>
                      </div>
                      <div className="border-t border-indigo-200 mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800">Total</span>
                          <span className="text-2xl font-bold text-indigo-600">₹{dayPlan.costBreakdown.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nearby Places */}
            {nearbyPlaces.length > 0 && (
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-8">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-bold text-gray-800">Nearby Attractions</h3>
                </div>
                <div className="space-y-3">
                  {nearbyPlaces.map((place, i) => (
                    <div key={i} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 card-hover">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{place.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{place.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{place.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleDownload}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-xl hover:from-indigo-600 hover:to-blue-200 transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Download Itinerary</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center gap-3 p-3 bg-white border-2 border-indigo-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                >
                  <Share2 className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-gray-700">Share Trip</span>
                </button>
                <button 
                  onClick={onBack}
                  className="w-full flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Plan New Trip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}