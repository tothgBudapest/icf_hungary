import { ART_INSTITUTE_CHICAGO_IMAGE_URL } from '@/constants/app-url.constant';

export const getImageIdLink = (id: string | undefined) => {
    const BASE_URL = `${ART_INSTITUTE_CHICAGO_IMAGE_URL}`;
    return id ? `${BASE_URL}/${id}/full/843,/0/default.jpg` : '';
};
