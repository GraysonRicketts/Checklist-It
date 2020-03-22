export const login = (email, password) => ({
    type: 'LOGIN',
    email,
    password 
})

export const logout = () => ({
    type: 'LOGOUT'
});

