import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { registerUser, validateUsername, validatePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    // Validate input
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    
    if (usernameError || passwordError) {
      return NextResponse.json(
        { 
          success: false, 
          errors: { 
            username: usernameError, 
            password: passwordError 
          } 
        }, 
        { status: 400 }
      );
    }
    
    // Register the user
    const result = await registerUser(username, password);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 