const propertyData = [
  {
    id: 1,
    title: "Modern 3 Bedroom Apartment",
    address: "123 Main Avenue, Gregory Hills, NSW",
    suburb: "Gregory Hills",
    price: 850000,
    beds: 3,
    baths: 2,
    parking: 1,
    size: 95,
    image: "/images/property-1.jpg",
    coordinates: { lat: -33.891967, lng: 151.138269 },
    description: "This stunning modern apartment offers spacious living in the heart of Gregory Hills. Featuring high ceilings, premium finishes, and an open-plan design that maximizes natural light and space.",
    highlights: [
      "Brand new construction with premium finishes",
      "Open-plan living area with floor-to-ceiling windows",
      "Modern kitchen with stone countertops and stainless steel appliances",
      "Master bedroom with ensuite and walk-in wardrobe",
      "Private balcony with city views",
      "Secure parking with storage cage"
    ],
    features: [
      "Air conditioning",
      "Built-in wardrobes",
      "Intercom",
      "Internal laundry",
      "Dishwasher",
      "Study nook",
      "NBN ready",
      "Pet friendly building"
    ],
    investment: {
      rentalYield: 3.5,
      capitalGrowth: 6.4,
      weeklyCashflow: 35,
      analysis: "This property offers strong investment potential with above-average rental yield for the area and excellent capital growth prospects due to the ongoing development in Gregory Hills and surrounding infrastructure improvements."
    },
    amenities: [
      {
        id: "station",
        name: "Gregory Hills Train Station",
        distance: "350m",
        coordinates: { lat: -33.892967, lng: 151.139869 }
      },
      {
        id: "shopping",
        name: "Gregory Hills Shopping Centre",
        distance: "500m",
        coordinates: { lat: -33.887967, lng: 151.141869 }
      },
      {
        id: "school",
        name: "Gregory Hills Public School",
        distance: "750m",
        coordinates: { lat: -33.894967, lng: 151.136869 }
      },
      {
        id: "medical",
        name: "Gregory Hills Medical Centre",
        distance: "1.1km",
        coordinates: { lat: -33.885967, lng: 151.142869 }
      }
    ],
    agent: {
      name: "Jessica Smith",
      phone: "0412 345 678",
      email: "jessica.smith@realestate.com",
      image: "/images/agent-1.jpg",
      listedDate: "28 Mar 2025"
    }
  },
  {
    id: 2,
    title: "Spacious Family Home",
    address: "45 Park Street, Gregory Hills, NSW",
    suburb: "Gregory Hills",
    price: 1200000,
    beds: 4,
    baths: 3,
    parking: 2,
    size: 220,
    image: "/images/property-2.jpg",
    coordinates: { lat: -33.889967, lng: 151.137269 },
    description: "This beautiful family home offers generous living spaces and a perfect layout for modern family living. Set on a large block with landscaped gardens, this property provides the ideal balance of indoor and outdoor living.",
    highlights: [
      "Spacious open-plan living and dining areas",
      "Gourmet kitchen with island bench and walk-in pantry",
      "Master bedroom with ensuite and walk-in robe",
      "Covered alfresco area perfect for entertaining",
      "Landscaped gardens with irrigation system",
      "Double garage with internal access"
    ],
    features: [
      "Ducted air conditioning",
      "Alarm system",
      "Built-in wardrobes in all bedrooms",
      "Gas cooking",
      "Solar panels",
      "Water tank",
      "Garden shed",
      "Ceiling fans"
    ],
    investment: {
      rentalYield: 2.8,
      capitalGrowth: 7.2,
      weeklyCashflow: -45,
      analysis: "While this property has a lower rental yield typical of larger family homes in the area, it offers excellent capital growth potential due to its size, quality, and location in a high-demand family suburb."
    },
    amenities: [
      {
        id: "station",
        name: "Gregory Hills Train Station",
        distance: "650m",
        coordinates: { lat: -33.892967, lng: 151.139869 }
      },
      {
        id: "shopping",
        name: "Gregory Hills Shopping Centre",
        distance: "800m",
        coordinates: { lat: -33.887967, lng: 151.141869 }
      },
      {
        id: "school",
        name: "Gregory Hills Public School",
        distance: "450m",
        coordinates: { lat: -33.894967, lng: 151.136869 }
      },
      {
        id: "medical",
        name: "Gregory Hills Medical Centre",
        distance: "1.3km",
        coordinates: { lat: -33.885967, lng: 151.142869 }
      }
    ],
    agent: {
      name: "Robert Brown",
      phone: "0423 456 789",
      email: "robert.brown@realestate.com",
      image: "/images/agent-2.jpg",
      listedDate: "5 Mar 2025"
    }
  },
  {
    id: 3,
    title: "Contemporary Townhouse",
    address: "7/15 Railway Parade, Leppington, NSW 2179",
    suburb: "Leppington",
    price: 650000,
    beds: 3,
    baths: 2.5,
    parking: 1,
    size: 120,
    image: "/images/property-3.jpg",
    coordinates: { lat: -33.896967, lng: 150.805869 },
    description: "This stylish townhouse offers modern living in a convenient location. With a thoughtful layout and quality finishes throughout, this low-maintenance property is perfect for first home buyers, downsizers, or investors.",
    highlights: [
      "Modern open-plan design with plenty of natural light",
      "Quality kitchen with stone benchtops and stainless steel appliances",
      "Master bedroom with ensuite and built-in wardrobe",
      "Private courtyard perfect for entertaining",
      "Single garage with internal access",
      "Low strata fees and low maintenance living"
    ],
    features: [
      "Split system air conditioning",
      "Built-in wardrobes in all bedrooms",
      "Downstairs powder room",
      "Internal laundry",
      "NBN connected",
      "Security screens",
      "LED lighting throughout",
      "Water efficient fixtures"
    ],
    investment: {
      rentalYield: 3.5,
      capitalGrowth: 6.4,
      weeklyCashflow: 35,
      analysis: "This townhouse offers an attractive combination of solid rental yield and good capital growth potential. The low maintenance nature and affordable price point make it an excellent entry-level investment in a growing suburb."
    },
    amenities: [
      {
        id: "station",
        name: "Leppington Train Station",
        distance: "350m",
        coordinates: { lat: -33.897967, lng: 150.806869 }
      },
      {
        id: "shopping",
        name: "Leppington Shopping Centre",
        distance: "500m",
        coordinates: { lat: -33.895967, lng: 150.807869 }
      },
      {
        id: "school",
        name: "Leppington Public School",
        distance: "750m",
        coordinates: { lat: -33.898967, lng: 150.803869 }
      },
      {
        id: "medical",
        name: "Leppington Medical Centre",
        distance: "600m",
        coordinates: { lat: -33.894967, lng: 150.808869 }
      }
    ],
    agent: {
      name: "Jessica Smith",
      phone: "0412 345 678",
      email: "jessica.smith@realestate.com",
      image: "/images/agent-1.jpg",
      listedDate: "28 Mar 2025"
    }
  },
  {
    id: 4,
    title: "Modern Apartment with City Views",
    address: "12/45 Church Street, Parramatta, NSW 2150",
    suburb: "Parramatta",
    price: 850000,
    beds: 2,
    baths: 2,
    parking: 1,
    size: 110,
    image: "/images/property-4.jpg",
    coordinates: { lat: -33.815967, lng: 151.005869 },
    description: "This stunning apartment offers modern living with breathtaking city views. Located in the heart of Parramatta, this property combines luxury, convenience, and lifestyle in one perfect package.",
    highlights: [
      "Spectacular city views from floor-to-ceiling windows",
      "Premium kitchen with European appliances",
      "Master bedroom with ensuite and built-in wardrobe",
      "Large balcony perfect for entertaining",
      "Secure parking with storage cage",
      "Resort-style facilities including pool, gym, and sauna"
    ],
    features: [
      "Ducted air conditioning",
      "Built-in wardrobes in all bedrooms",
      "Video intercom",
      "Internal laundry",
      "NBN connected",
      "Smart home technology",
      "Double glazed windows",
      "Stone benchtops throughout"
    ],
    investment: {
      rentalYield: 3.0,
      capitalGrowth: 5.2,
      weeklyCashflow: 15,
      analysis: "This apartment offers a solid investment opportunity in a prime location. While the rental yield is moderate, the strong demand for quality apartments in Parramatta supports consistent rental income and steady capital growth."
    },
    amenities: [
      {
        id: "station",
        name: "Parramatta Train Station",
        distance: "450m",
        coordinates: { lat: -33.816967, lng: 151.006869 }
      },
      {
        id: "shopping",
        name: "Westfield Parramatta",
        distance: "350m",
        coordinates: { lat: -33.814967, lng: 151.007869 }
      },
      {
        id: "school",
        name: "Parramatta Public School",
        distance: "850m",
        coordinates: { lat: -33.817967, lng: 151.003869 }
      },
      {
        id: "medical",
        name: "Parramatta Medical Centre",
        distance: "500m",
        coordinates: { lat: -33.813967, lng: 151.008869 }
      }
    ],
    agent: {
      name: "Robert Brown",
      phone: "0423 456 789",
      email: "robert.brown@realestate.com",
      image: "/images/agent-2.jpg",
      listedDate: "5 Mar 2025"
    }
  },
  {
    id: 5,
    title: "Luxury Waterfront Apartment",
    address: "8/22 Harbour Street, Wollongong, NSW 2500",
    suburb: "Wollongong",
    price: 1500000,
    beds: 3,
    baths: 2,
    parking: 2,
    size: 150,
    image: "/images/property-5.jpg",
    coordinates: { lat: -34.425967, lng: 150.905869 },
    description: "This luxurious waterfront apartment offers an unparalleled lifestyle with stunning ocean views and premium finishes throughout. Perfect for those seeking a sophisticated coastal lifestyle.",
    highlights: [
      "Breathtaking ocean views from every room",
      "Gourmet kitchen with premium appliances and stone benchtops",
      "Master suite with walk-in wardrobe and ensuite",
      "Expansive balcony perfect for entertaining",
      "Double secure parking with storage",
      "Building amenities including pool, gym, and sauna"
    ],
    features: [
      "Ducted air conditioning",
      "Built-in wardrobes in all bedrooms",
      "Smart home automation",
      "Video intercom",
      "Internal laundry",
      "Wine cellar",
      "Floor-to-ceiling double glazed windows",
      "Custom joinery throughout"
    ],
    investment: {
      rentalYield: 2.5,
      capitalGrowth: 6.8,
      weeklyCashflow: -65,
      analysis: "While this luxury apartment offers a lower rental yield typical of premium properties, it provides excellent capital growth potential due to its prime waterfront location and limited supply of similar properties in the area."
    },
    amenities: [
      {
        id: "station",
        name: "Wollongong Train Station",
        distance: "750m",
        coordinates: { lat: -34.426967, lng: 150.906869 }
      },
      {
        id: "shopping",
        name: "Wollongong Central",
        distance: "550m",
        coordinates: { lat: -34.424967, lng: 150.907869 }
      },
      {
        id: "school",
        name: "Wollongong Public School",
        distance: "950m",
        coordinates: { lat: -34.427967, lng: 150.903869 }
      },
      {
        id: "medical",
        name: "Wollongong Medical Centre",
        distance: "650m",
        coordinates: { lat: -34.423967, lng: 150.908869 }
      }
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "0434 567 890",
      email: "sarah.johnson@realestate.com",
      image: "/images/agent-3.jpg",
      listedDate: "15 Feb 2025"
    }
  },
  {
    id: 6,
    title: "Family Home with Pool",
    address: "28 Eucalyptus Drive, Campbelltown, NSW 2560",
    suburb: "Campbelltown",
    price: 950000,
    beds: 4,
    baths: 2,
    parking: 2,
    size: 250,
    image: "/images/property-6.jpg",
    coordinates: { lat: -34.075967, lng: 150.805869 },
    description: "This spacious family home offers the perfect blend of comfort and lifestyle with a beautiful in-ground pool and entertaining area. Set on a large block in a quiet street, this property is ideal for growing families.",
    highlights: [
      "Spacious open-plan living areas with plenty of natural light",
      "Modern kitchen with stone benchtops and quality appliances",
      "Master bedroom with ensuite and walk-in wardrobe",
      "In-ground pool with paved entertaining area",
      "Double garage with workshop space",
      "Landscaped gardens with irrigation system"
    ],
    features: [
      "Ducted air conditioning",
      "Built-in wardrobes in all bedrooms",
      "Alarm system",
      "Solar panels",
      "Water tank",
      "Garden shed",
      "Ceiling fans throughout",
      "Gas heating"
    ],
    investment: {
      rentalYield: 3.2,
      capitalGrowth: 5.8,
      weeklyCashflow: -25,
      analysis: "This property offers a balanced investment opportunity with a moderate rental yield and solid capital growth potential. The family-friendly features and pool make it highly desirable for long-term tenants."
    },
    amenities: [
      {
        id: "station",
        name: "Campbelltown Train Station",
        distance: "1.2km",
        coordinates: { lat: -34.076967, lng: 150.806869 }
      },
      {
        id: "shopping",
        name: "Campbelltown Mall",
        distance: "950m",
        coordinates: { lat: -34.074967, lng: 150.807869 }
      },
      {
        id: "school",
        name: "Campbelltown Public School",
        distance: "850m",
        coordinates: { lat: -34.077967, lng: 150.803869 }
      },
      {
        id: "medical",
        name: "Campbelltown Hospital",
        distance: "1.5km",
        coordinates: { lat: -34.073967, lng: 150.808869 }
      }
    ],
    agent: {
      name: "Michael Chen",
      phone: "0445 678 901",
      email: "michael.chen@realestate.com",
      image: "/images/agent-4.jpg",
      listedDate: "10 Mar 2025"
    }
  }
];

export default propertyData;
