import React, { useState, Fragment } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from 'components/Form'
import getCroppedImg from './getCroppedImg'
import { useFormMethods } from 'components/Form'

export default function CropImage({ name, image, setOpen }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const { setValue } = useFormMethods()

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
      console.log('done', { croppedImage })
      setValue(name, croppedImage)
      setOpen(false)
    } catch (e) {
      console.error(e)
      setOpen(false)
    }
  }

  return (
    <Fragment>
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
      <Button
        onClick={saveCroppedImage}
        variant="contained"
        color="primary"
      >
        Save Result
      </Button>
    </Fragment>

  )
}