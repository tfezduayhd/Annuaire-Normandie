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

type AdminNewDesignerProps = {
  firstName: string
  lastName: string
  email: string
  disciplines: string[]
  city: string
}

export default function AdminNewDesigner({
  firstName = 'Prénom',
  lastName = 'Nom',
  email = 'email@example.com',
  disciplines = ['Design graphique'],
  city = 'Rouen',
}: AdminNewDesignerProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouvelle inscription : {firstName} {lastName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nouvelle inscription</Heading>
          <Text style={text}>
            Un nouveau designer souhaite rejoindre la communauté Design Lab Normandie.
          </Text>
          <Section style={card}>
            <Text style={label}>Nom</Text>
            <Text style={value}>{firstName} {lastName}</Text>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            <Text style={label}>Disciplines</Text>
            <Text style={value}>{disciplines.join(', ')}</Text>
            <Text style={label}>Ville</Text>
            <Text style={value}>{city}</Text>
          </Section>
          <Text style={text}>
            Connectez-vous à l&apos;espace administration pour valider ou refuser cette inscription.
          </Text>
          <Link href="https://designlab-normandie.fr/admin/designers" style={buttonStyle}>
            Voir les inscriptions
          </Link>
          <Hr style={hr} />
          <Text style={footer}>
            Design Lab Normandie — Administration
          </Text>
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
  fontSize: '24px',
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

const card = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E5E5',
  borderRadius: '4px',
  padding: '24px',
  margin: '0 0 24px',
}

const label = {
  color: '#8A8C8F',
  fontSize: '12px',
  fontWeight: '500' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 4px',
}

const value = {
  color: '#1A1C1E',
  fontSize: '16px',
  margin: '0 0 16px',
}

const buttonStyle = {
  backgroundColor: '#4A6741',
  borderRadius: '4px',
  color: '#FFFFFF',
  display: 'inline-block' as const,
  fontSize: '14px',
  fontWeight: '500' as const,
  padding: '12px 24px',
  textDecoration: 'none',
}

const hr = {
  borderColor: '#8A8C8F',
  margin: '32px 0',
}

const footer = {
  color: '#8A8C8F',
  fontSize: '14px',
}
