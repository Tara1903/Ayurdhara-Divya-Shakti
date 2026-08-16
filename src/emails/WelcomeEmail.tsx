import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr, Img, Link } from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userFirstname?: string;
}

export default function WelcomeEmail({ userFirstname }: WelcomeEmailProps) {
  const previewText = `Welcome to Ayurdhara Divya Shakti, ${userFirstname || 'friend'}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerText}>Ayurdhara Divya Shakti</Heading>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>
              Namaste {userFirstname ? `${userFirstname},` : 'friend,'}
            </Text>
            
            <Text style={paragraph}>
              Welcome to the Ayurdhara Divya Shakti family! We are thrilled to have you join us on this journey towards holistic wellness and natural balance.
            </Text>
            
            <Text style={paragraph}>
              As a subscriber, you'll be the first to know about our authentic Ayurvedic formulations, exclusive wellness guides, and special community offers.
            </Text>
            
            <Section style={btnContainer}>
              <Link href="https://ayurdharadivyashakti.store/collections" style={button}>
                Explore Our Wellness Blends
              </Link>
            </Section>
            
            <Text style={paragraph}>
              With gratitude,<br />
              The Ayurdhara Team
            </Text>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Ayurdhara Divya Shakti. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Georgia, serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
};

const header = {
  padding: '32px 0',
  textAlign: 'center' as const,
  backgroundColor: '#2D5A27',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const headerText = {
  color: '#ffffff',
  fontSize: '28px',
  margin: '0',
  fontWeight: 'normal',
};

const content = {
  padding: '32px 40px',
};

const greeting = {
  fontSize: '20px',
  lineHeight: '28px',
  color: '#2D5A27',
  fontWeight: 'bold',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#444444',
  fontFamily: 'sans-serif',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#E88B23',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
};

const hr = {
  borderColor: '#eeeeee',
  margin: '20px 0',
};

const footer = {
  padding: '0 40px',
};

const footerText = {
  fontSize: '12px',
  color: '#8898aa',
  textAlign: 'center' as const,
  fontFamily: 'sans-serif',
};
