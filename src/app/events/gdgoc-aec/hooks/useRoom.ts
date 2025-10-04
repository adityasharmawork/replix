// File: hooks/useRoom.ts
import { useState, useEffect } from 'react';
import { Room } from '../utils/roomData';

export const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        console.log('Fetching room:', roomId); // Debug log
        
        const response = await fetch(`/api/rooms/${roomId}`);
        console.log('Response status:', response.status); // Debug log
        
        const result = await response.json();
        console.log('Response data:', result); // Debug log

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch room data');
        }

        setRoom(result.data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err); // Debug log
        setError(err instanceof Error ? err.message : 'Unknown error');
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  return { room, loading, error };
};
