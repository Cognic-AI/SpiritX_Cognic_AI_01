import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { loginUser, validateUsername, validatePassword } from '@/lib/auth';

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
    
    // Login the user
    const result = await loginUser(username, password);
    
    if (result.success) {
      // Set the JWT token as an HTTP-only cookie
      const response = NextResponse.json(result, { status: 200 });
      response.cookies.set({
        name: 'auth_token',
        value: result.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      return response;
    } else {
      return NextResponse.json(result, { status: 401 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 