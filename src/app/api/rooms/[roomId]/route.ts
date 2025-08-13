// // app/api/rooms/[roomId]/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { roomId: string } }
// ) {
//   try {
//     const roomId = params.roomId;
//     console.log('Requested room ID:', roomId); // Debug log
    
//     const roomData = getRoomData(roomId);
    
//     if (!roomData) {
//       console.log('Room not found for ID:', roomId); // Debug log
//       return NextResponse.json(
//         { error: 'Room not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error); // Debug log
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
















// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   // ✅ Accept the full context object with the correct type
//   context: { params: { roomId: string } }
// ) {
//   try {
//     // ✅ Destructure params from the context object
//     const { params } = context;
//     const roomId = params.roomId;
    
//     console.log('Requested room ID:', roomId); // Debug log
    
//     const roomData = getRoomData(roomId);
    
//     if (!roomData) {
//       console.log('Room not found for ID:', roomId); // Debug log
//       return NextResponse.json(
//         { error: 'Room not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error); // Debug log
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }






// import { NextRequest, NextResponse } from 'next/server';

// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { roomId: string } } // ✅ Correct typing
// ) {
//   try {
//     const roomId = params.roomId;

//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json(
//         { error: 'Room not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }






// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// interface RoomRouteContext {
//   params: {
//     roomId: string;
//   };
// }

// export async function GET(
//   request: NextRequest,
//   { params }: RoomRouteContext
// ) {
//   try {
//     const roomId = params.roomId;
//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }




// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { roomId: string } }
// ) {
//   try {
//     const roomId = params.roomId;
//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }







// src/app/api/rooms/[roomId]/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// // Define a type for the context object for clarity
// type RouteContext = {
//   params: {
//     roomId: string;
//   };
// };

// export async function GET(request: NextRequest, context: RouteContext) {
//   try {
//     // Destructure params from the context object
//     const { params } = context;
//     const roomId = params.roomId;
//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }



// src/app/api/rooms/[roomId]/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   // Use an inline type for the context object directly in the signature
//   context: { params: { roomId: string } }
// ) {
//   try {
//     const { params } = context;
//     const roomId = params.roomId;
//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }



// src/app/api/rooms/[roomId]/route.ts
// import { NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// type Params = Promise<{ roomId: string }>;

// export async function GET(request: Request, { params }: { params: Params }) {
//   try {
//     const { roomId } = await params; // <-- await the params Promise
//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, data: roomData });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }




// src/app/api/rooms/[roomId]/submit/route.ts
// import { NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// type Params = Promise<{ roomId: string }>;

// export async function POST(request: Request, { params }: { params: Params }) {
//   try {
//     const { roomId } = await params;
//     console.log('Submit to roomId:', roomId);

//     const room = getRoomData(roomId);
//     if (!room) {
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     const body = await request.json(); // e.g. { code, language, ... }
//     // perform submission handling here...
//     console.log('Submission body:', body);

//     return NextResponse.json({ success: true, received: body });
//   } catch (err) {
//     console.error('Submit API error:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }







// src/app/api/rooms/[roomId]/submit/route.ts
// import { NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// type ParamsPromise = Promise<{ roomId: string }>;

// export async function POST(request: Request, { params }: { params: ParamsPromise }) {
//   try {
//     // await the params Promise (this is the important part)
//     const { roomId } = await params;
//     console.log('Submission to roomId:', roomId);

//     // validate room exists
//     const room = getRoomData(roomId);
//     if (!room) {
//       console.warn(`Room not found: ${roomId}`);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     // parse JSON body safely
//     let body: any;
//     try {
//       body = await request.json();
//     } catch (err) {
//       console.warn('Invalid JSON body in submission', err);
//       return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
//     }

//     // Basic validation (adjust fields as your frontend sends them)
//     const { code, language, meta } = body || {};
//     if (typeof code !== 'string' || code.trim() === '') {
//       return NextResponse.json({ error: 'Missing or invalid "code" field' }, { status: 400 });
//     }
//     if (typeof language !== 'string' || language.trim() === '') {
//       return NextResponse.json({ error: 'Missing or invalid "language" field' }, { status: 400 });
//     }

//     // TODO: handle the actual submission logic:
//     // - save to DB
//     // - run tests / compile
//     // - enqueue job for async judge (if you have a worker)
//     // For now we echo back the submission for quick testing.
//     console.log('Submission received for', roomId, { language, meta });

//     return NextResponse.json({
//       success: true,
//       roomId,
//       received: { language, meta, codePreview: code.slice(0, 120) },
//     });
//   } catch (err) {
//     console.error('Submission handler error:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }





// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ roomId: string }> }
// ) {
//   try {
//     const { roomId } = await params;
//     console.log('Requested room ID:', roomId);

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       console.log('Room not found for ID:', roomId);
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }




// src/app/api/rooms/[roomId]/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// export async function GET(
//   request: NextRequest,
//   context: { params: { roomId: string } }
// ) {
//   try {
//     const { roomId } = context.params;

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }




// src/app/api/rooms/[roomId]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getRoomData } from '../../../events/mindmaze/utils/roomData';

// // `params` is a Promise in Next 15, so type it as a Promise and await it.
// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<{ roomId: string }> }
// ) {
//   try {
//     const { roomId } = await context.params; // <-- await the params Promise

//     const roomData = getRoomData(roomId);

//     if (!roomData) {
//       return NextResponse.json({ error: 'Room not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: roomData,
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }





// src/app/api/rooms/[roomId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getRoomData } from '../../../events/mindmaze/utils/roomData';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ roomId: string }> }
) {
  try {
    // In Next.js 15, params is a Promise that needs to be awaited
    const { roomId } = await context.params;
    console.log('Requested room ID:', roomId);

    const roomData = getRoomData(roomId);

    if (!roomData) {
      console.log('Room not found for ID:', roomId);
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: roomData
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}