// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, phone, rating, gender, age, address } = body

    // Basic validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 })
    }

    if (!phone || typeof phone !== 'string' || !/^[0-9+\s-]{7,15}$/.test(phone.trim())) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
    }

    if (!gender || !['male', 'female'].includes(gender)) {
      return NextResponse.json({ error: 'Please select a gender.' }, { status: 400 })
    }

    const ageNum = Number(age)
    if (!age || isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
      return NextResponse.json({ error: 'Please enter a valid age.' }, { status: 400 })
    }

    if (!address || typeof address !== 'string' || address.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your address.' }, { status: 400 })
    }

    // Rating is optional
    let ratingNum: number | null = null
    if (rating !== '' && rating !== undefined && rating !== null) {
      ratingNum = Number(rating)
      if (isNaN(ratingNum)) {
        return NextResponse.json({ error: 'Rating must be a number.' }, { status: 400 })
      }
    }

    const registration = await prisma.registration.create({
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        rating: ratingNum,
        gender,
        age: ageNum,
        address: address.trim(),
      },
    })

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}