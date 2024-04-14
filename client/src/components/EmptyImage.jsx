import Skeleton from '@mui/material/Skeleton';

export default function EmptyImage(props) {
  const { width } = props

  return (
    <Skeleton animation={false} width={width} height={width} sx={{m: 0, p: 0}}/>
  );
}