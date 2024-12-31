import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Link from 'next/link';

export default function Contact() {
  const contactEmail = 'predigrowee2.0@gmail.com';

  return (
    <>
      <TopNavBar />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Contact us
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            Thank you for visiting our website.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ px: 5 }}>
            If you have any questions or concerns, please don&apos;t hesitate to contact us. We are
            always happy to hear from our visitors and will do our best to assist you in any way we
            can. You can reach us via email at{' '}
            <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>.
            <br />
            We look forward to hearing from you!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
