import TableStats from "@/components/tables/TableStats";
import { Attribute } from "@/interfaces/MeliProduct";

const DisplayStats: React.FC<{ attributes: Attribute[] }> = ({ attributes }) => {

    const displayAtributes = attributes.filter(atr =>
        atr.id === 'DISPLAY_SIZE' ||
        atr.id === 'DISPLAY_RESOLUTION_TYPE' ||
        atr.id === 'DISPLAY_TECHNOLOGY' ||
        atr.id === 'DISPLAY_TYPE' ||
        atr.id === 'DISPLAY_PIXELS_PER_INCH' ||
        atr.id === 'MAX_DISPLAY_BRIGHTNESS' ||
        atr.id === 'WITH_TOUCHSCREEN_DISPLAY'
    );

    return <TableStats attributes={displayAtributes} title='Pantalla' />
}

export default DisplayStats;