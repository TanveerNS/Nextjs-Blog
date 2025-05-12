import { cookies } from 'next/headers';
import { createResponse } from '@/utils/responseHandler';

export async function POST() {
  try {
    cookies().set('token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return createResponse({
      code: 200,
      status: true,
      message: 'Logged out successfully.',
    });
  } catch (err) {
    return createResponse({
      code: 500,
      status: false,
      message: 'Logout failed.',
    });
  }
}
