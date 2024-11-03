import { api } from '../services/apiConfig';

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/api/users/profile', {});
        return response.data;
    } catch (error) {
        throw new Error('Technical error during current user retrieval');
    }
};

export const getAllUser = async () => {
    try {
        const response = await api.get('/api/users/get-all', {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during get all users')
    }
}

// export const updateUser = async ({ id, username, password, role, passwordChanged, image }) => {
//     try {
//         const response = await api.put(`/api/users/update-user/${id}`, {
//             username,
//             password,
//             role,
//             passwordChanged,
//             image
//         })
//         return response.data
//     } catch (err) {
//         throw new Error('Technical error during update user')
//     }
// }

export const updateUser = async ({ id, username, password, role, passwordChanged, image }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role || '1'); // ajouter une valeur par défaut si `role` est undefined
    formData.append('passwordChanged', passwordChanged);
    if (image) {
        formData.append('image', image);
    }

    const response = await api.put(`/api/users/update-user/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
};



export const deleteUser = async ({ id }) => {
    try {
        const response = await api.delete(`/api/users/delete-user/${id}`, {})
        return response.data
    } catch (err) {
        throw new Error('Technical error during delete user')
    }
}