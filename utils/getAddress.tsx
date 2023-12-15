import Cookie from 'js-cookie';

export const getAddress = () => {
    return {
        name: Cookie.get('name') || '',
        country: Cookie.get('country') || '',
        city: Cookie.get('city') || '',
        zip: Cookie.get('zip') || '',
        address: Cookie.get('address') || '',
        phone: Cookie.get('phone') || '',
    }
}