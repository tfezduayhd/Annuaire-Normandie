import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from '@react-email/components'

type WelcomeDesignerProps = {
  firstName: string
  lastName: string
}

export default function WelcomeDesigner({
  firstName = 'Prénom',
  lastName = 'Nom',
}: WelcomeDesignerProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Bienvenue sur Design Lab Normandie, {firstName} !</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bienvenue, {firstName} {lastName} !</Heading>
          <Text style={text}>
            Nous sommes ravis de vous accueillir dans la communauté Design Lab Normandie.
          </Text>
          <Text style={text}>
            Votre inscription a bien été reçue et sera examinée par notre équipe dans les plus brefs délais. 
            Vous recevrez une notification dès que votre profil sera validé.
          </Text>
          <Text style={text}>
            En attendant, n&apos;hésitez pas à découvrir les profils des designers déjà présents sur notre annuaire.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Design Lab Normandie — Le design normand, collectif et engagé
          </Text>
          <Link href="https://designlab-normandie.fr" style={link}>
            designlab-normandie.fr
          </Link>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#F5F2ED',
  fontFamily: '"DM Sans", system-ui, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 24px',
  maxWidth: '560px',
}

const h1 = {
  color: '#1A1C1E',
  fontSize: '28px',
  fontWeight: '600' as const,
  lineHeight: '1.3',
  margin: '0 0 24px',
}

const text = {
  color: '#2C3340',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const hr = {
  borderColor: '#8A8C8F',
  margin: '32px 0',
}

const footer = {
  color: '#8A8C8F',
  fontSize: '14px',
  margin: '0 0 8px',
}

const link = {
  color: '#4A6741',
  fontSize: '14px',
}
