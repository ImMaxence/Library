// export const isConnected = async () => {
//     try {
//         const response = await fetch(`${process.env.REACT_APP_URL_BACK}/api/auth/verify-token`, {
//             method: 'GET',
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             console.error('Invalid token or session expired');
//             return { isAuthenticated: false };
//         }

//         console.log("✅ Token OK - next")
//         const data = await response.json();
//         return { isAuthenticated: true, data };
//         // return await response.json();
//         // return { isAuthenticated: true };
//     } catch (error) {
//         console.log("❌ Catch")
//         console.error('Error verifying token:', error);
//         return { isAuthenticated: false };
//     }
// };
