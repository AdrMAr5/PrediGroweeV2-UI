import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

type InfoTipProps = {
  title: string;
  description: string;
  referenceValues?: string;
  contentImage: StaticImageData | null;
};

const InfoTip = ({ title, description, referenceValues, contentImage }: InfoTipProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
        sx={{ height: '32px', width: '32px' }}
      >
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box display="block">
            <Typography>{description}</Typography>
            {referenceValues && <Typography>Reference Value: {referenceValues}</Typography>}
            {contentImage && <Image src={contentImage} alt={title} layout="responsive" />}
          </Box>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoTip;
