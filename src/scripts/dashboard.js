const verifyToken = () => {
    const token = localStorage.getItem('@petInfo:token');
    
    if (!token) {
        location.replace('../../')
    }
}

verifyToken()