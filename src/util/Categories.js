const Categories = {
  food: {
    types: [{
      label: 'Bakery',
      value: 'bakery'
    },
    {
      label: 'Bar',
      value: 'bar'
    },
    {
      label: 'Cafe',
      value: 'cafe'
    },
    {
      label: 'Restaurant',
      value: 'restaurant'
    },
    {
      label: 'Ethnicity',
      value: 'ethnicity',
      group: [{
        value: 'restaurant:chinese',
        label: 'Chinese'
      },
      {
        value: 'restaurant:french',
        label: 'French'
      },
      {
        value: 'restaurant:greek',
        label: 'Greek'
      },
      {
        value: 'restaurant:indian',
        label: 'Indian'
      },
      {
        value: 'restaurant:italian',
        label: 'Italian'
      },
      {
        value: 'restaurant:japanese',
        label: 'Japanese'
      },
      {
        value: 'restaurant:mediterranean',
        label: 'Mediterranean'
      },
      {
        value: 'restaurant:mexican',
        label: 'Mexican'
      },
      {
        value: 'restaurant:spanish',
        label: 'Spanish'
      },
      {
        value: 'restaurant:thai',
        label: 'Thai'
      }]
    }],
    defaultType: 'restaurant'
  },
  entertainment: {
    types: [{
      label: 'Aquarium',
      value: 'aquarium'
    },
    {
      label: 'Amusement Park',
      value: 'amusement_park'
    },
    {
      label: 'Art Gallery',
      value: 'art_gallery'
    },
    {
      label: 'Bowling Alley',
      value: 'bowling_alley'
    },
    {
      label: 'Casino',
      value: 'casino'
    },
    {
      label: 'Movie Theater',
      value: 'movie_theater'
    },
    {
      label: 'Museum',
      value: 'museum'
    },
    {
      label: 'Night Club',
      value: 'night_club'
    },
    {
      label: 'Park',
      value: 'park'
    },
    {
      label: 'Stadium',
      value: 'stadium'
    },
    {
      label: 'Zoo',
      value: 'zoo'
    }],
    defaultType: 'night_club'
  },
  stores: {
    types: [{
      label: 'Bicycles',
      value: 'bicycle_store'
    },
    {
      label: 'Books',
      value: 'book_store'
    },
    {
      label: 'Clothing',
      value: 'clothing_store'
    },
    {
      label: 'Convenience Store',
      value: 'convenience_store'
    },
    {
      label: 'Department Store',
      value: 'department_store'
    },
    {
      label: 'Electronics',
      value: 'electronics_store'
    },
    {
      label: 'Furniture',
      value: 'furniture_store'
    },
    {
      label: 'Gas Station',
      value: 'gas_station'
    },
    {
      label: 'Hardware',
      value: 'hardware_store'
    },
    {
      label: 'Home Goods',
      value: 'home_goods_store'
    },
    {
      label: 'Jewelry',
      value: 'jewelry_store'
    },
    {
      label: 'Liquor',
      value: 'liquor_store'
    },
    {
      label: 'Pets',
      value: 'pet_store'
    },
    {
      label: 'Shoes',
      value: 'shoe_store'
    },
    {
      label: 'Supermarket',
      value: 'supermarket'
    },
    {
      label: 'Shopping Mall',
      value: 'shopping_mall'
    }],
    defaultType: 'supermarket'
  },
  services: {
    types: [{
      label: 'Bank',
      value: 'bank'
    },
    {
      label: 'Beauty Salon',
      value: 'beauty_salon'
    },
    {
      label: 'Car Repair',
      value: 'car_repair'
    },
    {
      label: 'Car Wash',
      value: 'car_wash'
    },
    {
      label: 'Dentist ',
      value: 'dentist'
    },
    {
      label: 'Doctor',
      value: 'doctor'
    },
    {
      label: 'Florist',
      value: 'florist'
    },
    {
      label: 'Hair Care',
      value: 'hair_care'
    },
    {
      label: 'Hospital',
      value: 'hospital'
    },
    {
      label: 'Insurance Agency',
      value: 'insurance_agency'
    },
    {
      label: 'Accounting',
      value: 'accounting'
    },
    {
      label: 'Laundry',
      value: 'laundry'
    },
    {
      label: 'Local Government Office',
      value: 'local_government_office'
    },
    {
      label: 'Pharmacy',
      value: 'pharmacy'
    },
    {
      label: 'Post Office',
      value: 'post_office'
    },
    {
      label: 'Real Estate Agency',
      value: 'real_estate_agency'
    },
    {
      label: 'Spa',
      value: 'spa'
    },
    {
      label: 'Travel Agency',
      value: 'travel_agency'
    },
    {
      label: 'Veterinary Care',
      value: 'veterinary_care'
    }],
    defaultType: 'beauty_salon'
  },
  transit: {
    types: [
      {
        label: 'Airport',
        value: 'airport'
      },
      {
        label: 'Bus Station',
        value: 'bus_station'
      },
      {
        label: 'Car Rental',
        value: 'car_rental'
      },
      {
        label: 'Subway Station',
        value: 'subway_station'
      },
      {
        label: 'Taxi Stand',
        value: 'taxi_stand'
      },
      {
        label: 'Train Station',
        value: 'train_station'
      },
      {
        label: 'Transit Station',
        value: 'transit_station'
      }],
    defaultType: 'airport'
  }
}

export default Categories
