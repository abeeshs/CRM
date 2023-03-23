import { Skeleton, Stack } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <div>
        <Stack spacing={1} padding={1}>
        <Skeleton variant="rounded" width={240} height={40} />
        <Skeleton variant="rounded" width={240} height={40} />
        <Skeleton variant="rounded" width={240} height={40} />
        <Skeleton variant="rounded" width={240} height={40} />
        <Skeleton variant="rounded" width={240} height={40} />
        <Skeleton variant="rounded" width={240} height={40} />
        <Skeleton variant="rounded" width={240} height={40} />
        </Stack>
      
    </div>
  )
}

export default Loading
