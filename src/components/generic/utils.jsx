const numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP'
    }).format(value);

export { numberFormat }
