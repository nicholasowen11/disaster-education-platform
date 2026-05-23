import { 
    Card, 
    CardContent, 
    Stack, Box, 
    Typography, 
    Button 
} from "@mui/material"

import { IconPhone } from "@tabler/icons-react"

import { EmergencyContact } from "@/types/emergencyContact"

export default function ContactCard({
  item,
  accentColor,
  bgColor,
  subtitle,
}: {
  item: EmergencyContact
  accentColor: string
  bgColor: string
  subtitle: string
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: `1.5px solid ${bgColor}`,
        height: "100%",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: accentColor,
          boxShadow: `0 4px 20px ${accentColor}20`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              width: 44, height: 44, borderRadius: 2,
              backgroundColor: bgColor, color: accentColor,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <IconPhone size={20} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: "var(--headline)", mb: 0.5 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Button
            fullWidth
            href={`tel:${item.phoneNumber}`}
            startIcon={<IconPhone size={16} />}
            sx={{
              py: 1.2, borderRadius: 2,
              backgroundColor: accentColor,
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { opacity: 0.9, backgroundColor: accentColor },
            }}
          >
            {item.phoneNumber}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}