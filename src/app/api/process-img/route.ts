import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image_url, bounding_box } = body

    // Here you would typically call your actual image processing API
    // For this example, we'll just return mock data

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock response
    const response = {
      original_image_url: image_url,
      processed_image_url: `${image_url}?processed=true`
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}

