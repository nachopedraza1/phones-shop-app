import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ProductInstallments } from '@/interfaces/Response';
import { CreditCard } from '@mui/icons-material';

const PaymentMethods: React.FC<{ installments: ProductInstallments }> = ({ installments }) => {
    return (
        <Box border='1px solid rgba(0,0,0,.1)' borderRadius='10px' padding={2}>
            <Typography variant="h6"> Medios de pago </Typography>

            {
                installments.rate === 0 &&
                <Box display='flex' p={2} gap={1} bgcolor='#00a650' borderRadius={1}>
                    <CreditCard sx={{ color: '#fff' }} />
                    <Typography color='#fff'>
                        ¡Pagá el mismo precio en
                        <Typography component='span' fontWeight={600} ml={1}>
                            hasta {installments.quantity} cuotas!
                        </Typography>
                    </Typography>
                </Box>
            }

            <Typography mt={2}> Hasta 12 cuotas sin tarjeta </Typography>
            <Image src='/mercadocredito.svg' alt="mercadocredito" width={73} height={32} />
            <Typography mt={2}> Tarjetas de crédito </Typography>
            <Typography color='text.secondary'> ¡Mismo precio en cuotas con bancos seleccionados! </Typography>
            <Box display='flex' gap={1} mt={1}>
                <Image src='/visa.svg' alt="visa" width={42} height={32} />
                <Image src='/americanexpress.svg' alt="americanexpress" width={42} height={32} />
                <Image src='/naranja.svg' alt="naranja" width={62} height={32} />
                <Image src='/master.svg' alt="master" width={42} height={32} />
            </Box>
            <Typography mt={2}> Tarjetas de débito </Typography>
            <Box display='flex' flexWrap='wrap' gap={2} mt={1}>
                <Image src='/visadebito.svg' alt="visadebito" width={71} height={32} />
                <Image src='/master2.svg' alt="master2" width={42} height={32} />
                <Image src='/naranja.svg' alt="naranja" width={62} height={32} />
                <Image src='/masterdebito.svg' alt="masterdebito" width={61} height={32} />
                <Image src='/cabal.svg' alt="cabal" width={59} height={32} />
            </Box>
        </Box>
    )
}

export default PaymentMethods;