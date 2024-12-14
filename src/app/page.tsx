'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function ImageProcessor() {
  const [imageUrl, setImageUrl] = useState('')
  const [xMin, setXMin] = useState('')
  const [yMin, setYMin] = useState('')
  const [xMax, setXMax] = useState('')
  const [yMax, setYMax] = useState('')
  const [originalImage, setOriginalImage] = useState('')
  const [processedImage, setProcessedImage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setOriginalImage('')
    setProcessedImage('')

    const payload = {
      image_url: imageUrl,
      bounding_box: {
        x_min: parseInt(xMin),
        y_min: parseInt(yMin),
        x_max: parseInt(xMax),
        y_max: parseInt(yMax)
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setOriginalImage(data.original_image_url)
        setProcessedImage(data.processed_image_url)
      } else {
        setError(data.error || 'An error occurred while processing the image.')
      }
    } catch (err) {
      setError('An error occurred while sending the request.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Processor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="xMin">Min X</Label>
            <Input
              id="xMin"
              type="number"
              value={xMin}
              onChange={(e) => setXMin(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="yMin">Min Y</Label>
            <Input
              id="yMin"
              type="number"
              value={yMin}
              onChange={(e) => setYMin(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="xMax">Max X</Label>
            <Input
              id="xMax"
              type="number"
              value={xMax}
              onChange={(e) => setXMax(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="yMax">Max Y</Label>
            <Input
              id="yMax"
              type="number"
              value={yMax}
              onChange={(e) => setYMax(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit">Process Image</Button>
      </form>

      {error && (
        <Card className="p-4 mb-4 bg-red-100 text-red-700">
          {error}
        </Card>
      )}

      {(originalImage || processedImage) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {originalImage && (
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-2">Original Image</h2>
              <img src={originalImage} alt="Original" className="w-80 h-auto" />
            </Card>
          )}
          {processedImage && (
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-2">Processed Image</h2>
              <img src={processedImage} alt="Processed" className="w-80 h-auto" />
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

