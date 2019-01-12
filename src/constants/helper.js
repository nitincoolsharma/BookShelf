export const isArrayValidAndNotEmpty = anArray => anArray && Array.isArray(anArray) && anArray.length > 0;

export const isObjectValidAndNotEmpty = anObject => (
    anObject && typeof anObject === 'object' && Object.keys(anObject).length > 0
);