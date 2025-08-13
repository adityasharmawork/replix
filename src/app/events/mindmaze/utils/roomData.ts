// File: utils/roomData.ts
import competitionData from '../../../../../test_data.json';

export interface Room {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: string;
  memoryLimit: string;
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  testInput: string;
  expectedOutput: string;
}

// Type guard function to validate Room data
const isValidRoom = (room: any): room is Room => {
  return room &&
    typeof room.id === 'string' &&
    typeof room.title === 'string' &&
    ['Easy', 'Medium', 'Hard'].includes(room.difficulty) &&
    typeof room.timeLimit === 'string' &&
    typeof room.memoryLimit === 'string' &&
    Array.isArray(room.tags) &&
    typeof room.description === 'string' &&
    typeof room.inputFormat === 'string' &&
    typeof room.outputFormat === 'string' &&
    Array.isArray(room.examples) &&
    typeof room.testInput === 'string' &&
    typeof room.expectedOutput === 'string';
};

export const getRoomData = (roomId: string): Room | null => {
  // Handle case sensitivity - try exact match first, then case variations
  let room:any = competitionData.rooms[roomId as keyof typeof competitionData.rooms];
  
  if (!room) {
    // Try uppercase version
    const upperRoomId = roomId.toUpperCase();
    room = competitionData.rooms[upperRoomId as keyof typeof competitionData.rooms];
  }
  
  if (!room) {
    // Try finding by ID field (case insensitive)
    const rooms = Object.values(competitionData.rooms);
    room = rooms.find(r => r.id.toLowerCase() === roomId.toLowerCase()) || null;
  }
  
  console.log('Looking for room:', roomId, 'Found:', !!room); // Debug log
  
  // Validate and return the room data
  if (room && isValidRoom(room)) {
    return room;
  }
  
  return null;
};

export const getAllRoomIds = (): string[] => {
  return Object.keys(competitionData.rooms);
};

export const getRoomsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Room[] => {
  return Object.values(competitionData.rooms)
    .filter((room): room is Room => isValidRoom(room) && room.difficulty === difficulty);
};