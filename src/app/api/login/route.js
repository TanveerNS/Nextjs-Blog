import connectDb from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { createResponse } from '@/utils/responseHandler';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return createResponse({
      code: 400,
      status: false,
      message: 'Please provide both email and password.',
    });
  }

  try {
    await connectDb();
    const user = await User.findOne({ email });

    if (!user) {
      return createResponse({ code: 404, status: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return createResponse({ code: 401, status: false, message: 'Invalid credentials.' });
    }

    const token = signToken({ userId: user._id });

    // Set cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return createResponse({
      code: 200,
      status: true,
      data: { userId: user._id, name: user.name, token: token },
      message: 'Login successful!',
    });
  } catch (err) {
    console.error(err);
    return createResponse({ code: 500, status: false, message: 'Server error.' });
  }
}
