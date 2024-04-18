import React, { useState, Fragment } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from 'components/Form'
import { getCroppedImg } from './utils'
import { Box } from '@mui/material'

export default function ImageCropper({ image, setOpen, setImageFile }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const saveCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      console.log(croppedImage)
      setImageFile(croppedImage)
      setOpen(false)
    } catch (e) {
      console.error(e)
      setOpen(false)
    }
  }

  return (
    <Fragment>
      <Box sx={{ height: 340 }}>
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>
      <Box sx={{ px: 5 }}>
        <Button
          onClick={saveCroppedImage}
          variant="contained"
          color="primary"
        >
          Save Result
        </Button>
      </Box>
    </Fragment>

  )
}