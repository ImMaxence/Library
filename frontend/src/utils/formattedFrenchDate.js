export const formattedFrenchDate = (str) => {

    const date = new Date(str);

    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);

    return formattedDate
};