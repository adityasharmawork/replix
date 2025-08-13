// app/api/rooms/[roomId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getRoomData } from '../../../events/mindmaze/utils/roomData';

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const roomId = params.roomId;
    console.log('Requested room ID:', roomId); // Debug log
    
    const roomData = getRoomData(roomId);
    
    if (!roomData) {
      console.log('Room not found for ID:', roomId); // Debug log
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: roomData
    });
  } catch (error) {
    console.error('API Error:', error); // Debug log
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}