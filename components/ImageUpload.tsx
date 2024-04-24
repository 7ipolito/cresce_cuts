'use client'

import { useState } from 'react'
import { UploadButton } from '../utils/uploadthing'

const ImageIpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res)
          setImageUrl(res[0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </div>
  )
}

export default ImageIpload
