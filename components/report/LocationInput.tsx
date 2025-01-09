import { useState } from 'react';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void;
}

export function LocationInput({
  value,
  onChange,
  onCoordinatesChange,
}: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const BASE_URL = 'http://api.positionstack.com/v1/';

  const fetchCoordinates = async (address: string) => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      const response = await fetch(
        `${BASE_URL}forward?access_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(
          address
        )}&limit=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data.');
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const { latitude, longitude } = data.data[0];
        onCoordinatesChange?.(latitude, longitude);
        onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      } else {
        throw new Error('No location found for the given address.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setLocationError(
        error instanceof Error ? error.message : 'Failed to fetch location.'
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      const response = await fetch(
        `${BASE_URL}reverse?access_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${latitude},${longitude}&limit=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data.');
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const address = data.data[0].label || 'Unknown location';
        onChange(address);
        onCoordinatesChange?.(latitude, longitude);
      } else {
        throw new Error('No address found for the given coordinates.');
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      setLocationError(
        error instanceof Error ? error.message : 'Failed to fetch location.'
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const fetchCurrentLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser.');
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await reverseGeocode(latitude, longitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              throw new Error(
                'Please allow location access in your browser settings.'
              );
            case error.POSITION_UNAVAILABLE:
              throw new Error('Location information is unavailable.');
            case error.TIMEOUT:
              throw new Error('Location request timed out.');
            default:
              throw new Error('An unknown error occurred.');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      console.error('Location error:', error);
      setLocationError(
        error instanceof Error ? error.message : 'Unable to get your location.'
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400 mt-4">
        *Location
      </label>
      <div className="relative">
        <input
          type="text"
          autoComplete="street-address"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter location or click GPS icon"
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 pl-4 pr-12 py-3.5
                     text-white transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        <button
          type="button"
          onClick={fetchCurrentLocation}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-1.5 ml-auto
                   rounded-lg bg-sky-500/10 text-sky-400 
                   hover:bg-sky-500/20 transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGettingLocation}
          title="Use current location"
        >
          {isGettingLocation ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
      </div>
      {locationError && (
        <p className="text-sm text-red-400 flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {locationError}
        </p>
      )}
    </div>
  );
}