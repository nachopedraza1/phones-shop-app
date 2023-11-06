import Image from "next/image";
import TableStats from "@/components/tables/TableStats";
import { Grid, Typography } from "@mui/material";
import { Attribute } from "@/interfaces/MeliProduct";

const StatsProducts: React.FC<{ attributes: Attribute[] }> = ({ attributes }) => {

    const productName = attributes.find(item => item.id === "MODEL")?.value_name;

    const generalAtributes = attributes.filter(atr =>
        atr.id === 'BRAND' ||
        atr.id === 'LINE' ||
        atr.id === 'MODEL' ||
        atr.id === 'MAIN_COLOR'
    );

    const memoryAtributes = attributes.filter(atr =>
        atr.id === 'RAM' ||
        atr.id === 'MEMORY_CARD_MAX_CAPACITY' ||
        atr.id === 'INTERNAL_MEMORY' ||
        atr.id === 'WITH_MEMORY_CARD_SLOT'
    );

    const procesadorAtributes = attributes.filter(atr =>
        atr.id === 'PROCESSOR_MODEL' ||
        atr.id === 'GPU_MODEL'
    );

    const sistemAtributes = attributes.filter(atr =>
        atr.id === 'OPERATING_SYSTEM_NAME' ||
        atr.id === 'OS_ORIGINAL_VERSION' ||
        atr.id === 'OS_LAST_COMPATIBLE_VERSION'
    );

    const simAtributes = attributes.filter(atr =>
        atr.id === 'IS_DUAL_SIM' ||
        atr.id === 'SIM_CARD_SLOTS_NUMBER' ||
        atr.id === 'ESIMS_NUMBER' ||
        atr.id === 'COMPATIBLE_SIM_CARD_SIZES' ||
        atr.id === 'WITH_ESIM'
    );

    const connectAtributes = attributes.filter(atr =>
        atr.id === 'MOBILE_NETWORK' ||
        atr.id === 'CHARGE_CONNECTOR_TYPE' ||
        atr.id === 'WITH_USB_CONNECTOR' ||
        atr.id === 'WITH_3_5_MM_JACK_CONNECTOR' ||
        atr.id === 'WITH_WIFI' ||
        atr.id === 'WITH_GPS' ||
        atr.id === 'WITH_BLUETOOTH' ||
        atr.id === 'WITH_NFC'
    );

    const specsAtributes = attributes.filter(atr =>
        atr.id === 'RELEASE_MONTH' ||
        atr.id === 'RELEASE_YEAR'
    );

    const firstStats = attributes.filter(atr => (
        atr.id === 'INTERNAL_MEMORY' ||
        atr.id === 'MAIN_FRONT_CAMERA_RESOLUTION' ||
        atr.id === 'MAIN_REAR_CAMERA_RESOLUTION' ||
        atr.id === 'WITH_NFC' ||
        atr.id === 'WITH_FACIAL_RECOGNITION' ||
        atr.id === 'DISPLAY_SIZE' ||
        atr.id === 'RAM' ||
        atr.id === 'MAX_BATTERY_LIFE'
    ));

    return (
        <Grid>
            <Typography variant="h5"> Características de {productName} </Typography>

            <Grid container>
                {
                    firstStats.map(item => (
                        <Grid item xs={6} display='flex' alignItems='center' key={item.id} mt={2} gap={1}>
                            <Grid item bgcolor='#ebebeb' borderRadius={50} display='flex' alignItems='center' justifyContent='center'>
                                {item.id === 'INTERNAL_MEMORY' && <Image src='/memoryicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'MAIN_FRONT_CAMERA_RESOLUTION' && <Image src='/frontcameraicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'MAIN_REAR_CAMERA_RESOLUTION' && <Image src='/backcameraicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'WITH_NFC' && <Image src='/nfcicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'WITH_FACIAL_RECOGNITION' && <Image src='/facialicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'RAM' && <Image src='/memoryicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'DISPLAY_SIZE' && <Image src='/displaysizepcicon.svg' alt={item.name} width={32} height={32} />}
                                {item.id === 'MAX_BATTERY_LIFE' && <Image src='/bateryicon.svg' alt={item.name} width={32} height={32} />}
                            </Grid>
                            <Typography> {item.name}:
                                <Typography component='span' fontWeight={600} ml={1}>
                                    {item.value_name}
                                </Typography>
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>

            <Grid container gap={3}>
                <Grid item xs={5.8}>
                    <TableStats attributes={generalAtributes} title='Características generales' />
                    <TableStats attributes={memoryAtributes} title='Memoria' />
                    <TableStats attributes={connectAtributes} title='Conectividad' />
                </Grid>
                <Grid item xs={5.8}>
                    <TableStats attributes={simAtributes} title='Tarjeta SIM' />
                    <TableStats attributes={procesadorAtributes} title='Procesador' />
                    <TableStats attributes={sistemAtributes} title='Sistema Operativo' />
                    <TableStats attributes={specsAtributes} title='Especificaciones' />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StatsProducts;