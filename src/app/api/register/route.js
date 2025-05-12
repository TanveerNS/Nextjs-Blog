import connectDb from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { createResponse } from '@/utils/responseHandler';

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return createResponse({
      code: 400,
      status: false,
      message: 'Please provide all fields.',
    });
  }

  try {
    await connectDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return createResponse({
        code: 409,
        status: false,
        message: 'User already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return createResponse({
      code: 201,
      status: true,
      data: { userId: user._id },
      message: 'User registered successfully!',
    });
  } catch (error) {
    console.error(error);
    return createResponse({
      code: 500,
      status: false,
      message: 'Something went wrong, try again later.',
    });
  }
}
