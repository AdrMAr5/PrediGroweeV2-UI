import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Modal,
  IconButton,
  Backdrop,
  Fade,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Link,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IMAGES_SERVICE_URL, QUIZ_SERVICE_URL } from '@/Envs';
import { Parameter } from '@/types';
import ImagesClient from '@/Clients/ImagesClient';
import QuizClient from '@/Clients/QuizClient';
import Image from 'next/image';
import theme from '@/theme';

const faqContent = [
  {
    title: 'What is the Predigrowee app?',
    content: `The Predigrowee app is a project created by orthodontists and IT specialists focusing on the human ability to predict facial growth on the basis of cephalometric X-rays. Our goal is to compare how well human experts are able to predict facial growth in comparison to artificial intelligence.`,
  },
  {
    title: 'Why do we want to try to predict facial growth?',
    content: `The facial growth direction, amount, and timing are one of crucial pieces of information in many fields, such as orthodontics, pediatrics, criminology, or history. But let's focus on orthodontics. With the knowledge about facial growth prediction, orthodontists may create a successful treatment plan and implement early treatment in patients who need interceptive growth modifications or postpone treatment in patients who do not need it. The growth of the face can be estimated using different methods such as anthropometric measurements, measurements on cephalometric X-ray, CBCT, etc.`,
  },
  {
    title: 'What is the source of the cephalometric X-rays?',
    content: `In this project, we focused on cephalometric X-rays from AAOF Craniofacial Growth Legacy Collection.<br><br>
    Collections included: Bolton-Brush, Burlington, Denver, Fels Longitudinal, Forsyth Twin, Iowa, Mathews, Michigan, Oregon.<br><br>
    Please find more detailed information about the source of the X-rays here: <a href="https://www.aaoflegacycollection.org/aaof_home.html">AAOF Legacy Collection</a>`,
  },
  {
    title: 'How many cases are there?',
    content: `There are 453 cases.<br><br>From the AAOF Craniofacial Growth Legacy Collection, we chose only those patients who had X-rays around the age of 9 (before the pubertal growth spurt), 12 (close to the pubertal growth spurt), and 18 (after the pubertal growth spurt).<br><br>We excluded patients who underwent orthodontic treatment – based on braces seen on the X-rays – or if the X-rays were unclear.`,
  },
  {
    title: 'What are the types of facial growth?',
    content: `The type of facial growth, i.e., its direction, intensity, and duration, can be favorable, neutral, or unfavorable when viewed from the clinical perspective. Favorable (horizontal) face growth takes place when elements of the face grow in a direction or with intensity promoting advantageous treatment outcome, while unfavorable (vertical) growth occurs when growth characteristics do not facilitate treatment.`,
  },
  {
    title: 'What task do I have in this app?',
    content: `In this application, we ask you to try to predict facial growth on the basis of the cephalometric X-rays and some cephalometric measurements and decide whether the growth is vertical, horizontal or normal.`,
  },
];

const publications = [
  {
    authors:
      'Kaźmierczak, S., Juszka, Z., Vandevska-Radunovic, V., Maal, T.J.J., Fudalej, P., Mańdziuk, J.',
    year: '2021',
    title: 'Prediction of the Facial Growth Direction is Challenging',
    publication:
      'Neural Information Processing. ICONIP 2021. Communications in Computer and Information Science, vol 1517. Springer, Cham',
    doi: 'https://doi.org/10.1007/978-3-030-92310-5_77',
  },
  {
    authors:
      'Kaźmierczak, S., Juszka, Z., Grzeszczuk, R., Kurdziel, M., Vandevska-Radunovic, V., Fudalej, P., & Mańdziuk, J.',
    year: '2023',
    title: 'Prediction of the facial growth direction: Regression perspective',
    publication: 'Communications in Computer and Information Science (pp. 395–407)',
    doi: 'https://doi.org/10.1007/978-981-99-1648-1_33',
  },
];

const team = {
  coordinator: {
    role: 'Project coordinator',
    name: 'Dawid Juszka, PhD PhD',
    affiliation: 'AGH University of Krakow, Kraków, Poland',
  },
  support: [
    {
      name: 'Zofia Juszka, DDS',
      affiliation: "Prof. Loster's Orthodontics, Kraków, Poland",
    },
    {
      name: 'Prof. dr hab. n. med. Piotr Fudalej',
      affiliation:
        'Jagiellonian University Medical College in Krakow, Kraków, Poland; University of Bern, Bern, Switzerland; Palacký University Olomouc, Olomouc, Czech Republic',
    },
  ],
  developer: {
    role: 'Web Developer',
    name: 'Adrian Markowski',
    affiliation: 'Cybersecurity Student, AGH University of Krakow, Kraków, Poland',
  },
};

export default function About() {
  const [parameters, setParameters] = React.useState<Parameter[]>([]);
  const [images, setImages] = React.useState<Record<number, string>>({});
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const imagesClient = React.useMemo(() => new ImagesClient(IMAGES_SERVICE_URL), []);
  const quizClient = React.useMemo(() => new QuizClient(QUIZ_SERVICE_URL), []);
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    const loadParameters = async () => {
      try {
        const data = await quizClient.getAllParameters();
        setParameters(data);
      } catch (error) {
        console.error('Failed to load parameters:', error);
      }
    };
    loadParameters();
  }, [quizClient]);

  const fetchImage = React.useCallback(
    async (paramId: number) => {
      if (!paramId) {
        return;
      }
      try {
        const response = await imagesClient.getParamImage(paramId);
        if (response instanceof Blob) {
          return URL.createObjectURL(response);
        }
        throw new Error('Response is not a Blob');
      } catch (error) {
        console.error('Failed to fetch image:', error);
        return '';
      }
    },
    [imagesClient]
  );
  React.useEffect(() => {
    if (parameters.length > 0) {
      parameters.forEach(async (param) => {
        const url = await fetchImage(param.id);
        if (url) setImages((prev) => ({ ...prev, [param.id]: url }));
      });
    }
  }, [parameters, fetchImage]);

  return (
    <>
      <TopNavBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Introduction Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About Predigrowee
          </Typography>
          <Typography variant="body1" paragraph>
            The Predigrowee app is a project created by orthodontists and IT specialists focusing on
            the human ability to predict facial growth on the basis of cephalometric X-rays. This is
            the second version of the project - Predigrowee 2.0 which extends application features.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Publications
          </Typography>
          {publications.map((pub, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {pub.authors} ({pub.year}). <em>{pub.title}</em>. {pub.publication}.
              </Typography>
              <Link href={pub.doi} target="_blank" rel="noopener noreferrer">
                {pub.doi}
              </Link>
            </Box>
          ))}
        </Paper>

        {/* FAQ Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqContent.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{faq.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  dangerouslySetInnerHTML={{ __html: faq.content }}
                  sx={{ '& a': { color: 'primary.main' } }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        {/* Team Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Our Team
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {team.coordinator.role}
            </Typography>
            <Typography>{team.coordinator.name}</Typography>
            <Typography color="text.secondary">{team.coordinator.affiliation}</Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Content and substantive support
            </Typography>
            {team.support.map((member, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography>{member.name}</Typography>
                <Typography color="text.secondary">{member.affiliation}</Typography>
              </Box>
            ))}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {team.developer.role}
            </Typography>
            <Typography>{team.developer.name}</Typography>
            <Typography color="text.secondary">{team.developer.affiliation}</Typography>
          </Box>
        </Paper>

        {/* Parameters Section */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Cephalometric Parameters
          </Typography>

          <Grid container spacing={3}>
            {parameters.map((param) => (
              <Grid item xs={12} sm={6} md={4} key={param.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .zoom-button': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={images[param.id] || '/no_image.png'}
                      alt={param.name}
                      sx={{ objectFit: 'contain', px: 1, bgcolor: 'grey.50' }}
                    />
                    {!mobile && (
                      <IconButton
                        className="zoom-button"
                        onClick={() => setSelectedImage(images[param.id])}
                        sx={{
                          position: 'absolute',
                          right: 12,
                          top: 24,
                          bgcolor: 'rgba(255, 255, 255, 0.8)',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                          },
                        }}
                      >
                        <ZoomInIcon />
                      </IconButton>
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {param.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {param.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Reference Value: {param.referenceValues}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Image Modal */}
        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={!!selectedImage}>
            <Box
              sx={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
              }}
            >
              <IconButton
                onClick={() => setSelectedImage(null)}
                sx={{
                  position: 'absolute',
                  right: -40,
                  top: -40,
                  color: 'white',
                }}
              >
                <CloseIcon />
              </IconButton>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Zoomed parameter"
                  width={700}
                  height={700}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}
